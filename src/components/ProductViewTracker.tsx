'use client';

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';
import { useScrollDepth } from '@/hooks/useScrollDepth';

export function ProductViewTracker({ slug, price }: { slug: string; price: string }) {
  const trackedRef = useRef(false);

  useScrollDepth(`/store/${slug}`);

  useEffect(() => {
    if (!trackedRef.current) {
      trackedRef.current = true;
      track('product_view', {
        product: slug,
        price: price.replace('$', '').replace('+', ''),
      });
    }
  }, [slug, price]);

  return null;
}
