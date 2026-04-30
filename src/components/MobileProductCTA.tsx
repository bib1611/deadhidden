'use client';

import { useEffect, useState } from 'react';
import { BuyButton } from './BuyButton';

interface MobileProductCTAProps {
  productSlug: string;
  productName?: string;
  priceLabel: string;
  salePriceCents?: number;
  isFree: boolean;
  ctaText?: string;
}

export function MobileProductCTA({ productSlug, productName, priceLabel, salePriceCents, isFree, ctaText }: MobileProductCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the quick-buy section (~500px)
      setVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const displayPrice = priceLabel.endsWith('+') ? priceLabel.slice(0, -1) : priceLabel;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#111] border-t-2 border-[#8b0000] px-4 py-3" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {salePriceCents ? (
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-[#777] line-through">{displayPrice}</span>
              <span className="text-xl font-bold text-[#e8e0d0]">${salePriceCents / 100}</span>
            </div>
          ) : (
            <span className="text-xl font-bold text-[#e8e0d0]">{displayPrice}</span>
          )}
        </div>
        <div className="flex-grow">
          <BuyButton
            productSlug={productSlug}
            productName={productName}
            priceLabel={priceLabel}
            isFree={isFree}
            isSubscription={false}
            ctaText={ctaText || 'GET THE MANUAL →'}
          />
        </div>
      </div>
    </div>
  );
}
