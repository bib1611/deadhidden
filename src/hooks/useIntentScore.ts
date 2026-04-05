'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'dh_intent_score';
const PAGES_KEY = 'dh_pages_visited';
const SIGNALS_KEY = 'dh_signals_fired';
const TIME_KEY = 'dh_page_enter';

interface IntentState {
  score: number;
  pagesVisited: string[];
  signalsFired: string[];
}

function getState(): IntentState {
  try {
    const score = parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10);
    const pagesVisited = JSON.parse(sessionStorage.getItem(PAGES_KEY) || '[]');
    const signalsFired = JSON.parse(sessionStorage.getItem(SIGNALS_KEY) || '[]');
    return { score, pagesVisited, signalsFired };
  } catch {
    return { score: 0, pagesVisited: [], signalsFired: [] };
  }
}

function addScore(points: number): number {
  try {
    const current = parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10);
    const next = Math.max(0, current + points);
    sessionStorage.setItem(STORAGE_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

function fireSignal(id: string, points: number): boolean {
  try {
    const fired = JSON.parse(sessionStorage.getItem(SIGNALS_KEY) || '[]') as string[];
    if (fired.includes(id)) return false;
    fired.push(id);
    sessionStorage.setItem(SIGNALS_KEY, JSON.stringify(fired));
    addScore(points);
    return true;
  } catch {
    return false;
  }
}

function recordPage(pathname: string): string[] {
  try {
    const pages = JSON.parse(sessionStorage.getItem(PAGES_KEY) || '[]') as string[];
    if (!pages.includes(pathname)) {
      pages.push(pathname);
      sessionStorage.setItem(PAGES_KEY, JSON.stringify(pages));
    }
    return pages;
  } catch {
    return [];
  }
}

export function getIntentScore(): number {
  try {
    return parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

export function useIntentScore() {
  const pathname = usePathname();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check returning visitor on mount
  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem('dh_returning_visitor');
      if (hasVisited) {
        fireSignal('returning_visitor', 4);
      } else {
        localStorage.setItem('dh_returning_visitor', '1');
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Check abandoned checkout (referrer from Stripe)
  useEffect(() => {
    try {
      const ref = document.referrer;
      const params = new URLSearchParams(window.location.search);
      if (ref.includes('checkout.stripe.com') || params.get('checkout_abandoned') === 'true') {
        fireSignal('abandoned_checkout', 8);
        sessionStorage.setItem('dh_checkout_abandoned', JSON.stringify({
          abandoned: true,
          timestamp: Date.now(),
        }));
      }
    } catch {
      // ignore
    }
  }, []);

  // Track page visits and page-level signals
  useEffect(() => {
    const pages = recordPage(pathname);

    // Store page enter time
    sessionStorage.setItem(TIME_KEY, String(Date.now()));

    // High intent: visited /store or product page
    if (pathname === '/store' || pathname.startsWith('/store/')) {
      fireSignal('visited_store', 3);
    }

    // High intent: visited specific high-value pages
    if (pathname === '/store/the-vault' || pathname === '/store/essential-arsenal') {
      fireSignal(`visited_${pathname}`, 5);
    }

    // Medium intent: visited /where-to-begin
    if (pathname === '/where-to-begin') {
      fireSignal('visited_where_to_begin', 2);
    }

    // Medium intent: visited /about
    if (pathname === '/about') {
      fireSignal('visited_about', 1);
    }

    // High intent: 3+ pages visited
    if (pages.length >= 3) {
      fireSignal('3_pages', 3);
    }

    // Time-on-page signals
    timerRef.current = setTimeout(() => {
      fireSignal(`time_30s_${pathname}`, 1);
    }, 30000);

    longTimerRef.current = setTimeout(() => {
      fireSignal(`time_60s_${pathname}`, 2);
    }, 60000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (longTimerRef.current) clearTimeout(longTimerRef.current);
    };
  }, [pathname]);

  // Scroll depth tracking for intent scoring
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      // Medium intent: scrolled past 50%
      if (percent >= 50) {
        fireSignal(`scroll_50_${pathname}`, 1);
      }

      // High intent: scrolled past 75% on product page
      if (percent >= 75 && pathname.startsWith('/store/')) {
        fireSignal(`scroll_75_product_${pathname}`, 3);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Track CTA clicks (called externally)
  const trackCTAClick = useCallback(() => {
    fireSignal('cta_click', 5);
  }, []);

  // Track category click (Pick Your Battle)
  const trackCategoryClick = useCallback(() => {
    fireSignal('category_click', 2);
  }, []);

  // Track back/bounce
  const trackBounce = useCallback(() => {
    addScore(-1);
  }, []);

  return {
    getScore: getIntentScore,
    getState,
    trackCTAClick,
    trackCategoryClick,
    trackBounce,
  };
}
