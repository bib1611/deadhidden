'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';

const EXIT_SEEN_KEY = 'dh_exit_intent_seen';
const EXIT_SEEN_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
const SUBSCRIBER_KEY = 'dh_subscribed';

const EXCLUDED_PATHS = ['/checkout', '/thank-you', '/order', '/success'];

function hasSeenRecently(): boolean {
  try {
    const item = localStorage.getItem(EXIT_SEEN_KEY);
    if (!item) return false;
    const { timestamp } = JSON.parse(item);
    return Date.now() - timestamp < EXIT_SEEN_TTL;
  } catch {
    return false;
  }
}

function markSeen(): void {
  try {
    localStorage.setItem(EXIT_SEEN_KEY, JSON.stringify({ timestamp: Date.now() }));
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

export function DesktopExitIntent() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const pathname = usePathname();

  const dismiss = useCallback(() => {
    setShow(false);
    markSeen();
    track('desktop_exit_intent', { action: 'dismissed', step: String(step) });
  }, [step]);

  useEffect(() => {
    // Desktop only
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;
    if (hasSeenRecently() || isSubscribed()) return;

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        setShow(true);
        track('desktop_exit_intent', { action: 'shown' });
      }
    };

    // 15-second delay before exit-intent can trigger
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pathname]);

  // Escape to close
  useEffect(() => {
    if (!show) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [show, dismiss]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center px-4 animate-fadeIn"
      onClick={dismiss}
    >
      {/* Full-screen dark overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-md" />

      {/* Content */}
      <div
        className="relative w-full max-w-xl text-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute -top-12 right-0 text-[#555] hover:text-[#e8e0d0] transition-colors text-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          &#10005;
        </button>

        {step === 1 ? (
          <>
            <div className="h-1 bg-[#8b0000] w-16 mx-auto mb-8" />
            <h2
              className="text-3xl md:text-4xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              BEFORE YOU GO &mdash; GRAB THIS FREE.
            </h2>
            <p className="text-[#888] mb-3 leading-relaxed">
              <em className="text-[#e8e0d0] not-italic font-bold">The Submission Fraud</em> &mdash; the most misunderstood word in the Bible, decoded.
            </p>
            <p className="text-sm text-[#777] mb-8">
              195 believers already downloaded it. It&apos;s yours free.
            </p>

            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <button
                onClick={() => {
                  setStep(2);
                  track('desktop_exit_intent', { action: 'yes_clicked' });
                }}
                className="btn-press bg-[#8b0000] text-[#e8e0d0] px-8 py-4 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-all min-h-[44px]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                YES, SEND IT TO ME
              </button>
              <button
                onClick={dismiss}
                className="text-[#555] hover:text-[#888] text-xs uppercase tracking-[0.15em] py-3 transition-colors min-h-[44px]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                NO THANKS
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="h-1 bg-[#8b0000] w-16 mx-auto mb-8" />
            <h2
              className="text-3xl md:text-4xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              WHERE SHOULD WE SEND IT?
            </h2>
            <p className="text-sm text-[#888] mb-6 leading-relaxed">
              Enter your email and we&apos;ll send <em className="text-[#e8e0d0] not-italic">The Submission Fraud</em> straight to your inbox.
            </p>

            <div className="max-w-sm mx-auto">
              <EmailCaptureForm
                variant="fullscreen"
                source="desktop_exit_intent"
                leadMagnet="submission-fraud"
                buttonText="SEND MY FREE PDF"
                successMessage="Check your inbox. The guide is heading there now."
                onSuccess={() => {
                  track('desktop_exit_intent', { action: 'submitted' });
                  setTimeout(dismiss, 4000);
                }}
              />
            </div>

            <p className="text-xs text-[#555] mt-6">
              No spam. No selling your data. Just the truth they buried.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
