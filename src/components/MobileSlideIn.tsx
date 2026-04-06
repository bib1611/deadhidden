'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';

const SLIDEIN_DISMISSED_KEY = 'dh_slidein_dismissed';
const SLIDEIN_DISMISSED_TTL = 3 * 24 * 60 * 60 * 1000; // 3 days
const SUBSCRIBER_KEY = 'dh_subscribed';
const TWOSTEP_DISMISSED_KEY = 'dh_twostep_dismissed';

const EXCLUDED_PATHS = ['/checkout', '/thank-you', '/order', '/success'];

function isDismissed(): boolean {
  try {
    const item = localStorage.getItem(SLIDEIN_DISMISSED_KEY);
    if (!item) return false;
    const { timestamp } = JSON.parse(item);
    return Date.now() - timestamp < SLIDEIN_DISMISSED_TTL;
  } catch {
    return false;
  }
}

function markDismissed(): void {
  try {
    localStorage.setItem(SLIDEIN_DISMISSED_KEY, JSON.stringify({ timestamp: Date.now() }));
  } catch {
    // storage not available
  }
}

function isSubscribed(): boolean {
  try {
    return localStorage.getItem(SUBSCRIBER_KEY) === '1';
  } catch {
    return false;
  }
}

function wasTwoStepShown(): boolean {
  try {
    return localStorage.getItem(TWOSTEP_DISMISSED_KEY) !== null;
  } catch {
    return false;
  }
}

export function MobileSlideIn() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const dismiss = useCallback(() => {
    setShow(false);
    markDismissed();
    track('mobile_slidein', { action: 'dismissed' });
  }, []);

  useEffect(() => {
    // Only mobile
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;
    if (isDismissed() || isSubscribed()) return;
    // Don't show if two-step popup was already shown this session
    if (wasTwoStepShown()) return;

    let triggered = false;

    const handleScroll = () => {
      if (triggered) return;
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.5) {
        triggered = true;
        setShow(true);
        track('mobile_slidein', { action: 'shown' });
      }
    };

    // Delay before listening
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[105] animate-slideUp">
      <div className="bg-[#0a0a0a] border-t border-[#8b0000] px-4 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-[#555] hover:text-[#e8e0d0] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          &#10005;
        </button>

        <div className="pr-10">
          <p
            className="text-sm uppercase tracking-[0.08em] text-[#e8e0d0] font-bold mb-1"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            FREE PDF: THE SUBMISSION FRAUD
          </p>
          <p className="text-xs text-[#888] mb-3">
            The most misunderstood word in the Bible, decoded. Get it free.
          </p>
        </div>

        <EmailCaptureForm
          variant="slide-in"
          source="mobile_slidein"
          leadMagnet="submission-fraud"
          buttonText="SEND IT"
          successMessage="Check your inbox — it's on its way."
          onSuccess={() => {
            track('mobile_slidein', { action: 'submitted' });
            setTimeout(dismiss, 3000);
          }}
          placeholder="Your email"
        />
      </div>
    </div>
  );
}
