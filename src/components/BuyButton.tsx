'use client';

import { useState } from 'react';
import { EmailGateModal } from '@/components/EmailGateModal';
import { numericPrice, trackConversion } from '@/lib/conversion-events';

interface BuyButtonProps {
  productSlug: string;
  productName?: string;
  priceLabel: string;
  isFree: boolean;
  isSubscription: boolean;
  ctaText?: string;
}

export function BuyButton({
  productSlug,
  productName,
  priceLabel,
  isFree,
  isSubscription,
  ctaText,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);

  const handleClick = async () => {
    // Free products — show email gate modal
    if (isFree) {
      trackConversion('free_download', {
        product: productSlug,
        source: 'buy_button',
      });
      setShowEmailGate(true);
      return;
    }

    const price = numericPrice(priceLabel);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productSlug }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();

      // For paid products, redirect to Stripe Checkout Session.
      // Do not bypass /api/checkout with hardcoded Payment Links; fulfillment depends on session metadata.
      if (data.url) {
        trackConversion('checkout_started', {
          product: productSlug,
          price,
          checkout_type: isSubscription ? 'subscription' : 'checkout_session',
        });
        window.location.href = data.url;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      trackConversion('checkout_failed', {
        product: productSlug,
        price,
        message,
      });
      alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const buttonText = ctaText || (isFree ? 'GET FREE DOWNLOAD' : isSubscription ? 'JOIN' : 'BUY NOW');

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full px-6 py-4 bg-blood text-white hover:bg-blood-bright transition-colors text-lg font-semibold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'PROCESSING...' : buttonText}
      </button>

      {error && (
        <p className="mt-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {showEmailGate && (
        <EmailGateModal
          productName={productName || productSlug}
          productSlug={productSlug}
          onClose={() => setShowEmailGate(false)}
        />
      )}
    </>
  );
}
