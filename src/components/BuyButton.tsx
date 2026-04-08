'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';
import { EmailGateModal } from '@/components/EmailGateModal';

interface BuyButtonProps {
  productSlug: string;
  productName?: string;
  priceLabel: string;
  isFree: boolean;
  isSubscription: boolean;
  stripePaymentLink?: string;
  ctaText?: string;
}

export function BuyButton({
  productSlug,
  productName,
  priceLabel,
  isFree,
  isSubscription,
  stripePaymentLink,
  ctaText,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailGate, setShowEmailGate] = useState(false);

  const handleClick = async () => {
    // Free products — show email gate modal
    if (isFree) {
      track('free_download_click', { resource: productSlug });
      setShowEmailGate(true);
      return;
    }

    // Direct Stripe payment link — skip /api/checkout entirely
    if (stripePaymentLink) {
      track('checkout_click', {
        product: productSlug,
        price: priceLabel.replace('$', '').replace('+', ''),
      });
      window.location.href = stripePaymentLink;
      return;
    }

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

      // For paid products, redirect to Stripe
      if (data.url) {
        track('checkout_click', {
          product: productSlug,
          price: priceLabel.replace('$', '').replace('+', ''),
        });
        window.location.href = data.url;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
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
