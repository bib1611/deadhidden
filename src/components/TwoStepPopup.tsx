'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';

const POPUP_DISMISSED_KEY = 'dh_twostep_dismissed';
const POPUP_DISMISSED_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days
const PAGE_VIEW_KEY = 'dh_page_views';
const SUBSCRIBER_KEY = 'dh_subscribed';

const EXCLUDED_PATHS = ['/checkout', '/thank-you', '/order', '/success'];

function isDismissed(): boolean {
  try {
    const item = localStorage.getItem(POPUP_DISMISSED_KEY);
    if (!item) return false;
    const { timestamp } = JSON.parse(item);
    return Date.now() - timestamp < POPUP_DISMISSED_TTL;
  } catch {
    return false;
  }
}

function markDismissed(): void {
  try {
    localStorage.setItem(POPUP_DISMISSED_KEY, JSON.stringify({ timestamp: Date.now() }));
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

function getPageViewCount(): number {
  try {
    const count = sessionStorage.getItem(PAGE_VIEW_KEY);
    return count ? parseInt(count, 10) : 0;
  } catch {
    return 0;
  }
}

function incrementPageViews(): number {
  try {
    const current = getPageViewCount();
    const next = current + 1;
    sessionStorage.setItem(PAGE_VIEW_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

export function TwoStepPopup() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const pathname = usePathname();

  const dismiss = useCallback(() => {
    setShow(false);
    markDismissed();
    track('twostep_popup', { action: 'dismissed', step: String(step) });
  }, [step]);

  useEffect(() => {
    // Do not cover the rebuilt homepage hero/sampler offer.
    if (pathname === '/') return;
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;
    if (isDismissed() || isSubscribed()) return;

    const views = incrementPageViews();

    // Fire on the second page view
    if (views === 2) {
      // Small delay so it doesn't feel jarring
      const timer = setTimeout(() => {
        setShow(true);
        track('twostep_popup', { action: 'shown' });
      }, 1500);
      return () => clearTimeout(timer);
    }
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end md:items-center justify-center"
      onClick={dismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm animate-fadeIn" />

      {/* Modal */}
      <div
        className={`relative w-full bg-[#0a0a0a] border border-[#8b0000] text-center ${
          isMobile
            ? 'max-h-[85vh] overflow-y-auto animate-slideUp'
            : 'max-w-lg mx-4 animate-fadeIn'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-[#555] hover:text-[#e8e0d0] transition-colors text-lg z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          &#10005;
        </button>

        <div className="p-8 md:p-10">
          {step === 1 ? (
            <>
              <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-6" />
              <h3
                className="text-2xl md:text-3xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                WANT THE FULL DEAD HIDDEN ARMORY?
              </h3>
              <p className="text-sm text-[#888] mb-8 leading-relaxed max-w-sm mx-auto">
                Free biblical resources. Field notes. Kingdom-building blueprints.
              </p>

              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button
                  onClick={() => {
                    setStep(2);
                    track('twostep_popup', { action: 'yes_clicked' });
                  }}
                  className="btn-press bg-[#8b0000] text-[#e8e0d0] px-8 py-4 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-all min-h-[44px]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  YES, I&apos;M IN
                </button>
                <button
                  onClick={dismiss}
                  className="border border-[#333] text-[#777] px-8 py-3 uppercase tracking-[0.15em] text-sm hover:border-[#555] hover:text-[#888] transition-colors min-h-[44px]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  NOT YET
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-6" />
              <h3
                className="text-2xl md:text-3xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                ENTER YOUR EMAIL.
              </h3>
              <p className="text-sm text-[#888] mb-6 leading-relaxed">
                We&apos;ll send you the arsenal.
              </p>

              <div className="max-w-sm mx-auto">
                <EmailCaptureForm
                  variant="popup"
                  source="twostep_popup"
                  buttonText="SEND IT"
                  successMessage="Check your inbox. The arsenal is on its way."
                  onSuccess={() => {
                    track('twostep_popup', { action: 'submitted' });
                    setTimeout(dismiss, 3000);
                  }}
                />
              </div>

              <p className="text-xs text-[#555] mt-4">
                No spam. No selling your data. Just the truth they buried.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
