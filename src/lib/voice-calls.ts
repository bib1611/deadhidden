const CALLS_FILE = '/tmp/voice-calls.json';

const AGENT_ID = 'agent_1501knw0hm63fecrvxeh8e7jh66z';

const PRODUCT_KEYWORDS: Record<string, string[]> = {
  'biblical-man-field-manual': ['field manual'],
  'the-vault': ['vault'],
  'the-arsenal': ['arsenal'],
  'biblical-man': ['biblical man'],
  'biblical-woman': ['biblical woman'],
  'guide': ['guide'],
  'download': ['download'],
};

export interface VoiceCall {
  id: string;
  caller: string;
  duration: number;
  status: string;
  summary: string;
  products_mentioned: string[];
  timestamp: string;
}

export function scanForProducts(transcript: { role: string; message: string }[]): string[] {
  const text = transcript.map((t) => t.message).join(' ').toLowerCase();
  const found: string[] = [];
  for (const [product, keywords] of Object.entries(PRODUCT_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) {
      found.push(product);
    }
  }
  return found;
}

export async function getStoredCalls(): Promise<VoiceCall[]> {
  try {
    const { readFile } = await import('fs/promises');
    const raw = await readFile(CALLS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function appendCall(call: VoiceCall): Promise<void> {
  const { readFile, writeFile } = await import('fs/promises');
  const calls: VoiceCall[] = [];
  try {
    const raw = await readFile(CALLS_FILE, 'utf-8');
    calls.push(...JSON.parse(raw));
  } catch {
    // File doesn't exist yet
  }
  calls.push(call);
  await writeFile(CALLS_FILE, JSON.stringify(calls, null, 2));
}

export async function getRecentCalls(limit: number): Promise<VoiceCall[]> {
  const calls = await getStoredCalls();
  return calls
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export async function getElevenLabsCalls(): Promise<VoiceCall[]> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations?agent_id=${AGENT_ID}`,
      {
        headers: { 'xi-api-key': apiKey },
        cache: 'no-store',
      }
    );
    if (!res.ok) throw new Error(`ElevenLabs API ${res.status}`);
    const data = await res.json();
    const conversations = data.conversations || [];

    return conversations.map((c: {
      conversation_id: string;
      status: string;
      call_duration_secs?: number;
      start_time_unix_secs?: number;
      analysis?: { summary?: string };
      phone_call_data?: { caller_number?: string };
    }) => ({
      id: c.conversation_id,
      caller: c.phone_call_data?.caller_number || 'unknown',
      duration: c.call_duration_secs || 0,
      status: c.status || 'unknown',
      summary: c.analysis?.summary || '',
      products_mentioned: [],
      timestamp: c.start_time_unix_secs
        ? new Date(c.start_time_unix_secs * 1000).toISOString()
        : new Date().toISOString(),
    }));
  } catch (e) {
    console.error('ElevenLabs API fetch error:', e);
    return [];
  }
}

export async function getAllCalls(limit: number): Promise<VoiceCall[]> {
  const stored = await getStoredCalls();

  if (stored.length > 0) {
    return stored
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Fallback to ElevenLabs API if no stored calls
  const apiCalls = await getElevenLabsCalls();
  return apiCalls.slice(0, limit);
}

export { AGENT_ID };
