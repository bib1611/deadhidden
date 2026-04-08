'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';

const POPUP_SEEN_KEY = 'dh_popup_seen';
const POPUP_SEEN_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days
const SUBSCRIBER_KEY = 'dh_subscribed';

const EXCLUDED_PATHS = ['/checkout', '/thank-you', '/order', '/success'];

function hasSeenPopup(): boolean {
  try {
    const item = localStorage.getItem(POPUP_SEEN_KEY);
    if (!item) return false;
    const { timestamp } = JSON.parse(item);
    return Date.now() - timestamp < POPUP_SEEN_TTL;
  } catch {
    return false;
  }
}

function markPopupSeen(): void {
  try {
    localStorage.setItem(POPUP_SEEN_KEY, JSON.stringify({ timestamp: Date.now() }));
  } catch {
    // localStorage not available
  }
}

function isSubscribed(): boolean {
  try {
    return localStorage.getItem(SUBSCRIBER_KEY) === '1';
  } catch {
    return false;
  }
}

function markSubscribed(): void {
  try {
    localStorage.setItem(SUBSCRIBER_KEY, '1');
  } catch {
    // localStorage not available
  }
}

function isExcludedPage(pathname: string): boolean {
  return EXCLUDED_PATHS.some((path) => pathname.startsWith(path));
}

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [suppressed, setSuppressed] = useState(false);
  const pathname = usePathname();

  const dismiss = useCallback(() => {
    setShow(false);
    setSuppressed(true);
    markPopupSeen();
    track('exit_popup', { action: 'dismissed' });
  }, []);

  useEffect(() => {
    // Don't show on excluded pages
    if (isExcludedPage(pathname)) {
      setSuppressed(true);
      return;
    }

    // Don't show if already seen within 30 days or already subscribed
    if (hasSeenPopup() || isSubscribed()) {
      setSuppressed(true);
      return;
    }

    let hasTriggered = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    // Desktop: mouse leaves viewport (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered && !suppressed) {
        hasTriggered = true;
        setShow(true);
        track('exit_popup', { action: 'shown' });
      }
    };

    // Mobile: scroll up fast (engagement pause pattern)
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Only trigger after they've scrolled down at least 40% of the page
      if (currentY < lastScrollY && lastScrollY > document.body.scrollHeight * 0.4) {
        scrollUpCount++;
      } else {
        scrollUpCount = 0;
      }
      lastScrollY = currentY;

      // Trigger after sustained scroll-up
      if (scrollUpCount > 8 && !hasTriggered && !suppressed) {
        hasTriggered = true;
        // Small delay so it doesn't feel jarring
        scrollTimeout = setTimeout(() => {
          setShow(true);
          track('exit_popup', { action: 'shown' });
        }, 500);
      }
    };

    // Delay adding listeners — don't interrupt someone who just arrived
    const initTimeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 15000); // 15 second delay before exit-intent can trigger

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(scrollTimeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [suppressed, pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'exit-popup' }),
      });

      if (res.ok) {
        setStatus('success');
        markSubscribed();
        markPopupSeen();
        track('email_signup', { source: 'exit_popup' });
        track('exit_popup', { action: 'submitted' });
        // Auto-dismiss after success
        setTimeout(dismiss, 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (!show || suppressed) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={dismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-[#0a0a0a] border border-[#8b0000] p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-[#555] hover:text-[#e8e0d0] transition-colors text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {status === 'success' ? (
          <>
            <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-6" />
            <h3
              className="text-2xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              IT&apos;S ON ITS WAY.
            </h3>
            <p className="text-sm text-[#888] leading-relaxed">
              Check your inbox. The guide is heading there now. Mark us as safe so it doesn&apos;t end up in spam.
            </p>
          </>
        ) : (
          <>
            <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-6" />
            <h3
              className="text-2xl md:text-3xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              THE CHURCH LIED TO HER ABOUT SUBMISSION.
            </h3>
            <p className="text-sm text-[#888] mb-6 leading-relaxed">
              195 believers downloaded this free guide. It&apos;s the most misunderstood word in the Bible — and the modern church has it completely backwards. Get <em className="text-[#e8e0d0] not-italic">The Submission Fraud</em> free.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-[#111] border border-[#222] text-[#e8e0d0] placeholder-[#555] focus:outline-none focus:border-[#8b0000] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#8b0000] text-[#e8e0d0] px-8 py-3.5 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {loading ? 'SENDING...' : 'SEND ME THE GUIDE'}
              </button>
            </form>

            {status === 'error' && (
              <p className="text-red-500 text-xs mt-3">Something went wrong. Try again.</p>
            )}

            <p className="text-xs text-[#555] mt-4">
              No spam. No selling your data. Just the truth they buried.
            </p>

            <button
              onClick={dismiss}
              className="text-xs text-[#444] hover:text-[#888] mt-4 transition-colors"
            >
              No thanks — I already know what the Bible says about this.
            </button>
          </>
        )}
      </div>
    </div>
  );
}
