'use client';

import { useScrollDepth } from '@/hooks/useScrollDepth';

export function ScrollDepthTracker({ page }: { page: string }) {
  useScrollDepth(page);
  return null;
}
