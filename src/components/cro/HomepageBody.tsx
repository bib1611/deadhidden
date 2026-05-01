'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Download,
  Users,
  ArrowRight,
  Lock,
  Check,
  Sword,
  Home as HomeIcon,
  ShieldCheck,
  BookOpen,
  Crown,
  Loader2,
} from 'lucide-react';
import TestimonialCarousel from '@/components/cro/TestimonialCarousel';
import TrustBadgeBar from '@/components/cro/TrustBadgeBar';
import ComparisonTable from '@/components/cro/ComparisonTable';
import CountdownTimer from '@/components/cro/CountdownTimer';
import GuaranteeBlock from '@/components/cro/GuaranteeBlock';
import SocialProofToast from '@/components/cro/SocialProofToast';
import StickyBottomBar from '@/components/cro/StickyBottomBar';
import { HomepageEmailForm } from '@/components/HomepageEmailForm';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] } },
};

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono text-2xl font-bold text-parchment md:text-[2.5rem]">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

async function startCheckout(productSlug: string): Promise<string | null> {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productSlug }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Checkout failed');
  }
  const data = await response.json();
  return data.url || null;
}

const VAULT_COVER = 'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/product-cover-the-vault.jpg';

export default function HomepageBody() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [samplerLoading, setSamplerLoading] = useState(false);
  const [vaultLoading, setVaultLoading] = useState(false);

  const handleSampler = async () => {
    setSamplerLoading(true);
    try {
      const url = await startCheckout('vault-sampler');
      if (url) window.location.href = url;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Checkout failed';
      alert(msg);
    } finally {
      setSamplerLoading(false);
    }
  };

  const handleVault = async () => {
    setVaultLoading(true);
    try {
      const url = await startCheckout('the-vault');
      if (url) window.location.href = url;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Checkout failed';
      alert(msg);
    } finally {
      setVaultLoading(false);
    }
  };

  return (
    <div className="bg-ink text-bone">
      {/* Announcement Bar */}
      {announcementVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative flex h-10 items-center justify-center bg-crimson"
        >
          <span className="text-xs uppercase tracking-wider text-parchment">
            ⚡ 131,000+ READERS ARMED. GET YOUR FREE FIELD GUIDE →
          </span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 text-parchment/70 hover:text-parchment"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Hero */}
      <section className="relative min-h-[100dvh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at top, rgba(139,0,0,0.25) 0%, transparent 60%), linear-gradient(to bottom, #0a0a0a 0%, #050505 100%)',
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col items-center justify-center gap-12 px-4 py-24 md:flex-row md:px-[8%]">
          <div className="flex-1 md:max-w-[55%]">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs font-mono uppercase tracking-[0.2em] text-blood"
            >
              KJV BIBLE STUDY RESOURCES / NO COMPROMISE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 font-bold uppercase leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              <span className="block text-ash/60">THEY BURIED IT.</span>
              <span className="block text-bone">WE DUG IT UP.</span>
              <span className="relative block text-parchment">
                YOU GET THE TRUTH.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="absolute bottom-1 left-0 h-[3px] w-full origin-left bg-crimson"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 max-w-[560px] text-lg text-smoke leading-relaxed"
            >
              83 KJV-grounded Bible studies, marriage manuals, and spiritual warfare guides built by a man who drove garbage trucks — not seminary professors. Instant download. No subscription. No watered-down versions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={handleSampler}
                disabled={samplerLoading}
                className="inline-flex items-center gap-2 rounded-sm bg-flame px-8 py-4 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00] hover:shadow-[0_8px_24px_rgba(217,79,0,0.4)] disabled:opacity-70"
              >
                {samplerLoading ? (
                  <><Loader2 size={16} className="animate-spin" /> PROCESSING...</>
                ) : (
                  <>GET THE $7 SAMPLER <ArrowRight size={16} /></>
                )}
              </button>
              <Link
                href="/store/the-vault"
                className="inline-flex items-center gap-2 rounded-sm border border-bone px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-all duration-200 hover:bg-[rgba(232,228,220,0.08)] hover:border-flame"
              >
                SEE THE FULL VAULT
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mt-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-ash"
            >
              <span className="flex items-center gap-1"><Download size={14} /> Instant PDF download</span>
              <span className="flex items-center gap-1"><BookOpen size={14} /> KJV Only</span>
              <span className="flex items-center gap-1"><Users size={14} /> 131K+ readers armed</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="w-full md:max-w-[40%] md:pl-12"
          >
            <div className="rounded-sm border-l-4 border-crimson bg-charcoal p-6 shadow-[0_0_60px_rgba(139,0,0,0.15)] md:p-8">
              <h3 className="text-2xl font-bold uppercase text-parchment">GET 4 FREE WEAPONS FIRST</h3>
              <p className="mt-2 text-base text-smoke">
                The Submission Fraud + 3 more field guides. Zero cost. Zero spam.
              </p>
              <div className="mt-4">
                <HomepageEmailForm />
              </div>
              <p className="mt-3 flex items-center gap-1 text-xs text-ash">
                <Lock size={12} /> 131,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-y border-steel bg-ink">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-around gap-4 px-4 py-6 md:gap-0 md:px-8">
          {[
            { num: 131000, suffix: '+', label: 'READERS ON X & SUBSTACK' },
            { num: 83, suffix: '+', label: 'BIBLICAL RESOURCES' },
            { num: 24, suffix: '', label: 'YEARS MARRIED, LIVING IT' },
            { num: 17, suffix: '', label: 'YEARS SUNDAY SCHOOL' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center px-4 md:px-8">
              <div className="flex flex-col items-center">
                <AnimatedCounter target={stat.num} suffix={stat.suffix} />
                <span className="mt-1 text-xs uppercase tracking-wider text-ash text-center">{stat.label}</span>
              </div>
              {i < 3 && <span className="ml-4 hidden h-10 w-px bg-steel md:ml-8 md:inline-block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Problem Section */}
      <SectionWrapper className="mx-auto max-w-[900px] px-4 py-24 md:px-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">THE PROBLEM YOU ALREADY FEEL</p>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone leading-tight">
          You sit in church every Sunday. But something feels off.
        </h2>
        <p className="mt-6 max-w-[680px] text-lg text-smoke leading-relaxed">
          The sermons are safe. The studies are surface-level. The hard passages get skipped. You&apos;ve been a believer for years — but deep down, you know there&apos;s a layer of Scripture nobody&apos;s showing you. The layer that makes modern Christianity uncomfortable.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {[
            { num: '01', title: 'The Hard Verses Get Skipped', body: "Your pastor quotes the comfortable ones. The verses about judgment, spiritual warfare, and biblical headship stay in the footnotes." },
            { num: '02', title: 'The Studies Are Seminary-Safe', body: "Written for classrooms, not battlefields. Theoretical. Polished. Useless when your marriage is on fire or your kid is walking away." },
            { num: '03', title: 'The Resources Water It Down', body: "Every 'Bible study' you bought softened the edges to keep reviewers happy. The truth doesn't need softening. It needs deploying." },
          ].map((card) => (
            <motion.div
              key={card.num}
              variants={fadeUp}
              className="rounded-sm border-l-[3px] border-l-crimson bg-charcoal p-6"
            >
              <span className="font-mono text-3xl font-bold text-crimson">{card.num}</span>
              <h3 className="mt-3 text-lg font-bold uppercase text-bone">{card.title}</h3>
              <p className="mt-2 text-sm text-smoke leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Solution / The Vault */}
      <section className="relative overflow-hidden bg-ink py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-12 px-4 md:flex-row md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex-1 md:max-w-[60%]"
          >
            <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.2em] text-blood">
              THE SOLUTION
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone leading-tight">
              THE VAULT: 83 RECOVERED DOCUMENTS. ONE FIELD PACKAGE.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-smoke leading-relaxed">
              Every resource in The Vault was built the same way: open the King James Bible, study it line by line, and write down what modern Christianity stopped saying out loud. Bible study guides. Marriage field manuals. Spiritual warfare intelligence. Parenting doctrine. All instant download. All KJV-only. All built in the fire — not a seminary classroom.
            </motion.p>

            <motion.ul variants={staggerContainer} className="mt-8 space-y-3">
              {[
                '83+ PDF resources — Bible study, marriage, spiritual warfare, parenting, masculinity, womanhood',
                'KJV-only. No modern translation compromises.',
                'Instant download. Buy once. Keep forever. No subscription.',
                'Built by a man with 24 years of marriage and 17 years of Sunday School — not a seminary degree.',
                'New resources added regularly. You get every future addition.',
              ].map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-start gap-2 text-base text-bone">
                  <Check size={18} className="mt-0.5 shrink-0 text-moss" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8 flex items-baseline gap-3">
              <span className="text-2xl text-ash line-through decoration-crimson">$365</span>
              <span className="font-mono text-3xl font-bold text-parchment">$297</span>
              <span className="rounded-sm bg-ember px-2 py-1 text-xs font-bold uppercase text-void">SAVE $68</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleVault}
                disabled={vaultLoading}
                className="inline-flex items-center gap-2 rounded-sm bg-flame px-8 py-4 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00] hover:shadow-[0_8px_24px_rgba(217,79,0,0.4)] disabled:opacity-70"
              >
                {vaultLoading ? (
                  <><Loader2 size={16} className="animate-spin" /> PROCESSING...</>
                ) : (
                  <>GET FULL VAULT ACCESS <ArrowRight size={16} /></>
                )}
              </button>
              <button
                onClick={handleSampler}
                disabled={samplerLoading}
                className="text-sm text-ash underline-offset-4 transition-colors hover:text-flame hover:underline disabled:opacity-50"
              >
                {samplerLoading ? 'Processing...' : <>Or taste it first: Get the $7 Sampler &rarr;</>}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex-1 md:max-w-[40%]"
          >
            <div className="animate-float" style={{ transform: 'rotate(-3deg)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={VAULT_COVER}
                alt="The Vault Package"
                className="w-full rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <SectionWrapper className="mx-auto max-w-[1000px] px-4 py-24 md:px-8">
        <ComparisonTable />
      </SectionWrapper>

      {/* Testimonials */}
      <section className="bg-void py-24">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8">
          <div className="text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">FROM THE FRONT LINES</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone">REAL WORDS FROM ARMED BELIEVERS</h2>
          </div>
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
          <div className="mt-16">
            <TrustBadgeBar />
          </div>
        </div>
      </section>

      {/* Sampler / Tripwire */}
      <section className="border-y border-crimson/30 bg-ink py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col-reverse items-center gap-12 px-4 md:flex-row md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex-1 md:max-w-[60%]"
          >
            <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.2em] text-blood">
              NOT SURE WHERE TO START?
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone leading-tight">
              TASTE THE ARSENAL FOR $7.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-smoke leading-relaxed">
              Seven dollars. Four handpicked resources from The Vault — KJV Bible study, marriage, spiritual warfare, and disciplined Scripture immersion. If this doesn&apos;t light a fire under you, nothing will.
            </motion.p>

            <motion.div variants={staggerContainer} className="mt-8 grid gap-6 md:grid-cols-2">
              {[
                { num: '01', title: "THE WARRIOR'S BIBLE CONQUEST", desc: 'A 30/60/90-day Scripture immersion challenge for believers done treating the Bible like background noise.' },
                { num: '02', title: "THE KING'S MARRIAGE MANUAL", desc: 'The uncut marriage manual. Biblical headship, intimacy, conflict, and covenant without the pastor-safe padding.' },
                { num: '03', title: 'BREAK FREE FROM MODERN DEMONS IN 7 DAYS', desc: 'Seven days. Seven chains. Seven keys. A direct fight against the cycles keeping you weak.' },
                { num: '04', title: 'THE WIND-WATCHER CHECKLIST', desc: 'A practical checklist for the man paralyzed by analysis. Based on Ecclesiastes 11:4. Stop overthinking. Start doing.' },
              ].map((item) => (
                <motion.div key={item.num} variants={fadeUp}>
                  <span className="font-mono text-xl font-bold text-crimson">{item.num}</span>
                  <h4 className="mt-1 text-base font-bold uppercase text-bone">{item.title}</h4>
                  <p className="mt-1 text-sm text-smoke leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <p className="text-sm text-ash">This week&apos;s allocation closes in:</p>
              <div className="mt-3">
                <CountdownTimer />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleSampler}
                disabled={samplerLoading}
                className="inline-flex items-center gap-2 rounded-sm bg-flame px-8 py-4 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00] hover:shadow-[0_8px_24px_rgba(217,79,0,0.4)] disabled:opacity-70"
              >
                {samplerLoading ? (
                  <><Loader2 size={16} className="animate-spin" /> PROCESSING...</>
                ) : (
                  <>GET THE $7 SAMPLER <ArrowRight size={16} /></>
                )}
              </button>
              <button
                onClick={handleVault}
                disabled={vaultLoading}
                className="text-sm text-ash underline-offset-4 transition-colors hover:text-flame hover:underline disabled:opacity-50"
              >
                {vaultLoading ? 'Processing...' : <>Skip straight to The Vault &rarr;</>}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex-1 md:max-w-[40%]"
          >
            <div className="relative animate-float animate-pulse-glow rounded-sm bg-charcoal p-8">
              <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-sm bg-ember px-3 py-1 text-xs font-bold uppercase text-void animate-badge-pulse">
                LIMITED: 100 THIS WEEK
              </span>
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <BookOpen size={64} className="text-flame" strokeWidth={1.5} />
                <p className="mt-4 text-2xl font-bold uppercase text-bone">VAULT SAMPLER</p>
                <p className="mt-2 font-mono text-3xl font-bold text-flame">$7</p>
                <p className="mt-2 text-xs uppercase tracking-wider text-ash">4 FIELD GUIDES</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Capture Block */}
      <section
        className="py-24"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139,0,0,0.08) 0%, transparent 70%), #141414',
        }}
      >
        <div className="mx-auto max-w-[1280px] px-4 text-center md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold uppercase text-bone leading-tight">
              GET 4 FREE WEAPONS. ZERO COST. ZERO EXCUSES.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[640px] text-lg text-smoke leading-relaxed">
              These are not &apos;lead magnets.&apos; These are actual chapters and guides from The Vault — the same material paid readers get. We&apos;re giving them away because once you see the quality, you&apos;ll want the full arsenal.
            </motion.p>

            <motion.div variants={staggerContainer} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'THE SUBMISSION FRAUD', desc: "The most misunderstood word in the Bible, decoded. What submission actually means." },
                { title: '30 BIBLICAL REBELS YOUR PASTOR SKIPS', desc: '30 men and women who broke every rule and changed history — and your pastor never mentions.' },
                { title: '5 SCRIPTURES THAT FORGE MEN OF STEEL', desc: 'Five scriptures that will put iron in your spine and fire in your belly.' },
                { title: 'WIND-WATCHER CHECKLIST', desc: 'Stop overthinking. Start doing. Based on Ecclesiastes 11:4.' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={scaleIn}
                  className="flex flex-col rounded-sm border border-steel bg-ink p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-flame"
                >
                  <span className="w-fit rounded-sm bg-moss px-2 py-1 text-xs font-bold uppercase text-parchment">FREE</span>
                  <h4 className="mt-3 text-base font-bold uppercase text-bone">{item.title}</h4>
                  <p className="mt-2 line-clamp-2 text-sm text-smoke">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mx-auto mt-12 max-w-[600px]">
              <p className="text-xs uppercase tracking-wider text-ash">ENTER YOUR EMAIL AND WE&apos;LL LOAD YOUR WEAPONS:</p>
              <div className="mt-3">
                <HomepageEmailForm />
              </div>
              <p className="mt-3 flex items-center justify-center gap-1 text-xs text-ash">
                <Lock size={12} /> No spam. Unsubscribe anytime. 131,000+ believers already armed.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Explorer */}
      <SectionWrapper className="mx-auto max-w-[1200px] px-4 py-24 md:px-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">CHOOSE YOUR BATTLEFIELD</p>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone leading-tight">FIND YOUR FIGHT IN 60 SECONDS</h2>
        <p className="mt-4 text-lg text-smoke leading-relaxed">
          Not sure where to start? Pick the war you&apos;re in. We&apos;ll hand you the weapon.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {[
            { icon: Sword, title: 'Biblical Masculinity', desc: 'For the man who has checked every box and still feels hollow.', count: 12, slug: 'masculinity' },
            { icon: HomeIcon, title: 'Marriage', desc: 'Rebuild your marriage on biblical covenant, not therapy language.', count: 9, slug: 'marriage-family' },
            { icon: ShieldCheck, title: 'Spiritual Warfare', desc: 'Know your enemy or become his casualty.', count: 15, slug: 'spiritual-warfare' },
            { icon: BookOpen, title: 'Bible Study', desc: 'Study the Bible like your life depends on it — because it does.', count: 22, slug: 'bible-study' },
            { icon: Crown, title: 'Parenting', desc: 'Raise arrows, not casualties. Biblical parenting doctrine.', count: 8, slug: 'parenting' },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.title} variants={fadeUp}>
                <Link
                  href={`/store/category/${cat.slug}`}
                  className="group flex h-full cursor-pointer flex-col rounded-sm border border-steel bg-charcoal p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:border-crimson"
                >
                  <Icon className="h-10 w-10 text-bone transition-transform duration-200 group-hover:scale-110" strokeWidth={1.5} />
                  <h4 className="mt-4 text-base font-bold uppercase text-bone">{cat.title}</h4>
                  <p className="mt-2 text-sm text-smoke leading-relaxed">{cat.desc}</p>
                  <span className="mt-3 text-xs uppercase tracking-wider text-ash">{cat.count} resources</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-flame transition-transform duration-200 group-hover:translate-x-1">
                    Explore &rarr;
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/store"
            className="inline-flex items-center gap-1 text-sm text-ash underline-offset-4 transition-colors hover:text-flame hover:underline"
          >
            VIEW ALL CATEGORIES &rarr;
          </Link>
        </div>
      </SectionWrapper>

      {/* Founder Story */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-[0.2em] text-blood">
              THE MAN BEHIND IT
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone leading-tight">
              HE DID NOT COME FROM SEMINARY.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[640px] text-lg text-smoke leading-relaxed">
              Adam drove garbage trucks. Conducted trains. Raised five children. Then started digging through the King James Bible and pulling out what modern Christianity buried under comfort and compromise.
            </motion.p>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-[640px] text-lg text-smoke leading-relaxed">
              Christie homeschools their children. They&apos;ve been married 24 years. Taught Sunday School 17 straight years. Every resource comes from lived obedience — not a classroom.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm text-ash underline-offset-4 transition-colors hover:text-flame hover:underline"
              >
                READ THE FULL STORY &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-crimson py-24">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(139,0,0,0.2) 100%)' }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-[800px] px-4 text-center md:px-8"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold uppercase text-parchment leading-tight">
            STOP PLAYING CHURCH. START STUDYING SCRIPTURE.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-bone">
            The Vault is waiting. 83 resources. One price. Zero compromise.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={handleVault}
              disabled={vaultLoading}
              className="inline-flex items-center gap-2 rounded-sm bg-flame px-10 py-5 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00] hover:shadow-[0_8px_24px_rgba(217,79,0,0.4)] disabled:opacity-70"
            >
              {vaultLoading ? (
                <><Loader2 size={16} className="animate-spin" /> PROCESSING...</>
              ) : (
                <>GET THE VAULT — $297 <ArrowRight size={16} /></>
              )}
            </button>
            <button
              onClick={handleSampler}
              disabled={samplerLoading}
              className="inline-flex items-center gap-2 rounded-sm border border-bone/40 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-all duration-200 hover:bg-[rgba(232,228,220,0.08)] hover:border-flame disabled:opacity-50"
            >
              {samplerLoading ? 'PROCESSING...' : 'OR START WITH THE $7 SAMPLER'}
            </button>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-8 text-xs uppercase tracking-wider text-bone/70">
            ✓ Instant Download · ✓ KJV Only · ✓ 131K+ Armed
          </motion.p>
        </motion.div>
      </section>

      {/* Guarantee Block */}
      <section className="bg-void py-24">
        <GuaranteeBlock />
      </section>

      {/* Site-wide overlays */}
      <SocialProofToast />
      <StickyBottomBar />
    </div>
  );
}
