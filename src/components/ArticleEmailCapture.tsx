'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';

export function ArticleEmailCapture() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        track('email_signup', { source: 'article_inline' });
        try {
          localStorage.setItem('dh_subscribed', '1');
        } catch {
          // storage not available
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="my-10 bg-[#111] border border-[#222] p-6 text-center">
        <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-4" />
        <p
          className="text-lg uppercase tracking-[0.08em] text-[#e8e0d0] font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          YOU&apos;RE IN.
        </p>
        <p className="text-sm text-[#888] mt-2">Check your inbox. The signal is on its way.</p>
      </div>
    );
  }

  return (
    <div className="my-10 bg-[#111] border border-[#222] p-6">
      <div className="text-center mb-4">
        <p
          className="text-[10px] tracking-[0.2em] uppercase text-[#8b0000] font-bold mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          GET THE SIGNAL
        </p>
        <p
          className="text-lg uppercase tracking-[0.08em] text-[#e8e0d0] font-bold mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          JOIN 70,000+ BELIEVERS.
        </p>
        <p className="text-sm text-[#888]">
          Raw, unfiltered, weekly. Delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-[#222] text-[#e8e0d0] placeholder-[#555] focus:outline-none focus:border-[#8b0000] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="bg-[#8b0000] text-[#e8e0d0] px-6 py-3 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors disabled:opacity-50 whitespace-nowrap"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {loading ? 'SENDING...' : 'GET THE SIGNAL'}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-red-500 text-xs mt-3 text-center">Something went wrong. Try again.</p>
      )}

      <p className="text-xs text-[#555] mt-3 text-center">
        No spam. No selling your data.
      </p>
    </div>
  );
}
