'use client';

import { useState, useRef } from 'react';
import { trackConversion } from '@/lib/conversion-events';

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

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  const trackFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackConversion('email_form_start', {
      source,
      lead_magnet: leadMagnet || '',
      variant,
    });
  };

  const handleBlur = () => {
    setTouched(true);
    if (email && !isValidEmail(email)) {
      setValidationError('Enter a valid email');
    } else {
      setValidationError('');
    }
  };

  const handleFocus = () => {
    trackFormStart();
    setValidationError('');
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackFormStart();
    setEmail(e.target.value);
    // Clear validation error as user types if they've already been warned
    if (touched && validationError && isValidEmail(e.target.value)) {
      setValidationError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation before submit
    if (!isValidEmail(email)) {
      setValidationError('Enter a valid email');
      inputRef.current?.focus();
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');
    setValidationError('');

    try {
      const res = await fetch('/api/email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, leadMagnet }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTouched(false);
        trackConversion('lead_submitted', {
          source,
          lead_magnet: leadMagnet || '',
          variant,
        });
        trackConversion('email_signup', {
          source,
          lead_magnet: leadMagnet || '',
          variant,
        });
        try {
          localStorage.setItem('dh_subscribed', '1');
        } catch {
          // storage not available
        }
        onSuccess?.();
      } else {
        setStatus('error');
        setErrorMessage('Something went wrong. Try again.');
        trackConversion('lead_submit_failed', {
          source,
          lead_magnet: leadMagnet || '',
          variant,
          reason: 'api_error',
        });
      }
    } catch {
      setStatus('error');
      setErrorMessage('Connection failed. Check your internet and try again.');
      trackConversion('lead_submit_failed', {
        source,
        lead_magnet: leadMagnet || '',
        variant,
        reason: 'network_error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className={`${successWrapperClass(variant)} animate-fadeIn`}>
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
  const inputBorderClass = validationError
    ? 'border-[#a50000]'
    : touched && email && isValidEmail(email)
    ? 'border-[#2a5a2a]'
    : 'border-[#222]';

  return (
    <form
      onSubmit={handleSubmit}
      className={formClass(variant)}
      noValidate
    >
      <div className={isCompact ? 'flex flex-col sm:flex-row gap-3' : 'space-y-3'}>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required
            disabled={loading}
            className={`w-full px-4 py-3 bg-[#0a0a0a] border ${inputBorderClass} text-[#e8e0d0] placeholder-[#555] focus:outline-none focus:border-[#8b0000] transition-colors disabled:opacity-50 min-h-[44px]`}
          />
          {validationError && (
            <p className="text-[#a50000] text-xs mt-1.5 animate-fadeIn">{validationError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !email}
          className="btn-press bg-[#8b0000] text-[#e8e0d0] px-6 py-3 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center gap-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {loading && (
            <span className="inline-block w-4 h-4 border-2 border-[#e8e0d0] border-r-transparent animate-spin" style={{ borderRadius: '50%' }} />
          )}
          {loading ? 'SENDING...' : buttonText}
        </button>
      </div>

      {status === 'error' && errorMessage && (
        <p className="text-[#a50000] text-xs mt-3 animate-fadeIn">{errorMessage}</p>
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
