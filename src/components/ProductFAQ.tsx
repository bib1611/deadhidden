'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

export function ProductFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mb-12 border-t border-[#222] pt-12">
      <h2
        className="text-2xl uppercase font-bold text-[#e8e0d0] mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        QUESTIONS
      </h2>
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={i} className="border-b border-[#222]">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-4 py-5 text-left"
            >
              <span className="text-sm font-bold text-[#e8e0d0] leading-relaxed">
                {item.q}
              </span>
              <span className="text-[#8b0000] flex-shrink-0 text-lg leading-none mt-0.5">
                {open === i ? '−' : '+'}
              </span>
            </button>
            {open === i && (
              <div className="pb-5 pr-8">
                <p className="text-sm text-[#888] leading-relaxed">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
