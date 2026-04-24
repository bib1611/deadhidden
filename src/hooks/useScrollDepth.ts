'use client';

import { useEffect, useRef } from 'react';
import { trackConversion } from '@/lib/conversion-events';

export function useScrollDepth(page: string) {
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const threshold of thresholds) {
          const key = `${threshold}`;
          if (percent >= threshold && !firedRef.current.has(key)) {
            firedRef.current.add(key);
            trackConversion('scroll_depth', { depth: key, page });
          }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);
}
