'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const testimonials = [
  {
    quote: "You have opened my eyes and heart in so many ways. We would love to support you. I'm sending this to my husband.",
    name: 'Jo',
    source: '@JOANNA953534211',
  },
  {
    quote: "This is so smart, and so true. It would have saved my marriage that ended years ago.",
    name: 'Jellenne',
    source: '@JELLENNE',
  },
  {
    quote: "Amen and this has changed my life and my wife's life. It's incredible.",
    name: 'Trebor',
    source: '@ROBERTROLLTIDE1',
  },
  {
    quote: "I can't express how much this touched me. I needed this. I'm a recent widow after 57 years together. I needed to find grace.",
    name: 'Bonnie',
    source: '@IOWABONNIE',
  },
  {
    quote: "I needed this. Sent it to both my children.",
    name: 'FightingTheRapture',
    source: '@FIGHTINGTHERAP1',
  },
  {
    quote: "Here I am scrolling on my phone in bed and my wife asleep next to me. Struggling and overwhelmed and this just opened my eyes and heart. Thank you.",
    name: 'CD Arnold',
    source: '@CDARNOLD18206',
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const current = testimonials[index];

  return (
    <div className="relative mx-auto max-w-[720px] overflow-hidden px-4">
      <div className="relative min-h-[240px] md:min-h-[200px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative rounded-sm border-l-[3px] border-l-crimson bg-charcoal p-6 md:p-8"
          >
            <span className="absolute left-4 top-2 font-serif text-6xl leading-none text-crimson/15">&ldquo;</span>
            <p className="relative z-10 text-lg italic text-bone leading-relaxed">{current.quote}</p>
            <div className="relative z-10 mt-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-steel">
                <span className="font-bold text-lg text-bone">{current.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-parchment">{current.name}</p>
                <p className="flex items-center gap-1 text-xs text-ash">
                  <CheckCircle size={12} className="text-moss" /> Verified X Reader &middot; {current.source}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-flame' : 'w-2 bg-steel hover:bg-iron'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
