'use client';

import { useState } from 'react';

interface BuyButtonProps {
  productSlug: string;
  priceLabel: string;
  isFree: boolean;
  isSubscription: boolean;
}

export function BuyButton({
  productSlug,
  priceLabel,
  isFree,
  isSubscription,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
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

      // For free products, redirect to download page
      if (data.isFree) {
        window.location.href = data.url;
        return;
      }

      // For paid products, redirect to Stripe
      if (data.url) {
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

  const buttonText = isFree ? 'GET FREE' : isSubscription ? 'JOIN' : 'BUY NOW';

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full px-6 py-4 bg-blood text-white hover:bg-blood-bright transition-colors text-lg font-semibold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'PROCESSING...' : buttonText}
    </button>
  );
}
