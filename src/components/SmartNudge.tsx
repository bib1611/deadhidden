'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';
import { useIntentScore, getIntentScore } from '@/hooks/useIntentScore';
import { useCategoryIntent, getRecommendation } from '@/hooks/useCategoryIntent';
import type { ProductRecommendation } from '@/hooks/useCategoryIntent';

const NUDGE_COUNT_KEY = 'dh_nudge_count';
const NUDGE_SHOWN_KEY = 'dh_nudge_product_shown';
const PURCHASED_KEY = 'dh_purchased';
const SUPPRESSED_PATHS = ['/checkout', '/success', '/support'];

type NudgeTier = 'none' | 'subtle' | 'recommendation' | 'buyer';

function getNudgeCount(): number {
  try {
    return parseInt(sessionStorage.getItem(NUDGE_COUNT_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

function incrementNudgeCount(): void {
  try {
    const count = getNudgeCount() + 1;
    sessionStorage.setItem(NUDGE_COUNT_KEY, String(count));
  } catch {
    // ignore
  }
}

function hasPurchased(): boolean {
  try {
    return sessionStorage.getItem(PURCHASED_KEY) === '1';
  } catch {
    return false;
  }
}

function hasProductNudgeShown(): boolean {
  try {
    return sessionStorage.getItem(NUDGE_SHOWN_KEY) === '1';
  } catch {
    return false;
  }
}

function markProductNudgeShown(): void {
  try {
    sessionStorage.setItem(NUDGE_SHOWN_KEY, '1');
  } catch {
    // ignore
  }
}

function isExitPopupVisible(): boolean {
  try {
    // Check if the exit-intent popup is visible by checking for its z-[100] overlay
    const exitPopup = document.querySelector('[class*="z-\\[100\\]"]');
    return exitPopup !== null && window.getComputedStyle(exitPopup).display !== 'none';
  } catch {
    return false;
  }
}

function getTier(score: number): NudgeTier {
  if (score >= 13) return 'buyer';
  if (score >= 8) return 'recommendation';
  if (score >= 4) return 'subtle';
  return 'none';
}

export function SmartNudge() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [tier, setTier] = useState<NudgeTier>('none');
  const [recommendation, setRecommendation] = useState<ProductRecommendation | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount hooks to track signals
  useIntentScore();
  useCategoryIntent();

  const dismiss = useCallback(() => {
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 300);
    if (tier === 'recommendation' && recommendation) {
      track('smart_nudge', { score: String(getIntentScore()), product: recommendation.slug, action: 'dismissed' });
    } else if (tier === 'buyer') {
      track('smart_nudge', { score: String(getIntentScore()), product: 'essential-arsenal', action: 'dismissed' });
    } else {
      track('smart_nudge', { score: String(getIntentScore()), product: 'subtle_banner', action: 'dismissed' });
    }
  }, [tier, recommendation]);

  const handleClick = useCallback((product: string, url: string) => {
    track('smart_nudge', { score: String(getIntentScore()), product, action: 'clicked' });
    window.location.href = url;
  }, []);

  // Evaluate whether to show a nudge
  useEffect(() => {
    // Reset on route change
    setVisible(false);
    setAnimateIn(false);

    // Suppressed pages
    if (SUPPRESSED_PATHS.some((p) => pathname.startsWith(p))) return;

    // Already purchased
    if (hasPurchased()) return;

    // Max 3 nudges per session
    if (getNudgeCount() >= 3) return;

    // Wait 10 seconds before any nudge (spec requirement)
    showTimeoutRef.current = setTimeout(() => {
      // Re-check suppression conditions after delay
      if (hasPurchased() || getNudgeCount() >= 3) return;
      if (isExitPopupVisible()) return;

      const score = getIntentScore();
      const currentTier = getTier(score);

      if (currentTier === 'none') return;

      // For recommendation tier, only show once per session
      if (currentTier === 'recommendation' && hasProductNudgeShown()) return;

      const rec = getRecommendation();
      setRecommendation(rec);
      setTier(currentTier);
      setVisible(true);
      incrementNudgeCount();

      if (currentTier === 'recommendation') {
        markProductNudgeShown();
        track('smart_nudge', { score: String(score), product: rec.slug, action: 'shown' });
      } else if (currentTier === 'buyer') {
        track('smart_nudge', { score: String(score), product: 'essential-arsenal', action: 'shown' });
      } else {
        track('smart_nudge', { score: String(score), product: 'subtle_banner', action: 'shown' });
      }

      // Animate in after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    }, 10000);

    // Also periodically check if exit popup appeared (suppress if so)
    checkIntervalRef.current = setInterval(() => {
      if (isExitPopupVisible() && visible) {
        setAnimateIn(false);
        setTimeout(() => setVisible(false), 300);
      }
    }, 2000);

    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  // Score 4-7: Subtle bottom banner
  if (tier === 'subtle') {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-[90] transition-all duration-300 ease-out ${
          animateIn ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="bg-[#111] border-t border-[#8b0000]/40 px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
          <p className="text-sm text-[#e8e0d0] flex-1">
            <span className="text-[#888]">Not sure where to start?</span>{' '}
            <button
              onClick={() => handleClick('where-to-begin', '/where-to-begin')}
              className="text-[#8b0000] hover:text-[#a50000] font-semibold transition-colors"
            >
              Take the 60-second quiz &rarr;
            </button>
          </p>
          <button
            onClick={dismiss}
            className="ml-4 text-[#555] hover:text-[#e8e0d0] transition-colors text-sm flex-shrink-0"
            aria-label="Dismiss"
          >
            &#x2715;
          </button>
        </div>
      </div>
    );
  }

  // Score 8-12: Product recommendation slide-in
  if (tier === 'recommendation' && recommendation) {
    return (
      <div
        className={`fixed bottom-4 right-4 z-[90] w-[320px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out ${
          animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="bg-[#111] border border-[#8b0000]/30 shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="flex items-start justify-between p-4 pb-2">
            <div className="h-0.5 w-8 bg-[#8b0000]" />
            <button
              onClick={dismiss}
              className="text-[#555] hover:text-[#e8e0d0] transition-colors text-xs leading-none"
              aria-label="Dismiss"
            >
              &#x2715;
            </button>
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            <p className="text-xs text-[#888] uppercase tracking-[0.15em] mb-2">Recommended for you</p>
            <h4
              className="text-lg text-[#e8e0d0] uppercase tracking-wide mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {recommendation.name}
            </h4>
            <p className="text-sm text-[#888] mb-3 leading-relaxed">{recommendation.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-[#e8e0d0] font-bold text-lg">{recommendation.price}</span>
              <button
                onClick={() => handleClick(recommendation.slug, `/store/${recommendation.slug}`)}
                className="bg-[#8b0000] text-[#e8e0d0] px-5 py-2 text-sm font-bold uppercase tracking-[0.1em] hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                GET THIS &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Score 13+: Buyer-ready slide-in
  if (tier === 'buyer') {
    return (
      <div
        className={`fixed bottom-4 right-4 z-[90] w-[340px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out ${
          animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="bg-[#111] border border-[#8b0000]/50 shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="flex items-start justify-between p-4 pb-2">
            <div className="h-0.5 w-10 bg-[#8b0000]" />
            <button
              onClick={dismiss}
              className="text-[#555] hover:text-[#e8e0d0] transition-colors text-xs leading-none"
              aria-label="Dismiss"
            >
              &#x2715;
            </button>
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            <h4
              className="text-xl text-[#e8e0d0] uppercase tracking-wide mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              YOU&apos;VE BEEN LOOKING.
            </h4>
            <p className="text-sm text-[#888] mb-4">Here&apos;s the shortcut.</p>

            {/* Essential Arsenal */}
            <div className="border border-[#222] p-3 mb-3">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-sm text-[#e8e0d0] uppercase tracking-wide font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  THE ESSENTIAL ARSENAL
                </span>
                <span className="text-[#e8e0d0] font-bold">$97</span>
              </div>
              <p className="text-xs text-[#888] mb-2">The 10 highest-impact resources. Start here.</p>
              <button
                onClick={() => handleClick('essential-arsenal', '/store/essential-arsenal')}
                className="w-full bg-[#8b0000] text-[#e8e0d0] py-2 text-sm font-bold uppercase tracking-[0.1em] hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                DEPLOY THE 10 &rarr;
              </button>
            </div>

            {/* The Vault */}
            <div className="border border-[#222] p-3">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-sm text-[#e8e0d0] uppercase tracking-wide font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  THE VAULT
                </span>
                <span className="text-[#e8e0d0] font-bold">$365</span>
              </div>
              <p className="text-xs text-[#888] mb-2">The complete arsenal. 76 resources. Everything.</p>
              <button
                onClick={() => handleClick('the-vault', '/store/the-vault')}
                className="w-full border border-[#8b0000] text-[#e8e0d0] py-2 text-sm font-bold uppercase tracking-[0.1em] hover:bg-[#8b0000]/20 transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                GET THE FULL VAULT &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
