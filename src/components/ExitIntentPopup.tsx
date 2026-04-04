'use client';

import { useEffect, useState, useCallback } from 'react';

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dismissed, setDismissed] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    setDismissed(true);
    try {
      sessionStorage.setItem('dh_exit_dismissed', '1');
    } catch {
      // sessionStorage not available
    }
  }, []);

  useEffect(() => {
    // Don't show if already dismissed this session
    try {
      if (sessionStorage.getItem('dh_exit_dismissed') === '1') {
        setDismissed(true);
        return;
      }
      // Don't show if already subscribed
      if (localStorage.getItem('dh_subscribed') === '1') {
        setDismissed(true);
        return;
      }
    } catch {
      // storage not available
    }

    let hasTriggered = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    // Desktop: mouse leaves viewport (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered && !dismissed) {
        hasTriggered = true;
        setShow(true);
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
      if (scrollUpCount > 8 && !hasTriggered && !dismissed) {
        hasTriggered = true;
        // Small delay so it doesn't feel jarring
        scrollTimeout = setTimeout(() => setShow(true), 500);
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
  }, [dismissed]);

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
        try {
          localStorage.setItem('dh_subscribed', '1');
        } catch {
          // storage not available
        }
        // Auto-dismiss after success
        setTimeout(dismiss, 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (!show || dismissed) return null;

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
              YOU&apos;RE IN.
            </h3>
            <p className="text-sm text-[#888]">
              Check your inbox. The signal is on its way.
            </p>
          </>
        ) : (
          <>
            <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-6" />
            <h3
              className="text-2xl md:text-3xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              BEFORE YOU GO.
            </h3>
            <p className="text-sm text-[#888] mb-6 leading-relaxed">
              Most Christians read content and forget it by Tuesday.<br />
              The ones who change get it delivered to their inbox — raw, unfiltered, weekly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
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
                {loading ? 'SENDING...' : 'GET THE SIGNAL'}
              </button>
            </form>

            {status === 'error' && (
              <p className="text-red-500 text-xs mt-3">Something went wrong. Try again.</p>
            )}

            <p className="text-xs text-[#555] mt-4">
              No spam. No selling your data. Just the things they tried to bury.
            </p>

            <button
              onClick={dismiss}
              className="text-xs text-[#444] hover:text-[#888] mt-4 transition-colors"
            >
              No thanks, I&apos;ll pass
            </button>
          </>
        )}
      </div>
    </div>
  );
}
