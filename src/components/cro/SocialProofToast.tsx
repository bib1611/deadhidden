'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  { name: 'Mike', location: 'Texas', action: 'just got The Vault' },
  { name: 'Sarah', location: 'Ohio', action: 'downloaded the free guide' },
  { name: 'David', location: 'Florida', action: 'just got The Vault' },
  { name: 'Jennifer', location: 'Georgia', action: 'downloaded the free guide' },
  { name: '3 people', location: '', action: 'got the Sampler this hour' },
  { name: 'Chris', location: 'Tennessee', action: 'just got The Vault' },
];

const SocialProofToast = memo(function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const cycle = () => {
      if (cancelled) return;
      const delay = Math.random() * 30000 + 15000;
      setTimeout(() => {
        if (cancelled) return;
        setCurrent((i) => (i + 1) % messages.length);
        setVisible(true);
        setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, 5000);
        setTimeout(cycle, 45000);
      }, delay);
    };
    cycle();
    return () => {
      cancelled = true;
    };
  }, []);

  const msg = messages[current];

  return (
    <div className="fixed bottom-6 right-6 z-[45] flex flex-col gap-2">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: '120%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '120%', opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex max-w-[320px] items-start gap-3 rounded-sm border border-steel bg-charcoal p-3 shadow-lg"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-steel">
              <span className="font-bold text-sm text-bone">{msg.name[0]}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-bone">
                <strong>{msg.name}</strong>
                {msg.location && ` from ${msg.location}`} {msg.action}
              </p>
              <p className="text-[11px] text-ash">Just now</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default SocialProofToast;
