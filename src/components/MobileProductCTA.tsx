'use client';

import { useEffect, useState } from 'react';
import { BuyButton } from './BuyButton';

interface MobileProductCTAProps {
  productSlug: string;
  productName?: string;
  priceLabel: string;
  isFree: boolean;
  stripePaymentLink?: string;
  ctaText?: string;
}

export function MobileProductCTA({ productSlug, productName, priceLabel, isFree, stripePaymentLink, ctaText }: MobileProductCTAProps) {
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#8b0000]/50 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <span className="text-lg font-bold text-[#e8e0d0]">{priceLabel.endsWith('+') ? priceLabel.slice(0, -1) : priceLabel}</span>
        </div>
        <div className="flex-grow">
          <BuyButton
            productSlug={productSlug}
            productName={productName}
            priceLabel={priceLabel}
            isFree={isFree}
            isSubscription={false}
            stripePaymentLink={stripePaymentLink}
            ctaText={ctaText}
          />
        </div>
      </div>
    </div>
  );
}
