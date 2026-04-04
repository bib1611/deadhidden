'use client';

import { useState } from 'react';

const GIFT_AMOUNTS = [
  { label: '$10', cents: 1000, tagline: 'A cup of fuel' },
  { label: '$25', cents: 2500, tagline: 'A week of war' },
  { label: '$50', cents: 5000, tagline: 'A month of fire' },
  { label: '$100', cents: 10000, tagline: 'Arsenal resupply' },
];

export function SupportButtons() {
  const [loading, setLoading] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [customLoading, setCustomLoading] = useState(false);

  const handleGift = async (cents: number, index: number) => {
    setLoading(index);
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: cents }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(null);
    }
  };

  const handleCustom = async () => {
    const dollars = parseFloat(customAmount);
    if (!dollars || dollars < 1) return;
    setCustomLoading(true);
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: Math.round(dollars * 100) }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setCustomLoading(false);
    }
  };

  return (
    <div>
      {/* Preset amounts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {GIFT_AMOUNTS.map((gift, i) => (
          <button
            key={gift.cents}
            onClick={() => handleGift(gift.cents, i)}
            disabled={loading !== null}
            className="group border border-[#222] bg-[#111] hover:border-[#8b0000] hover:bg-[#8b0000]/10 transition-all p-6 text-center disabled:opacity-50"
          >
            <div
              className="text-3xl font-bold text-[#e8e0d0] group-hover:text-[#8b0000] transition-colors mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {loading === i ? '...' : gift.label}
            </div>
            <div className="text-xs text-[#777] uppercase tracking-wider">
              {gift.tagline}
            </div>
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777] text-lg">$</span>
          <input
            type="number"
            min="1"
            step="1"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Custom amount"
            className="w-full bg-[#111] border border-[#222] text-[#e8e0d0] pl-8 pr-4 py-4 text-lg focus:border-[#8b0000] focus:outline-none transition-colors"
          />
        </div>
        <button
          onClick={handleCustom}
          disabled={customLoading || !customAmount}
          className="bg-[#8b0000] text-[#e8e0d0] px-8 py-4 uppercase tracking-[0.12em] font-bold hover:bg-[#a50000] transition-colors disabled:opacity-50 flex-shrink-0"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {customLoading ? '...' : 'GIVE'}
        </button>
      </div>

      <p className="text-xs text-[#777] mt-4">
        Secure payment via Stripe. Not tax-deductible — this is support for an independent creator, not a 501(c)(3).
      </p>
    </div>
  );
}
