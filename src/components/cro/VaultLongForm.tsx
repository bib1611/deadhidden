'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  X,
  ChevronDown,
  BookOpen,
  Shield,
  Home as HomeIcon,
  Crown,
  Star,
  Lock,
  Zap,
  Loader2,
} from 'lucide-react';
import ComparisonTable from '@/components/cro/ComparisonTable';
import TrustBadgeBar from '@/components/cro/TrustBadgeBar';
import GuaranteeBlock from '@/components/cro/GuaranteeBlock';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const VAULT_COVER = 'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/product-cover-the-vault.jpg';

const valueStack = [
  { item: 'Bible Study Guides', count: 28, price: 308 },
  { item: 'Marriage Manuals', count: 8, price: 127 },
  { item: 'Spiritual Warfare', count: 12, price: 245 },
  { item: 'Parenting Tools', count: 6, price: 87 },
  { item: 'KJV Study Systems', count: 14, price: 147 },
  { item: 'Bonus Archives', count: 8, price: 97 },
];

const vaultTotal = valueStack.reduce((s, v) => s + v.price, 0);

const whatsInside = [
  {
    category: 'Bible Study Guides',
    count: 28,
    icon: BookOpen,
    docs: [
      "Christian Soldier's Battle Notes", 'The Map of the Dead',
      'How To Study The Bible Like Your Life Depends On It', 'The Darkest Proverbs',
      '2026 Bible Reading Protocol', 'Romans: The Nuclear Truth', 'The Forgotten Disciples',
      'Esther: The Queen Who Chose Violence', 'Faith vs. Works', 'Wars and Rumors of Wars',
      'Dispensational Framework Guide', 'Prophecy Decoder', 'Genesis: The Foundation War',
      'Revelation: No Longer Sealed', 'Psalms for the Warrior', 'The Levitical Blueprint',
    ],
  },
  {
    category: 'Marriage Manuals',
    count: 8,
    icon: HomeIcon,
    docs: [
      "The King's Marriage Manual", 'The Household Order Bundle', 'The Submission Fraud',
      'How To Lead Your Wife', 'Covenant Not Contract', 'Intimacy By Design',
      'Conflict Resolution For Warriors', 'The Biblical Family Fortress',
    ],
  },
  {
    category: 'Spiritual Warfare',
    count: 12,
    icon: Shield,
    docs: [
      'Familiar Spirits: A Field Manual', 'Blood and Bandwidth', 'Exposing The Enemy',
      'Overcoming Mental Torment', 'Break Free From Modern Demons In 7 Days',
      'The Fourth Answer', 'Hellbound and Down', 'Generational Curses Decoded',
      'The Armor Of God Protocol', 'Prayer War Room Tactics', 'Discerning Spirits Guide',
      'Deliverance Field Manual',
    ],
  },
  {
    category: 'Parenting Tools',
    count: 6,
    icon: Crown,
    docs: [
      'Raising Arrows', 'The Discipline Doctrine', 'Homeschool Battle Plan',
      'Training Up A Warrior', 'Shielding Your Children', 'Family Altar Blueprint',
    ],
  },
  {
    category: 'KJV Study Systems',
    count: 14,
    icon: BookOpen,
    docs: [
      'KJV-Only Defense Guide', '1611 Authorized Version History', 'Textual Criticism For Believers',
      'The Received Text Roadmap', 'Manuscript Evidence Summary', 'Bible Preservation Doctrine',
      'KJV Word Changes Explained', 'Hebrew And Greek Study Guide', 'Cross-Reference System',
      'Topical Bible Index', 'Chain Reference Method', 'Dispensational Chart Set',
      'Timeline Of Scripture', 'KJV Reading Planner',
    ],
  },
  {
    category: 'Bonus Archives',
    count: 8,
    icon: Star,
    docs: [
      'Church History They Do Not Teach', 'The Prayer War Room', 'Sermon Notes Collection',
      'Bible Study Workbook Templates', 'Marriage Covenant Certificates', 'Warfare Prayer Cards',
      'Scripture Memory System', 'Annual Bible Reading Tracker',
    ],
  },
];

const testimonials = [
  { quote: "I got the Vault three months ago. I've gone through 12 resources already. My marriage is different. My Bible study is different. My prayer life is different.", name: 'Marcus T.', location: 'Texas' },
  { quote: "I was skeptical about $297. Then I calculated what I'd spent on garbage Bible studies over the years. This is the only purchase I don't regret.", name: 'David R.', location: 'Florida' },
  { quote: "My husband finally has resources that don't pull punches. He's actually leading our home now. The Vault was the catalyst.", name: 'Sarah M.', location: 'Tennessee' },
];

const faqs = [
  { q: 'Is this a subscription?', a: 'No. One-time payment. You keep all 83+ resources forever, plus every future addition free.' },
  { q: "What if it's not what I expected?", a: '30-day no-questions guarantee. Email and you get a full refund.' },
  { q: 'Do I have to read all 83 at once?', a: 'No. Most readers work through the resources that match their current battle. The Vault is a library, not a curriculum.' },
  { q: 'What format?', a: 'PDF. Instant download. Read on any device. Print if you want.' },
  { q: 'Is it KJV only?', a: 'Yes. Every resource is built squarely on the King James Bible. No NIV. No ESV. No compromise.' },
];

export default function VaultLongForm() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [vaultLoading, setVaultLoading] = useState(false);

  const handleVault = async () => {
    setVaultLoading(true);
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug: 'the-vault' }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Checkout failed');
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Checkout failed');
    } finally {
      setVaultLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-steel">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at top, rgba(139,0,0,0.25) 0%, transparent 60%), linear-gradient(to bottom, #0a0a0a, #050505)' }}
        />
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-12 px-4 pt-16 pb-12 md:grid-cols-2 md:px-8 md:pt-24 lg:gap-16">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm text-ash">4.9/5 from 247 buyers</span>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-blood">
              THE VAULT / KJV ONLY / NO COMPROMISE
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-3 font-bold uppercase leading-[0.95] text-bone" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              83 RECOVERED DOCUMENTS. <span className="text-flame">ONE FIELD PACKAGE.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-smoke leading-relaxed">
              Every Bible study, marriage manual, spiritual warfare guide, and parenting field manual — built squarely on the King James Bible. Instant download. One price. Forever access.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl text-ash line-through decoration-crimson">$365</span>
              <span className="font-mono text-5xl font-bold text-parchment">$297</span>
              <span className="rounded-sm bg-ember px-2 py-1 text-xs font-bold uppercase text-void">SAVE $68</span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleVault}
                disabled={vaultLoading}
                className="inline-flex items-center gap-2 rounded-sm bg-flame px-8 py-4 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00] hover:shadow-[0_8px_24px_rgba(217,79,0,0.4)] disabled:opacity-70"
              >
                {vaultLoading ? (
                  <><Loader2 size={16} className="animate-spin" /> PROCESSING...</>
                ) : (
                  <>ARM YOUR HOUSEHOLD <ArrowRight size={16} /></>
                )}
              </button>
              <Link href="/store/vault-sampler" className="text-sm text-ash hover:text-flame underline-offset-4 hover:underline">
                Or taste it first: Get the $7 Sampler &rarr;
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-wider text-ash">
              <span className="flex items-center gap-1"><Lock size={12} /> 30-day guarantee</span>
              <span className="flex items-center gap-1"><Zap size={12} /> Instant download</span>
              <span className="flex items-center gap-1"><BookOpen size={12} /> KJV only</span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:sticky md:top-24 md:self-start">
            <div className="animate-float" style={{ transform: 'rotate(-2deg)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={VAULT_COVER} alt="The Vault Package" className="w-full rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.6)]" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <div className="text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">THE VALUE STACK</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone">PRICED INDIVIDUALLY: ${vaultTotal.toLocaleString()}</h2>
            <p className="mt-4 text-lg text-smoke">Today, the entire arsenal: <span className="font-mono font-bold text-flame">$297</span></p>
          </div>
          <div className="mt-12 overflow-hidden rounded-sm border border-steel">
            <table className="w-full">
              <tbody>
                {valueStack.map((row) => (
                  <tr key={row.item} className="border-b border-steel/50 last:border-b-0">
                    <td className="p-4 text-base text-bone md:p-6">{row.item}</td>
                    <td className="p-4 text-right text-sm text-ash md:p-6">{row.count} resources</td>
                    <td className="p-4 text-right font-mono text-base text-parchment md:p-6">${row.price}</td>
                  </tr>
                ))}
                <tr className="bg-[#1a0a0a]">
                  <td className="p-4 text-base font-bold uppercase text-bone md:p-6">Total Value</td>
                  <td className="p-4 md:p-6" />
                  <td className="p-4 text-right font-mono text-2xl font-bold text-flame md:p-6">${vaultTotal.toLocaleString()}</td>
                </tr>
                <tr className="bg-flame/10 border-t-2 border-t-flame">
                  <td className="p-4 text-base font-bold uppercase text-flame md:p-6">Your Price Today</td>
                  <td className="p-4 md:p-6" />
                  <td className="p-4 text-right font-mono text-3xl font-bold text-flame md:p-6">$297</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's Inside Accordion */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-[900px] px-4 md:px-8">
          <div className="text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">WHAT&apos;S INSIDE</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone">EVERY DOCUMENT IN THE VAULT</h2>
            <p className="mt-4 text-lg text-smoke">76+ resources across 6 categories. Click to expand each.</p>
          </div>
          <div className="mt-12 space-y-3">
            {whatsInside.map((cat, i) => {
              const Icon = cat.icon;
              const open = openCategory === i;
              return (
                <div key={cat.category} className="overflow-hidden rounded-sm border border-steel bg-charcoal">
                  <button
                    onClick={() => setOpenCategory(open ? null : i)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-steel/30 md:p-6"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="h-7 w-7 text-flame" strokeWidth={1.5} />
                      <div>
                        <h3 className="text-lg font-bold uppercase text-bone">{cat.category}</h3>
                        <p className="text-sm text-ash">{cat.count} resources</p>
                      </div>
                    </div>
                    <ChevronDown size={20} className={`text-ash transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <div className="border-t border-steel bg-ink p-5 md:p-6">
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {cat.docs.map((doc) => (
                          <li key={doc} className="flex items-start gap-2 text-sm text-bone">
                            <Check size={14} className="mt-0.5 shrink-0 text-moss" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who this is for / not for */}
      <section className="bg-void py-24">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-sm border border-moss/30 bg-charcoal p-8">
              <h3 className="text-2xl font-bold uppercase text-moss">FOR YOU IF:</h3>
              <ul className="mt-6 space-y-3">
                {[
                  'You believe the King James Bible is the preserved Word of God',
                  'You are done with watered-down studies and seminary-safe takes',
                  'You want to lead your household, not just attend church',
                  "You're ready to do the work of studying Scripture deeply",
                  'You want every future resource included free',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base text-bone">
                    <Check size={18} className="mt-0.5 shrink-0 text-moss" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm border border-error/30 bg-charcoal p-8">
              <h3 className="text-2xl font-bold uppercase text-error">NOT FOR YOU IF:</h3>
              <ul className="mt-6 space-y-3">
                {[
                  "You're looking for therapeutic Christianity",
                  'You want a modern translation softening every hard verse',
                  "You're not willing to actually open and study the Bible",
                  "You're looking for entertainment, not formation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base text-smoke">
                    <X size={18} className="mt-0.5 shrink-0 text-error" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-[1000px] px-4 md:px-8">
          <div className="text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">VS. EVERYTHING ELSE</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone">THE VAULT VS. TYPICAL BIBLE STUDY</h2>
          </div>
          <div className="mt-12">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-void py-24">
        <div className="mx-auto max-w-[1100px] px-4 md:px-8">
          <div className="text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">FROM ARMED BELIEVERS</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone">REAL WORDS FROM VAULT OWNERS</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-sm border-l-[3px] border-l-crimson bg-charcoal p-6">
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
                </div>
                <p className="text-base italic text-bone leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold uppercase text-parchment">{t.name}</p>
                <p className="text-xs text-ash">{t.location}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <TrustBadgeBar />
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="bg-ink py-24">
        <GuaranteeBlock />
      </section>

      {/* FAQ */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-[800px] px-4 md:px-8">
          <div className="text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-blood">QUESTIONS</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold uppercase text-bone">FREQUENTLY ASKED</h2>
          </div>
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="overflow-hidden rounded-sm border border-steel bg-ink">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-steel/30 md:p-6"
                  >
                    <span className="text-base font-semibold text-bone">{faq.q}</span>
                    <ChevronDown size={20} className={`text-ash transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <div className="border-t border-steel bg-charcoal p-5 md:p-6">
                      <p className="text-base text-smoke leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-crimson py-24">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.4), rgba(139,0,0,0.2))' }} />
        <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center md:px-8">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-parchment leading-tight">LOCK IN YOUR ARSENAL.</h2>
          <p className="mt-6 text-lg text-bone">83+ resources. One price. Lifetime access. Every future addition free.</p>
          <div className="mt-10 flex flex-col items-center gap-4">
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
            <Link
              href="/store/vault-sampler"
              className="inline-flex items-center gap-2 rounded-sm border border-bone/40 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-all duration-200 hover:bg-[rgba(232,228,220,0.08)] hover:border-flame"
            >
              OR TASTE IT FIRST FOR $7
            </Link>
          </div>
          <p className="mt-8 text-xs uppercase tracking-wider text-bone/70">✓ Instant Download · ✓ KJV Only · ✓ 30-Day Guarantee</p>
        </div>
      </section>
    </div>
  );
}
