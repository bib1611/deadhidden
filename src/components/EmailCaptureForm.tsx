'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';

export type EmailCaptureVariant = 'inline' | 'popup' | 'slide-in' | 'fullscreen';

interface EmailCaptureFormProps {
  variant: EmailCaptureVariant;
  source: string;
  leadMagnet?: string;
  buttonText?: string;
  successMessage?: string;
  /** Called after successful signup — e.g. to reveal a download link */
  onSuccess?: () => void;
  /** Placeholder for input */
  placeholder?: string;
}

export function EmailCaptureForm({
  variant,
  source,
  leadMagnet,
  buttonText = 'JOIN THE LIST',
  successMessage = 'Check your inbox. The signal is on its way.',
  onSuccess,
  placeholder = 'Your email address',
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, leadMagnet }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        track('email_signup', { source, leadMagnet: leadMagnet || '' });
        try {
          localStorage.setItem('dh_subscribed', '1');
        } catch {
          // storage not available
        }
        onSuccess?.();
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
      <div className={successWrapperClass(variant)}>
        <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-4" />
        <p
          className="text-lg uppercase tracking-[0.08em] text-[#e8e0d0] font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          YOU&apos;RE IN.
        </p>
        <p className="text-sm text-[#888] mt-2">{successMessage}</p>
      </div>
    );
  }

  const isCompact = variant === 'inline' || variant === 'slide-in';

  return (
    <form
      onSubmit={handleSubmit}
      className={formClass(variant)}
    >
      <div className={isCompact ? 'flex flex-col sm:flex-row gap-3' : 'space-y-3'}>
        <input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-[#222] text-[#e8e0d0] placeholder-[#555] focus:outline-none focus:border-[#8b0000] transition-colors disabled:opacity-50 min-h-[44px]"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="bg-[#8b0000] text-[#e8e0d0] px-6 py-3 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-h-[44px] min-w-[44px]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {loading ? 'SENDING...' : buttonText}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-xs mt-3">Something went wrong. Try again.</p>
      )}
    </form>
  );
}

function formClass(variant: EmailCaptureVariant): string {
  switch (variant) {
    case 'inline':
      return 'w-full';
    case 'popup':
    case 'fullscreen':
      return 'w-full space-y-3';
    case 'slide-in':
      return 'w-full';
    default:
      return 'w-full';
  }
}

function successWrapperClass(variant: EmailCaptureVariant): string {
  switch (variant) {
    case 'inline':
      return 'text-center py-4';
    case 'popup':
    case 'fullscreen':
      return 'text-center py-6';
    case 'slide-in':
      return 'text-center py-3';
    default:
      return 'text-center py-4';
  }
}
