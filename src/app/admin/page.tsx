import { cookies } from 'next/headers';
import { getStripe } from '@/lib/stripe';
import { getAllCalls, type VoiceCall } from '@/lib/voice-calls';
import AdminLogin from './login';

const ADMIN_PASSWORD = 'Blakedylan2025!?';
const ADMIN_COOKIE = 'admin_auth';

async function getStripeCharges() {
  try {
    const stripe = getStripe();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startTimestamp = Math.floor(startOfDay.getTime() / 1000);

    const charges = await stripe.charges.list({
      created: { gte: startTimestamp },
      limit: 100,
    });

    const revenueToday = charges.data
      .filter((c) => c.status === 'succeeded')
      .reduce((sum, c) => sum + c.amount, 0);

    const recentCharges = await stripe.charges.list({ limit: 10 });

    return {
      revenueToday,
      recentCharges: recentCharges.data.map((c) => ({
        amount: c.amount,
        description: c.description || c.metadata?.productName || 'Unknown',
        date: new Date(c.created * 1000).toLocaleString('en-US', {
          timeZone: 'America/Chicago',
        }),
        status: c.status,
      })),
    };
  } catch (e) {
    console.error('Stripe fetch error:', e);
    return { revenueToday: 0, recentCharges: [] };
  }
}

async function getResendContacts() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { total: 0, todaySignups: 0, recentContacts: [] };

  try {
    const res = await fetch(
      'https://api.resend.com/audiences/853ea354-ef8b-4781-86cd-1b1032ad247e/contacts',
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        cache: 'no-store',
      }
    );
    if (!res.ok) throw new Error(`Resend API ${res.status}`);
    const data = await res.json();
    const contacts = data.data || [];

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todaySignups = contacts.filter(
      (c: { created_at: string }) => new Date(c.created_at) >= startOfDay
    ).length;

    const sorted = [...contacts].sort(
      (a: { created_at: string }, b: { created_at: string }) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return {
      total: contacts.length,
      todaySignups,
      recentContacts: sorted.slice(0, 10).map((c: { email: string; first_name?: string; created_at: string }) => ({
        email: c.email,
        source: c.first_name || '—',
        date: new Date(c.created_at).toLocaleString('en-US', {
          timeZone: 'America/Chicago',
        }),
      })),
    };
  } catch (e) {
    console.error('Resend fetch error:', e);
    return { total: 0, todaySignups: 0, recentContacts: [] };
  }
}

async function getWriteStackQueue() {
  try {
    const res = await fetch('https://www.writestack.io/api/mcp/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ws_e0973134c525fe15596ca9b8bbef5c43f861e7c07336c6dd831e7bd3b5f330de`,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/call',
        id: 1,
        params: { name: 'get_queue', arguments: { limit: 1 } },
      }),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`WriteStack API ${res.status}`);
    const data = await res.json();
    const content = data?.result?.content;
    if (Array.isArray(content)) {
      for (const item of content) {
        if (item.type === 'text') {
          const parsed = JSON.parse(item.text);
          return parsed.total ?? 0;
        }
      }
    }
    return 0;
  } catch (e) {
    console.error('WriteStack fetch error:', e);
    return '—';
  }
}

async function getVoiceCalls() {
  try {
    const calls = await getAllCalls(10);
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const callsToday = calls.filter((c) => new Date(c.timestamp) >= startOfDay).length;
    return { calls, callsToday };
  } catch (e) {
    console.error('Voice calls fetch error:', e);
    return { calls: [], callsToday: 0 };
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE);

  if (authCookie?.value !== ADMIN_PASSWORD) {
    return <AdminLogin />;
  }

  const [stripe, resend, writeStackQueue, voiceCalls] = await Promise.all([
    getStripeCharges(),
    getResendContacts(),
    getWriteStackQueue(),
    getVoiceCalls(),
  ]);

  const now = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <>
      <meta httpEquiv="refresh" content="60" />
      <title>DEAD HIDDEN — COMMAND CENTER</title>
      <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif', position: 'fixed', inset: 0, zIndex: 9999, overflow: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
          {/* HEADER */}
          <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, margin: 0, color: '#fff' }}>
              DEAD HIDDEN — COMMAND CENTER
            </h1>
            <p style={{ color: '#888', fontSize: 14, marginTop: 8 }}>{now}</p>
          </div>

          {/* TODAY'S NUMBERS */}
          <SectionTitle>TODAY&apos;S NUMBERS</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
            <StatCard label="VISITORS TODAY" value="Check Vercel" />
            <StatCard label="NEW SIGNUPS TODAY" value={resend.todaySignups} />
            <StatCard label="TOTAL EMAIL LIST" value={resend.total.toLocaleString()} />
            <StatCard label="REVENUE TODAY" value={`$${(stripe.revenueToday / 100).toFixed(2)}`} />
            <StatCard label="CALLS TODAY" value={voiceCalls.callsToday} />
          </div>

          {/* RECENT SALES */}
          <SectionTitle>RECENT SALES</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 48 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <Th>AMOUNT</Th>
                  <Th>PRODUCT</Th>
                  <Th>DATE</Th>
                  <Th>STATUS</Th>
                </tr>
              </thead>
              <tbody>
                {stripe.recentCharges.length === 0 ? (
                  <tr><td colSpan={4} style={{ padding: 16, color: '#666', textAlign: 'center' }}>No charges found</td></tr>
                ) : (
                  stripe.recentCharges.map((c, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#111' : '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}>
                      <Td>${(c.amount / 100).toFixed(2)}</Td>
                      <Td>{c.description}</Td>
                      <Td>{c.date}</Td>
                      <Td>
                        <span style={{ color: c.status === 'succeeded' ? '#4ade80' : '#f87171', fontSize: 12, textTransform: 'uppercase' }}>
                          {c.status}
                        </span>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* RECENT CALLS */}
          <SectionTitle>RECENT CALLS</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 48 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <Th>CALLER</Th>
                  <Th>DATE</Th>
                  <Th>DURATION</Th>
                  <Th>STATUS</Th>
                  <Th>SUMMARY</Th>
                  <Th>PRODUCTS</Th>
                </tr>
              </thead>
              <tbody>
                {voiceCalls.calls.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: 16, color: '#666', textAlign: 'center' }}>No calls recorded</td></tr>
                ) : (
                  voiceCalls.calls.map((c: VoiceCall, i: number) => (
                    <tr key={c.id || i} style={{ background: i % 2 === 0 ? '#111' : '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}>
                      <Td>{c.caller}</Td>
                      <Td>{new Date(c.timestamp).toLocaleString('en-US', { timeZone: 'America/Chicago' })}</Td>
                      <Td>{`${Math.floor(c.duration / 60)}:${String(c.duration % 60).padStart(2, '0')}`}</Td>
                      <Td>
                        <span style={{
                          color: c.status === 'successful' || c.status === 'done' ? '#4ade80' : '#f87171',
                          fontSize: 12,
                          textTransform: 'uppercase',
                        }}>
                          {c.status}
                        </span>
                      </Td>
                      <Td>{c.summary.length > 100 ? c.summary.slice(0, 100) + '…' : c.summary || '—'}</Td>
                      <Td>
                        {c.products_mentioned.length > 0 ? (
                          <span style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {c.products_mentioned.map((p) => (
                              <span key={p} style={{
                                background: '#1a1a1a',
                                border: '1px solid #333',
                                borderRadius: 3,
                                padding: '2px 6px',
                                fontSize: 11,
                                color: '#8b0000',
                              }}>
                                {p}
                              </span>
                            ))}
                          </span>
                        ) : '—'}
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* EMAIL LIST */}
          <SectionTitle>EMAIL LIST — LAST 10 SIGNUPS</SectionTitle>
          <div style={{ overflowX: 'auto', marginBottom: 48 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <Th>EMAIL</Th>
                  <Th>SOURCE</Th>
                  <Th>DATE</Th>
                </tr>
              </thead>
              <tbody>
                {resend.recentContacts.length === 0 ? (
                  <tr><td colSpan={3} style={{ padding: 16, color: '#666', textAlign: 'center' }}>No contacts found</td></tr>
                ) : (
                  resend.recentContacts.map((c, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#111' : '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}>
                      <Td>{c.email}</Td>
                      <Td>{c.source}</Td>
                      <Td>{c.date}</Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* WRITESTACK QUEUE */}
          <SectionTitle>WRITESTACK QUEUE STATUS</SectionTitle>
          <div style={{ background: '#111', border: '1px solid #222', borderLeft: '3px solid #8b0000', padding: 24, borderRadius: 4 }}>
            <p style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>{writeStackQueue}</p>
            <p style={{ fontSize: 13, color: '#888', margin: '8px 0 0' }}>notes scheduled in queue</p>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 14, fontWeight: 600, letterSpacing: 3, color: '#8b0000', marginBottom: 16, textTransform: 'uppercase' }}>
      {children}
    </h2>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: '#111', border: '1px solid #222', borderLeft: '3px solid #8b0000', padding: 24, borderRadius: 4 }}>
      <p style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>{value}</p>
      <p style={{ fontSize: 12, color: '#888', margin: '8px 0 0', letterSpacing: 1 }}>{label}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, letterSpacing: 2, color: '#888', fontWeight: 600 }}>
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td style={{ padding: '12px 16px', color: '#e8e0d0' }}>
      {children}
    </td>
  );
}
