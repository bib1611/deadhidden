'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (roughly 400px)
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-[3.25rem] left-0 right-0 z-50 md:hidden bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#8b0000]/50 px-4 py-3 safe-area-bottom">
      <div className="flex gap-3">
        <Link
          href="/store"
          className="flex-1 bg-[#8b0000] text-[#e8e0d0] text-center py-3 uppercase tracking-[0.1em] text-xs font-bold hover:bg-[#a50000] transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          BROWSE ARCHIVE
        </Link>
        <Link
          href="/where-to-begin"
          className="flex-1 border border-[#e8e0d0]/30 text-[#e8e0d0] text-center py-3 uppercase tracking-[0.1em] text-xs font-bold hover:border-[#e8e0d0]/60 transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          WHERE TO BEGIN
        </Link>
      </div>
    </div>
  );
}
