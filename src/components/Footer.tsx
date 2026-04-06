'use client';

import { useState } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

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
      track('email_signup', { source: 'footer' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setTimeout(() => setStatus('idle'), 3000);
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
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              className="flex-1 bg-[#1a1a1a] border border-[#333] px-4 py-2 text-sm text-[#e8e0d0] placeholder-[#666] focus:outline-none focus:border-[#8b0000] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#8b0000] hover:bg-[#a50000] disabled:opacity-50 px-6 py-2 text-sm tracking-[0.12em] uppercase text-[#e8e0d0] transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {status === 'loading' ? 'SENDING...' : 'SUBSCRIBE'}
            </button>
          </form>
          {status === 'success' && (
            <p className="text-sm text-[#8b0000] mt-2">Check your email to confirm.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-[#8b0000] mt-2">{errorMessage}</p>
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
