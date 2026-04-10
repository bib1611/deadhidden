'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';

const ABANDONED_KEY = 'dh_checkout_abandoned';
const RECOVERY_SHOWN_KEY = 'dh_recovery_shown';
const PURCHASED_KEY = 'dh_purchased';
const SUPPRESSED_PATHS = ['/checkout', '/success', '/support'];

interface AbandonedCheckout {
  abandoned: boolean;
  timestamp: number;
  product?: string;
  stripeUrl?: string;
}

function getAbandoned(): AbandonedCheckout | null {
  try {
    const data = sessionStorage.getItem(ABANDONED_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function hasRecoveryShown(): boolean {
  try {
    return sessionStorage.getItem(RECOVERY_SHOWN_KEY) === '1';
  } catch {
    return false;
  }
}

function markRecoveryShown(): void {
  try {
    sessionStorage.setItem(RECOVERY_SHOWN_KEY, '1');
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

// Detect which product was being purchased by checking recent page history
function detectProduct(): { name: string; price: string; slug: string } {
  try {
    const pages = JSON.parse(sessionStorage.getItem('dh_pages_visited') || '[]') as string[];
    // Check pages in reverse order (most recent first)
    for (let i = pages.length - 1; i >= 0; i--) {
      const page = pages[i];
      if (page === '/store/the-vault') return { name: 'THE BIBLICAL MAN VAULT', price: '$365', slug: 'the-vault' };
      if (page === '/store/essential-arsenal') return { name: 'THE ESSENTIAL ARSENAL', price: '$97', slug: 'essential-arsenal' };
      if (page === '/store/kings-marriage-manual-red') return { name: "THE KING'S MARRIAGE MANUAL", price: '$47', slug: 'kings-marriage-manual-red' };
      if (page === '/store/blood-and-bandwidth') return { name: 'BLOOD AND BANDWIDTH', price: '$50', slug: 'blood-and-bandwidth' };
      if (page === '/store/traditional-homemaking') return { name: 'TRADITIONAL BIBLICAL HOMEMAKING', price: '$32.95', slug: 'traditional-homemaking' };
      if (page === '/store/caged-porn') return { name: 'CAGED', price: '$37', slug: 'caged-porn' };
      if (page.startsWith('/store/') && page !== '/store') {
        // Generic product — use slug
        const slug = page.replace('/store/', '');
        return { name: slug.replace(/-/g, ' ').toUpperCase(), price: '', slug };
      }
    }
  } catch {
    // ignore
  }
  return { name: 'YOUR ORDER', price: '', slug: '' };
}

export function CheckoutRecovery() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [product, setProduct] = useState<{ name: string; price: string; slug: string } | null>(null);
  const initRef = useRef(false);

  const dismissModal = useCallback(() => {
    setAnimateIn(false);
    setTimeout(() => {
      setShowModal(false);
      // Show persistent banner after dismissing modal
      setShowBanner(true);
    }, 300);
    track('checkout_recovery', { product: product?.slug || 'unknown', action: 'dismissed' });
  }, [product]);

  const handleComplete = useCallback(() => {
    if (product?.slug) {
      track('checkout_recovery', { product: product.slug, action: 'clicked' });
      window.location.href = `/store/${product.slug}`;
    }
  }, [product]);

  const dismissBanner = useCallback(() => {
    setShowBanner(false);
  }, []);

  // Check for abandoned checkout on mount / route change
  useEffect(() => {
    // Suppressed pages
    if (SUPPRESSED_PATHS.some((p) => pathname.startsWith(p))) return;
    if (hasPurchased()) return;

    const abandoned = getAbandoned();
    if (!abandoned?.abandoned) return;

    // If recovery modal already shown, show banner instead
    if (hasRecoveryShown()) {
      setShowBanner(true);
      setProduct(detectProduct());
      return;
    }

    // Only show once
    if (initRef.current) return;
    initRef.current = true;

    const detected = detectProduct();
    setProduct(detected);
    markRecoveryShown();

    // Show immediately for abandoned checkout (this is the money feature)
    setShowModal(true);
    track('checkout_recovery', { product: detected.slug, action: 'shown' });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimateIn(true));
    });
  }, [pathname]);

  // Recovery Modal (center — this is the exception to bottom-right per spec)
  if (showModal && product) {
    return (
      <div
        className="fixed inset-0 z-[95] flex items-center justify-center px-4"
        onClick={dismissModal}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <div
          className={`relative w-full max-w-md bg-[#0a0a0a] border border-[#8b0000] p-8 text-center transition-all duration-300 ease-out ${
            animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={dismissModal}
            className="absolute top-4 right-4 text-[#555] hover:text-[#e8e0d0] transition-colors text-lg"
            aria-label="Close"
          >
            &#x2715;
          </button>

          <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-6" />

          <h3
            className="text-2xl md:text-3xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            YOUR ORDER IS WAITING.
          </h3>

          {product.name !== 'YOUR ORDER' && (
            <p className="text-lg text-[#e8e0d0] mb-1">
              {product.name}
              {product.price && <span className="text-[#888]"> — {product.price}</span>}
            </p>
          )}

          <p className="text-sm text-[#888] mb-6 leading-relaxed">
            You were almost there. Pick up where you left off.
          </p>

          <button
            onClick={handleComplete}
            className="w-full bg-[#8b0000] text-[#e8e0d0] px-8 py-4 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors text-lg"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            COMPLETE YOUR PURCHASE &rarr;
          </button>

          <p className="text-xs text-[#555] mt-4">
            Having trouble?{' '}
            <a href="tel:+17014144725" className="text-[#8b0000] hover:text-[#a50000] transition-colors">
              (701) 414-4725
            </a>{' '}
            <span className="text-[#666]">(voice only)</span>
          </p>
        </div>
      </div>
    );
  }

  // Persistent banner after modal dismissal
  if (showBanner && product) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[90] bg-[#111] border-b border-[#8b0000]/40">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <p className="text-sm text-[#e8e0d0] flex-1">
            <span className="text-[#888]">Your order is still waiting</span>{' '}
            <button
              onClick={handleComplete}
              className="text-[#8b0000] hover:text-[#a50000] font-semibold transition-colors"
            >
              Complete purchase &rarr;
            </button>
          </p>
          <button
            onClick={dismissBanner}
            className="ml-4 text-[#555] hover:text-[#e8e0d0] transition-colors text-sm flex-shrink-0"
            aria-label="Dismiss"
          >
            &#x2715;
          </button>
        </div>
      </div>
    );
  }

  return null;
}
