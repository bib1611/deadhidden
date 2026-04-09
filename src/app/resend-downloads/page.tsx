'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'not_found' | 'rate_limited' | 'error';

export default function ResendDownloadsPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [sentEmail, setSentEmail] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus('loading');
    setSentEmail(trimmed);

    try {
      const res = await fetch('/api/resend-downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
      } else if (data.error === 'not_found') {
        setStatus('not_found');
      } else if (data.error === 'rate_limited') {
        setStatus('rate_limited');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          GET YOUR DOWNLOADS
        </h1>
        <div className="h-1 bg-[#8b0000] w-16 mb-8" />

        <p className="text-[#888] text-base md:text-lg mb-10 leading-relaxed">
          Enter the email you used to purchase. We&apos;ll send your files immediately.
        </p>

        {/* Form */}
        {status !== 'success' && (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === 'loading'}
                className="flex-1 bg-[#111] border border-[#333] text-[#e8e0d0] px-4 py-3 text-base placeholder-[#555] focus:outline-none focus:border-[#8b0000] disabled:opacity-50"
                style={{ fontFamily: 'var(--font-body)' }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#8b0000] text-[#e8e0d0] px-8 py-3 text-sm font-bold uppercase tracking-[2px] hover:bg-[#a00000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {status === 'loading' ? 'SEARCHING...' : 'SEND MY FILES'}
              </button>
            </div>
            <p className="text-[#555] text-xs mt-3">
              Check your spam folder if the email doesn&apos;t arrive within 2 minutes.
            </p>
          </form>
        )}

        {/* Success */}
        {status === 'success' && (
          <div className="border border-[#222] bg-[#111] p-8 mb-8">
            <p
              className="text-xl font-bold uppercase mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Done.
            </p>
            <p className="text-[#888]">
              Check your inbox at <strong className="text-[#e8e0d0]">{sentEmail}</strong>. Files are on the way.
            </p>
          </div>
        )}

        {/* Not found */}
        {status === 'not_found' && (
          <div className="border border-[#333] bg-[#111] p-8 mb-8">
            <p className="text-[#888] leading-relaxed">
              We couldn&apos;t find a purchase with that email. If you used a different email at checkout, try that one.
              Still stuck? Email{' '}
              <a
                href="mailto:support@deadhidden.org"
                className="text-[#8b0000] underline"
              >
                support@deadhidden.org
              </a>
            </p>
          </div>
        )}

        {/* Rate limited */}
        {status === 'rate_limited' && (
          <div className="border border-[#333] bg-[#111] p-8 mb-8">
            <p className="text-[#888] leading-relaxed">
              Too many requests. Try again in an hour. If you need help now, email{' '}
              <a
                href="mailto:support@deadhidden.org"
                className="text-[#8b0000] underline"
              >
                support@deadhidden.org
              </a>
            </p>
          </div>
        )}

        {/* Generic error */}
        {status === 'error' && (
          <div className="border border-[#333] bg-[#111] p-8 mb-8">
            <p className="text-[#888] leading-relaxed">
              Something went wrong. Try again or email{' '}
              <a
                href="mailto:support@deadhidden.org"
                className="text-[#8b0000] underline"
              >
                support@deadhidden.org
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
