'use client';

import { useEffect, useRef } from 'react';
import { numericPrice, trackConversion } from '@/lib/conversion-events';
import { useScrollDepth } from '@/hooks/useScrollDepth';

export function ProductViewTracker({ slug, price }: { slug: string; price: string }) {
  const trackedRef = useRef(false);

  useScrollDepth(`/store/${slug}`);

  useEffect(() => {
    if (!trackedRef.current) {
      trackedRef.current = true;
      trackConversion('product_view', {
        product: slug,
        price: numericPrice(price),
      });
    }
  }, [slug, price]);

  return null;
}
