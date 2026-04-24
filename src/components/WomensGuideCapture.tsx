'use client';

import { useState, useRef } from 'react';
import { trackConversion } from '@/lib/conversion-events';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function WomensGuideCapture() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  const trackFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackConversion('email_form_start', {
      source: 'women_guides',
      lead_magnet: 'women-guides-3',
      variant: 'inline',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage('Enter a valid email.');
      inputRef.current?.focus();
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/women-guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        trackConversion('lead_submitted', {
          source: 'women_guides',
          lead_magnet: 'women-guides-3',
          variant: 'inline',
        });
        trackConversion('email_signup', {
          source: 'women_guides',
          lead_magnet: 'women-guides-3',
          variant: 'inline',
        });
        try {
          localStorage.setItem('dh_subscribed', '1');
        } catch {
          // storage not available
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Try again.');
        trackConversion('lead_submit_failed', {
          source: 'women_guides',
          lead_magnet: 'women-guides-3',
          reason: 'api_error',
        });
      }
    } catch {
      setStatus('error');
      setErrorMessage('Connection failed. Check your internet and try again.');
      trackConversion('lead_submit_failed', {
        source: 'women_guides',
        lead_magnet: 'women-guides-3',
        reason: 'network_error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-6 animate-fadeIn">
        <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-4" />
        <p
          className="text-lg uppercase tracking-[0.08em] text-[#e8e0d0] font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          CHECK YOUR EMAIL.
        </p>
        <p className="text-sm text-[#888] mt-2">
          All three guides are waiting. Read them slow.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          ref={inputRef}
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            trackFormStart();
            setEmail(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          required
          disabled={loading}
          className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-[#222] text-[#e8e0d0] placeholder-[#555] focus:outline-none focus:border-[#8b0000] transition-colors disabled:opacity-50 min-h-[44px]"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="btn-press bg-[#8b0000] text-[#e8e0d0] px-6 py-3 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-h-[44px] flex items-center justify-center gap-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {loading && (
            <span
              className="inline-block w-4 h-4 border-2 border-[#e8e0d0] border-r-transparent animate-spin"
              style={{ borderRadius: '50%' }}
            />
          )}
          {loading ? 'SENDING...' : 'SEND ME THE GUIDES'}
        </button>
      </div>
      {errorMessage && (
        <p className="text-[#a50000] text-xs mt-2 animate-fadeIn">{errorMessage}</p>
      )}
    </form>
  );
}
