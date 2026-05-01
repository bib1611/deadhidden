'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Lock, Star, ArrowRight } from 'lucide-react';

interface QuizAnswer {
  label: string;
  value: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'WHAT BROUGHT YOU HERE TODAY?',
    answers: [
      { label: 'Marriage struggles', value: 'marriage' },
      { label: 'Spiritual warfare', value: 'warfare' },
      { label: 'Bible study hunger', value: 'bible' },
      { label: 'Parenting battle', value: 'parenting' },
      { label: 'General discipleship', value: 'discipleship' },
    ],
  },
  {
    id: 2,
    question: 'HOW LONG HAVE YOU BEEN IN CHURCH?',
    answers: [
      { label: 'Less than 1 year', value: 'new' },
      { label: '1–5 years', value: 'growing' },
      { label: '5–10 years', value: 'seasoned' },
      { label: '10+ years', value: 'veteran' },
      { label: 'I left and came back', value: 'returned' },
    ],
  },
  {
    id: 3,
    question: "WHAT'S YOUR BIGGEST FRUSTRATION WITH MODERN TEACHING?",
    answers: [
      { label: 'Watered down', value: 'watered' },
      { label: 'No depth', value: 'shallow' },
      { label: 'Feminism in church', value: 'feminism' },
      { label: 'Men not leading', value: 'headship' },
      { label: "Don't know where to start", value: 'lost' },
    ],
  },
  {
    id: 4,
    question: 'ARE YOU LOOKING FOR YOURSELF OR YOUR HOUSEHOLD?',
    answers: [
      { label: 'Just me', value: 'self' },
      { label: 'My marriage', value: 'marriage' },
      { label: 'My family', value: 'family' },
      { label: 'My church', value: 'church' },
    ],
  },
  {
    id: 5,
    question: 'WHICH DESCRIBES YOU BEST?',
    answers: [
      { label: 'Man 18–35', value: 'm18-35' },
      { label: 'Man 36–55', value: 'm36-55' },
      { label: 'Man 55+', value: 'm55+' },
      { label: 'Woman 18–35', value: 'w18-35' },
      { label: 'Woman 36–55', value: 'w36-55' },
      { label: 'Woman 55+', value: 'w55+' },
    ],
  },
];

const categoryMap: Record<string, string> = {
  marriage: 'MARRIAGE & MASCULINITY',
  warfare: 'SPIRITUAL WARFARE',
  bible: 'BIBLE STUDY',
  parenting: 'PARENTING',
  discipleship: 'DISCIPLESHIP',
};

const resourceMap: Record<string, { title: string; desc: string; price: string; bullets: string[]; slug: string }> = {
  marriage: {
    title: 'Biblical Man Field Manual',
    desc: 'A tactical guide for husbands and fathers who are done apologizing for leading.',
    price: '$77',
    bullets: ['Step-by-step headship framework', 'Covenant marriage battle plan'],
    slug: 'biblical-man-field-manual',
  },
  warfare: {
    title: 'Familiar Spirits',
    desc: 'The spiritual warfare primer that exposes familiar spirits and the weapons to break them.',
    price: '$25',
    bullets: ['Identify oppression sources', 'Prayer frameworks that work'],
    slug: 'familiar-spirits',
  },
  bible: {
    title: '30 Biblical Rebels',
    desc: 'Verse-by-verse: 30 men and women your pastor skips, and what their stories actually mean.',
    price: '$17',
    bullets: ['Rightly dividing framework', '30 rebels your pastor skips'],
    slug: '30-biblical-rebels',
  },
  parenting: {
    title: "God's Design for Bodies",
    desc: 'The biblical framework for raising children in a hostile culture.',
    price: '$27',
    bullets: ['Biblical discipline decoded', 'Culture-proofing your kids'],
    slug: 'gods-design-for-bodies',
  },
  discipleship: {
    title: 'The Vault — Full Arsenal',
    desc: '83+ resources. Every doctrine. Every battle. One complete digital archive.',
    price: '$297',
    bullets: ['All 83+ resources included', 'Lifetime access, instant download'],
    slug: 'the-vault',
  },
};

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

export default function QuizFunnel() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  const primaryCategory = answers[1] ? categoryMap[answers[1]] || 'DISCIPLESHIP' : 'DISCIPLESHIP';
  const rawKey = answers[1] || 'discipleship';
  const recommended = resourceMap[rawKey] || resourceMap.discipleship;

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [questions[currentQ].id]: value }));
    if (currentQ < questions.length - 1) {
      setTimeout(() => {
        setDirection(1);
        setCurrentQ((q) => q + 1);
      }, 400);
    } else {
      setTimeout(() => setShowResults(true), 400);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'find-your-fight',
          tags: [`quiz_${rawKey}`, 'quiz_lead'],
        }),
      });
      setEmailSubmitted(true);
    } catch {
      setEmailSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!started) {
    return (
      <main className="bg-void min-h-screen text-bone">
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(139,0,0,0.25) 0%, transparent 60%), linear-gradient(to bottom, #050505 0%, #0a0a0a 100%)',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 mx-auto max-w-[800px] px-4 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs font-mono uppercase tracking-[0.2em] text-blood"
            >
              60-SECOND QUIZ / ZERO COST
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 font-bold uppercase text-parchment leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              FIND YOUR FIGHT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mx-auto mt-6 max-w-[560px] text-lg text-smoke leading-relaxed"
            >
              Choose the battle you&apos;re in. We&apos;ll hand you the weapon. 5 questions. Instant result.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              onClick={handleStart}
              className="mt-10 inline-flex items-center gap-2 rounded-sm bg-flame px-8 py-4 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00] hover:shadow-[0_8px_24px_rgba(217,79,0,0.4)]"
            >
              START THE QUIZ <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </section>
      </main>
    );
  }

  if (showResults) {
    return (
      <main className="bg-void min-h-screen text-bone">
        <div className="fixed left-0 right-0 top-0 z-40 h-1 bg-steel">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full bg-flame"
          />
        </div>
        <section className="mx-auto max-w-[800px] px-4 pb-24 pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="rounded-sm border-t-4 border-t-flame bg-charcoal p-8 md:p-12"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood text-center">YOUR BATTLEFIELD</p>
            <h2 className="mt-2 text-center text-3xl md:text-5xl font-bold uppercase text-parchment">
              <span className="text-flame">{primaryCategory}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[600px] text-center text-lg text-smoke leading-relaxed">
              Based on your answers, this is where the fight is hottest for you right now. We&apos;ve matched you with the weapon that fits.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 rounded-sm border border-steel bg-ink p-6 md:p-8"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-[160px] w-full shrink-0 items-center justify-center rounded-sm bg-steel md:w-[200px]">
                  <span className="font-bold text-2xl uppercase text-ash">RESOURCE</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">RECOMMENDED FOR YOU</p>
                  <h3 className="mt-1 text-2xl font-bold uppercase text-bone">{recommended.title}</h3>
                  <p className="mt-2 text-base text-smoke leading-relaxed">{recommended.desc}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <span className="font-mono text-3xl font-bold text-parchment">{recommended.price}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-xs uppercase tracking-wider text-ash">4.9/5</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {recommended.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-smoke">
                        <Check size={14} className="text-moss" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/store/${recommended.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-sm bg-flame px-6 py-3 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00] hover:shadow-[0_8px_24px_rgba(217,79,0,0.4)]"
                  >
                    SEE THIS RESOURCE <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {!skipped && !emailSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 rounded-sm border-l-4 border-l-crimson bg-ink p-6 md:p-8"
                style={{ boxShadow: '0 0 60px rgba(139,0,0,0.15)' }}
              >
                <h3 className="text-center text-2xl font-bold uppercase text-bone leading-tight">
                  ENTER YOUR EMAIL FOR YOUR PERSONALIZED BATTLE PLAN + 4 FREE WEAPONS
                </h3>
                <p className="mx-auto mt-3 max-w-[480px] text-center text-base text-smoke">
                  We&apos;ll send your matched resource recommendation plus 3 free field guides. No spam. Unsubscribe anytime.
                </p>

                <form onSubmit={handleEmailSubmit} className="mx-auto mt-6 flex max-w-[480px] flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 rounded-sm border border-steel bg-charcoal py-3.5 px-4 text-base text-bone placeholder:text-ash/50 focus:border-flame focus:outline-none focus:ring-[3px] focus:ring-[rgba(217,79,0,0.15)]"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-ice px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-void transition-all duration-200 hover:scale-[1.02] hover:bg-[#5EE5D6] disabled:opacity-60"
                  >
                    {submitting ? 'LOADING...' : <>SEND MY BATTLE PLAN <ArrowRight size={16} /></>}
                  </button>
                </form>

                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ash">
                  <Lock size={12} /> 131,000+ subscribers. We don&apos;t share emails.
                </p>

                <button
                  onClick={() => setSkipped(true)}
                  className="mx-auto mt-4 block text-center text-xs uppercase tracking-wider text-ash transition-colors hover:text-bone"
                >
                  Skip and browse the archive &rarr;
                </button>
              </motion.div>
            )}

            {emailSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 rounded-sm border border-moss/30 bg-charcoal p-8 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss/20">
                  <Check size={32} className="text-moss" />
                </div>
                <h3 className="mt-4 text-2xl font-bold uppercase text-moss">WEAPON LOADED. CHECK YOUR INBOX.</h3>
                <p className="mt-2 text-base text-smoke">Your battle plan and 4 free weapons are on the way.</p>
                <Link
                  href="/store"
                  className="mt-6 inline-flex items-center gap-2 rounded-sm bg-flame px-6 py-3 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00]"
                >
                  BROWSE THE FULL ARSENAL <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}

            {skipped && !emailSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 rounded-sm bg-charcoal p-8 text-center"
              >
                <h3 className="text-2xl font-bold uppercase text-bone">FAIR ENOUGH. BROWSE THE ARSENAL.</h3>
                <p className="mx-auto mt-3 max-w-[480px] text-base text-smoke">
                  No email needed. Find your weapon at your own pace.
                </p>
                <Link
                  href="/store"
                  className="mt-6 inline-flex items-center gap-2 rounded-sm bg-moss px-6 py-3 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#458B50]"
                >
                  BROWSE THE STORE <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </section>
      </main>
    );
  }

  const currentQuestion = questions[currentQ];

  return (
    <main className="bg-void min-h-screen text-bone">
      <div className="fixed left-0 right-0 top-0 z-40 h-1 bg-steel">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full bg-flame"
        />
      </div>

      <section ref={quizRef} className="mx-auto max-w-[720px] px-4 pb-24 pt-28">
        <div className="mb-8 flex items-center justify-center gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentQ ? 'w-6 bg-flame' : i < currentQ ? 'w-2 bg-flame/60' : 'w-2 bg-steel'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            className="rounded-sm border border-steel bg-charcoal p-6 md:p-8"
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood text-center">
              QUESTION {currentQ + 1} OF {questions.length}
            </p>
            <h2 className="mt-3 text-center text-2xl font-bold uppercase text-bone leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="mt-8 space-y-3">
              {currentQuestion.answers.map((answer, i) => {
                const isSelected = answers[currentQuestion.id] === answer.value;
                return (
                  <motion.button
                    key={answer.value}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(answer.value)}
                    className={`flex w-full items-center gap-4 rounded-sm border px-5 py-4 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-flame bg-[rgba(217,79,0,0.1)]'
                        : 'border-steel bg-ink hover:border-flame hover:bg-[rgba(217,79,0,0.05)]'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-colors duration-200 ${
                        isSelected ? 'border-flame bg-flame text-parchment' : 'border-steel text-ash'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-base md:text-lg transition-colors duration-200 ${isSelected ? 'text-parchment' : 'text-bone'}`}>
                      {answer.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}
