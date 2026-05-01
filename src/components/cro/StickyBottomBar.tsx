'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';

export default function StickyBottomBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-between gap-3 border-t border-steel px-4 md:hidden"
      style={{
        backgroundColor: 'rgba(5,5,5,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-bone">The Vault</span>
        <span className="font-mono text-sm text-parchment">$297</span>
      </div>
      <Link
        href="/store/the-vault"
        className="inline-flex items-center gap-1 rounded-sm bg-flame px-4 py-2 text-xs font-semibold uppercase tracking-wider text-parchment"
      >
        GET IT NOW <ArrowRight size={12} />
      </Link>
      <button
        onClick={() => {
          setDismissed(true);
          setTimeout(() => setDismissed(false), 30 * 60 * 1000);
        }}
        className="ml-1 text-ash"
        aria-label="Dismiss"
      >
        <X size={18} />
      </button>
    </div>
  );
}
