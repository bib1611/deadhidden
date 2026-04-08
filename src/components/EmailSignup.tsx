'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Check your email. The signal is on its way.');
        setEmail('');
        track('email_signup', { source: 'homepage' });
      } else {
        const data = await res.json();
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="px-4 py-3 bg-[#0a0a0a] border border-[#222] text-[#e8e0d0] placeholder-[#555] focus:outline-none focus:border-[#8b0000] transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="bg-[#8b0000] text-[#e8e0d0] px-8 py-3.5 uppercase tracking-[0.15em] font-oswald font-bold hover:bg-[#a50000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {loading ? 'Sending...' : 'GET THE SIGNAL'}
        </button>
      </div>

      {status === 'success' && (
        <p className="text-[#8b0000] text-sm">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-sm">{message}</p>
      )}

      <p className="text-xs text-[#777]">
        No spam. No selling your data. Just the things they tried to bury.
      </p>
    </form>
  );
}
