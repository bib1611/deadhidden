'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    setTouched(true);
    if (email && !isValidEmail(email)) {
      setValidationError('Enter a valid email');
    } else {
      setValidationError('');
    }
  };

  const handleFocus = () => {
    setValidationError('');
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleChange = (val: string) => {
    setEmail(val);
    if (touched && validationError && isValidEmail(val)) {
      setValidationError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setValidationError('Enter a valid email');
      inputRef.current?.focus();
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setValidationError('');

    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
      setTouched(false);
      track('email_signup', { source: 'footer' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Try again.');
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#222]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Email Signup Section */}
        <div className="mb-12 md:mb-16">
          <h3
            className="text-xs tracking-[0.3em] uppercase text-[#8b0000] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            GET THE SIGNAL
          </h3>
          {status === 'success' ? (
            <div className="flex items-center gap-2 max-w-md animate-fadeIn">
              <p className="text-sm text-[#e8e0d0] font-bold uppercase tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>
                You&apos;re in.
              </p>
              <p className="text-sm text-[#888]">Check your email to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md" noValidate>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  required
                  disabled={status === 'loading'}
                  className={`flex-1 bg-[#1a1a1a] border ${validationError ? 'border-[#a50000]' : 'border-[#333]'} px-4 py-2 text-sm text-[#e8e0d0] placeholder-[#666] focus:outline-none focus:border-[#8b0000] disabled:opacity-50 transition-colors`}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="btn-press bg-[#8b0000] hover:bg-[#a50000] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 text-sm tracking-[0.12em] uppercase text-[#e8e0d0] transition-all flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {status === 'loading' && (
                    <span className="inline-block w-3.5 h-3.5 border-2 border-[#e8e0d0] border-r-transparent animate-spin" style={{ borderRadius: '50%' }} />
                  )}
                  {status === 'loading' ? 'SENDING...' : 'SUBSCRIBE'}
                </button>
              </div>
              {validationError && (
                <p className="text-[#a50000] text-xs mt-1.5 animate-fadeIn">{validationError}</p>
              )}
              {status === 'error' && errorMessage && (
                <p className="text-[#a50000] text-xs mt-1.5 animate-fadeIn">{errorMessage}</p>
              )}
            </form>
          )}
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Dead Hidden */}
          <div>
            <h3
              className="text-xs tracking-[0.3em] uppercase text-[#8b0000] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              DEAD HIDDEN MINISTRIES
            </h3>
            <p className="text-sm text-[#888] mb-4 leading-relaxed">
              A Bible study ministry and friend to churches. Serving Christians, families, and congregations with the resources the modern church stopped providing.
            </p>
            <p className="text-xs text-[#666]">
              Adam & Christie Johnson
            </p>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h3
              className="text-xs tracking-[0.3em] uppercase text-[#8b0000] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              NAVIGATE
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  The Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Publications */}
          <div>
            <h3
              className="text-xs tracking-[0.3em] uppercase text-[#8b0000] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              PUBLICATIONS
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://open.substack.com/pub/deadhidden?r=2t2o3r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  Dead Hidden Substack
                </a>
              </li>
              <li>
                <a
                  href="https://open.substack.com/pub/thebiblicalman?r=2t2o3r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  The Biblical Man Substack
                </a>
              </li>
              <li>
                <a
                  href="https://open.substack.com/pub/biblicalwomanhood?r=2t2o3r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  Biblical Womanhood Substack
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3
              className="text-xs tracking-[0.3em] uppercase text-[#8b0000] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              CONNECT
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+17014262175"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  (701) 426-2175
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/Biblicalman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@DeadHidden-k5y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://open.substack.com/pub/deadhidden?r=2t2o3r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#888] hover:text-[#e8e0d0] transition-colors"
                >
                  Substack
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#222] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#888]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            © 2026 Dead Hidden Ministries
          </p>
          <p
            className="text-xs tracking-[0.12em] uppercase text-[#8b0000]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            SCRIPTURE. NO COMPROMISE. NO APOLOGY.
          </p>
        </div>
      </div>
      {/* Spacer for fixed radio player */}
      <div className="h-14" />
    </footer>
  );
}
