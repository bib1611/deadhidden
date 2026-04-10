import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { CATEGORIES, getFeaturedProducts, getFreeProducts, getProductsByCategory, getProductBySlug } from '@/data/products';
import { OrganizationJsonLd } from '@/components/JsonLd';
import { MobileCTA } from '@/components/MobileCTA';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { HomepageEmailForm } from '@/components/HomepageEmailForm';
import { SubstackFeed } from '@/components/SubstackFeed';
import { LeadMagnetCapture } from '@/components/LeadMagnetCapture';

export const metadata: Metadata = {
  title: 'Dead Hidden Ministries — Biblical Truth They Tried to Bury',
  description:
    '50+ downloadable resources on Bible study, marriage, parenting, biblical masculinity, and spiritual warfare. Built in the fire — not a seminary classroom. KJV only.',
  keywords: [
    'bible study resources',
    'biblical masculinity',
    'christian marriage resources',
    'KJV bible study',
    'spiritual warfare guide',
    'biblical parenting',
    'biblical womanhood',
    'dead hidden ministries',
  ],
  openGraph: {
    title: 'Dead Hidden Ministries — Biblical Truth They Tried to Bury',
    description:
      '50+ resources on Scripture, marriage, parenting, and spiritual warfare. 70,000+ subscribers. KJV only.',
    type: 'website',
    url: 'https://deadhidden.org',
    images: [
      {
        url: 'https://deadhidden.org/api/og?title=Dead+Hidden+Ministries&subtitle=Biblical+Truth+They+Tried+to+Bury',
        width: 1200,
        height: 630,
        alt: 'Dead Hidden Ministries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dead Hidden Ministries — Biblical Truth They Tried to Bury',
    description:
      '50+ resources on Scripture, marriage, parenting, and spiritual warfare. KJV only.',
    creator: '@Biblicalman',
  },
  alternates: {
    canonical: 'https://deadhidden.org',
  },
};

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const freeProducts = getFreeProducts();

  return (
    <main className="bg-[#F7F5F0] text-[#1a1a1a]">
      <ScrollDepthTracker page="/" />
      <OrganizationJsonLd />

      {/* 1. HERO — Person + One Line + One CTA */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-28">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            {/* Left: text */}
            <div className="flex-1">
              <p
                className="text-xs tracking-[0.25em] text-[#8b0000] uppercase font-bold mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                DEAD HIDDEN
              </p>
              <h1
                className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[0.95] text-[#1a1a1a] uppercase tracking-[0.03em] font-bold mb-5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Biblical truth they tried to bury.
              </h1>
              <p className="text-base md:text-lg text-[#6b6560] max-w-lg mb-8 leading-relaxed">
                For the man who has performed long enough. For the woman who has done everything right and is still bleeding. The truth they buried is here.
              </p>
              <div>
                <Link
                  href="/where-to-begin"
                  className="inline-block btn-press bg-[#8b0000] text-white px-10 py-4 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-all text-sm md:text-base rounded-sm"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  WHERE TO BEGIN →
                </Link>
                <div className="mt-4">
                  <a
                    href="https://followme419.substack.com/c04ebb6b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8b0000] hover:text-[#a50000] transition-colors"
                  >
                    Or start with 30 days free →
                  </a>
                </div>
              </div>
            </div>

            {/* Right: photo + intro */}
            <div className="flex-shrink-0 text-center">
              <Image
                src="/images/adam-christie.jpg"
                alt="Adam and Christie Johnson"
                width={460}
                height={460}
                className="rounded-lg w-[280px] md:w-[400px] lg:w-[460px] h-auto"
                priority
              />
              <p className="mt-4 text-sm font-bold text-[#1a1a1a]">
                Adam &amp; Christie Johnson
              </p>
              <p className="mt-1 text-xs text-[#6b6560] max-w-[400px] mx-auto leading-relaxed">
                Married 24 years. Five kids. He picked up the Book at 12 and never put it down. Preaching since 15. Drove garbage trucks and conducted trains before going full-time. Christie saved at 11 — homeschool mother and helpmeet for two decades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF BAR */}
      <section className="py-6 border-t border-[#e8e3dc] border-b border-b-[#e8e3dc]">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-[#6b6560] tracking-wide">
            Trusted by 131,000+ across X and three Substack publications.
          </p>
        </div>
      </section>

      {/* 3. FROM THE FIELD — latest Substack posts (light mode overrides) */}
      <div className="homepage-light-feed [&_section]:border-t-0 [&_section]:border-[#e8e3dc] [&_h2]:text-[#1a1a1a] [&_p.text-\\[\\#888\\]]:text-[#6b6560] [&_a.block]:bg-white [&_a.block]:border-[#e8e3dc] [&_a.block]:border-l-2 [&_a.block]:border-l-[#8b0000] [&_a.block:hover]:border-[#d0cbc4] [&_h3]:text-[#1a1a1a] [&_p.text-\\[\\#777\\]]:text-[#6b6560] [&_p.text-\\[\\#555\\]]:text-[#9a9590]">
        <SubstackFeed />
      </div>

      {/* 4. NEW FROM DEAD HIDDEN — three new guides */}
      <section className="py-10 md:py-14 border-t border-[#e8e3dc]">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] uppercase tracking-[0.06em] font-bold mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            NEW FROM DEAD HIDDEN
          </h2>
          <p className="text-[#6b6560] text-base md:text-lg mb-10">
            Three new guides. Built verse by verse from the King James Bible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Map of the Dead */}
            <div className="bg-white border border-[#e8e3dc] p-8 flex flex-col items-center" style={{ borderTop: '2px solid #8b0000' }}>
              <p
                className="text-sm tracking-[0.2em] text-[#8b0000] uppercase font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                THE MAP OF THE DEAD — $17
              </p>
              <p className="text-sm text-[#6b6560] mb-4">
                54 pages. 21 diagrams. The complete geography of death, paradise, hell, and final judgment.
              </p>
              <Link
                href="/store/map-of-the-dead"
                className="inline-block bg-[#8b0000] text-white px-8 py-3 uppercase tracking-[0.12em] font-bold text-sm hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                GET THE MAP →
              </Link>
            </div>

            {/* Column 2: Battle Notes */}
            <div className="bg-white border border-[#e8e3dc] p-8 flex flex-col items-center" style={{ borderTop: '2px solid #8b0000' }}>
              <p
                className="text-sm tracking-[0.2em] text-[#8b0000] uppercase font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                CHRISTIAN SOLDIER&apos;S BATTLE NOTES — $17
              </p>
              <p className="text-sm text-[#6b6560] mb-4">
                362 pages. 28 chapters. Doctrinal ammunition for every battle a Bible believer faces.
              </p>
              <Link
                href="/store/christian-soldiers-battle-notes"
                className="inline-block bg-[#8b0000] text-white px-8 py-3 uppercase tracking-[0.12em] font-bold text-sm hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                GET THE BATTLE NOTES →
              </Link>
            </div>

            {/* Column 3: Counterfeit Kingdom Starter Guide */}
            <div className="bg-white border border-[#e8e3dc] p-8 flex flex-col items-center" style={{ borderTop: '2px solid #8b0000' }}>
              <p
                className="text-sm tracking-[0.2em] text-[#8b0000] uppercase font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                COUNTERFEIT KINGDOM STARTER GUIDE — $17
              </p>
              <p className="text-sm text-[#6b6560] mb-4">
                5 lessons on the dispensational framework most churches never taught you.
              </p>
              <Link
                href="/store/counterfeit-kingdom-starter-guide"
                className="inline-block bg-[#8b0000] text-white px-8 py-3 uppercase tracking-[0.12em] font-bold text-sm hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                START HERE →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE COMPLETE HOUSEHOLD — bundle feature */}
      {(() => {
        const bundle = getProductBySlug('household-order-bundle');
        if (!bundle) return null;
        return (
          <section className="py-12 md:py-20 border-t border-[#e8e3dc]">
            <div className="container max-w-3xl mx-auto px-4">
              <div className="text-center mb-10">
                <h2
                  className="text-3xl md:text-5xl text-[#1a1a1a] uppercase tracking-[0.06em] font-bold mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  THE COMPLETE HOUSEHOLD
                </h2>
                <p className="text-[#6b6560] text-base md:text-lg">
                  Both field manuals. His + hers. 26 chapters. 6 bonus documents.
                </p>
              </div>

              <Link
                href="/store/household-order-bundle"
                className="block border border-[#e8e3dc] bg-white p-8 hover:border-[#8b0000] transition-colors group relative text-center rounded-sm"
                style={{ borderTop: '3px solid #8b0000' }}
              >
                <div
                  className="absolute top-4 right-4 bg-[#8b0000] text-white text-xs px-3 py-1 uppercase font-bold tracking-[0.08em]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  SAVE $27
                </div>

                <h3
                  className="text-xl md:text-2xl text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-3 group-hover:text-[#8b0000] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {bundle.name}
                </h3>

                <p className="text-sm text-[#6b6560] mb-6 max-w-lg mx-auto">{bundle.tagline}</p>

                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-sm text-[#9a9590] line-through">$154</span>
                  <span className="text-3xl font-bold text-[#1a1a1a]">$127</span>
                </div>

                <span
                  className="inline-block bg-[#8b0000] text-white px-8 py-3 uppercase tracking-[0.12em] font-bold text-sm hover:bg-[#a50000] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  GET THE BUNDLE →
                </span>
              </Link>
            </div>
          </section>
        );
      })()}

      {/* 6. FEATURED PRODUCTS */}
      <section className="py-12 md:py-20 border-t border-[#e8e3dc]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              FEATURED
            </h2>
            <p className="text-[#6b6560] text-sm mt-2">The resources people keep coming back for.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              getProductBySlug('christian-soldiers-battle-notes'),
              getProductBySlug('map-of-the-dead'),
              getProductBySlug('biblical-man-field-manual'),
              getProductBySlug('biblical-woman-field-manual'),
            ].filter((p): p is NonNullable<typeof p> => Boolean(p))).map((product) => {
              const isVault = product.slug === 'the-vault';

              return (
                <Link
                  key={product.slug}
                  href={`/store/${product.slug}`}
                  className="border border-[#e8e3dc] bg-white p-6 flex flex-col h-full relative hover:border-[#d0cbc4] transition-colors group rounded-sm"
                  style={{
                    borderTop: '2px solid #8b0000',
                  }}
                >
                  {isVault && (
                    <div className="absolute top-4 right-4 bg-[#8b0000]/10 text-[#8b0000] text-xs px-2 py-1 uppercase font-bold tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>
                      FULL ACCESS
                    </div>
                  )}

                  {product.slug === 'how-to-study-bible' && (
                    <div className="absolute top-4 right-4 bg-[#1a3a1a] text-[#4ade80] text-xs px-2 py-1 uppercase font-bold tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>
                      MOST POPULAR
                    </div>
                  )}

                  <h3
                    className="text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-2 text-sm group-hover:text-[#8b0000] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#6b6560] mb-2">{product.tagline}</p>

                  {product.slug === 'how-to-study-bible' && (
                    <p className="text-xs text-[#4ade80] mb-2 font-bold">318 believers bought this</p>
                  )}

                  {isVault && (
                    <p className="text-xs text-[#6b6560] mb-2">
                      <span className="line-through text-[#9a9590]">$1,500+</span>{' '}
                      <span className="text-[#4ade80] font-bold">Save 76%</span>
                    </p>
                  )}

                  <p className="text-[#6b6560] text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#e8e3dc]">
                    <span className="text-[#8b0000] font-bold">{product.priceLabel.endsWith('+') ? product.priceLabel.slice(0, -1) : product.priceLabel}</span>
                    <span
                      className="text-xs uppercase tracking-[0.15em] text-[#8b0000] group-hover:text-[#1a1a1a] transition-colors font-bold"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      GET THIS →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SUBSTACK OFFERS — below the fold */}
      <section className="py-10 md:py-14 border-t border-[#e8e3dc]">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] uppercase tracking-[0.06em] font-bold mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            JOIN DEAD HIDDEN
          </h2>
          <p className="text-[#6b6560] text-base md:text-lg mb-10">
            Three ways in. Pick the door that fits.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Free 30-day trial */}
            <div className="bg-white border border-[#e8e3dc] p-8 flex flex-col items-center" style={{ borderTop: '2px solid #8b0000' }}>
              <p
                className="text-sm tracking-[0.2em] text-[#8b0000] uppercase font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                FREE FOR 30 DAYS
              </p>
              <p className="text-sm text-[#6b6560] mb-4">
                Full paid Dead Hidden access. No charge for 30 days.
              </p>
              <a
                href="https://followme419.substack.com/c04ebb6b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#8b0000] text-white px-8 py-3 uppercase tracking-[0.12em] font-bold text-sm hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                START FREE TRIAL →
              </a>
            </div>

            {/* Column 2: 25% off annual */}
            <div className="bg-white border border-[#e8e3dc] p-8 flex flex-col items-center" style={{ borderTop: '2px solid #8b0000' }}>
              <p
                className="text-sm tracking-[0.2em] text-[#8b0000] uppercase font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                25% OFF ANNUAL
              </p>
              <p className="text-sm text-[#6b6560] mb-4">
                Lock in a full year of Dead Hidden. $72 instead of $96.
              </p>
              <a
                href="https://followme419.substack.com/5332d28e"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#8b0000] text-white px-8 py-3 uppercase tracking-[0.12em] font-bold text-sm hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                GET 25% OFF →
              </a>
            </div>

            {/* Column 3: 7-day trial */}
            <div className="bg-white border border-[#e8e3dc] p-8 flex flex-col items-center" style={{ borderTop: '2px solid #8b0000' }}>
              <p
                className="text-sm tracking-[0.2em] text-[#8b0000] uppercase font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                7-DAY TRIAL
              </p>
              <p className="text-sm text-[#6b6560] mb-4">
                Same access. Shorter window.
              </p>
              <a
                href="https://followme419.substack.com/57776267"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#8b0000] text-white px-8 py-3 uppercase tracking-[0.12em] font-bold text-sm hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                START 7-DAY TRIAL →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 md:py-16 border-t border-[#e8e3dc]">
        <div className="container max-w-6xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            REAL CHRISTIANS. REAL MARRIAGES SAVED.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-[#e8e3dc] bg-white p-6 rounded-sm">
              <p className="text-[#1a1a1a] text-sm italic leading-relaxed mb-4">
                &ldquo;I was checking all the Christian boxes and felt completely dead inside. This Bible study system cracked something open in me that 20 years of church couldn&rsquo;t reach.&rdquo;
              </p>
              <p className="text-xs text-[#9a9590] uppercase tracking-[0.1em]">— Paid subscriber, 4 months</p>
            </div>
            <div className="border border-[#e8e3dc] bg-white p-6 rounded-sm">
              <p className="text-[#1a1a1a] text-sm italic leading-relaxed mb-4">
                &ldquo;The Marriage Manual saved my marriage. Not exaggerating. My wife and I read it together and it was the first time we&rsquo;d been on the same page in years.&rdquo;
              </p>
              <p className="text-xs text-[#9a9590] uppercase tracking-[0.1em]">— Husband &amp; wife, married 12 years</p>
            </div>
            <div className="border border-[#e8e3dc] bg-white p-6 rounded-sm">
              <p className="text-[#1a1a1a] text-sm italic leading-relaxed mb-4">
                &ldquo;The Submission Fraud guide was the first time I read something about biblical womanhood that didn&rsquo;t feel like a guilt trip or a cage. Finally, someone who gets it right.&rdquo;
              </p>
              <p className="text-xs text-[#9a9590] uppercase tracking-[0.1em]">— Woman, homeschool mother of 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE TO BEGIN — discovery system */}
      <section className="py-12 md:py-20 border-t border-[#e8e3dc] bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              FIND YOUR FIGHT IN 60 SECONDS
            </h2>
            <p className="text-[#6b6560] text-sm">Choose the battle you&apos;re in. We&apos;ll hand you the weapon.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'masculinity', label: 'BIBLICAL MASCULINITY', icon: '⚔' },
              { id: 'marriage', label: 'MARRIAGE', icon: '🔥' },
              { id: 'spiritual-warfare', label: 'SPIRITUAL WARFARE', icon: '🛡' },
              { id: 'bible-study', label: 'BIBLE STUDY', icon: '📖' },
              { id: 'parenting', label: 'PARENTING', icon: '🏠' },
              { id: 'for-women', label: 'FOR WOMEN', icon: '👑' },
            ].map((cat) => (
              <Link
                key={cat.id}
                href={`/where-to-begin/${cat.id}`}
                className="border border-[#e8e3dc] bg-[#F7F5F0] p-4 text-center hover:border-[#8b0000] transition-colors group rounded-sm"
              >
                <p className="text-2xl mb-2">{cat.icon}</p>
                <p
                  className="text-xs text-[#1a1a1a] uppercase tracking-[0.1em] font-bold group-hover:text-[#8b0000] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/where-to-begin"
              className="text-xs uppercase tracking-[0.15em] text-[#8b0000] hover:text-[#1a1a1a] transition-colors font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              VIEW ALL 10 CATEGORIES →
            </Link>
          </div>
        </div>
      </section>

      {/* FREE RESOURCES */}
      <section className="py-12 md:py-20 border-t border-[#e8e3dc]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              START FREE. NO EMAIL REQUIRED.
            </h2>
            <p className="text-[#6b6560] text-sm mt-2">Download these now. Zero commitment. Zero catch.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {freeProducts.slice(0, 4).map((product) => (
              <Link
                key={product.slug}
                href={`/store/${product.slug}`}
                className="border border-[#e8e3dc] bg-white p-6 flex flex-col h-full hover:border-[#d0cbc4] transition-colors group rounded-sm"
                style={{
                  borderTop: '2px solid #8b0000',
                }}
              >
                <div className="bg-[#1a3a1a] text-[#4ade80] text-xs px-2 py-0.5 inline-block mb-4 w-fit uppercase font-bold tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>
                  FREE
                </div>

                <h3
                  className="text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-2 text-sm group-hover:text-[#8b0000] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {product.name}
                </h3>

                <p className="text-[#6b6560] text-sm line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#e8e3dc]">
                  <span className="text-[#4ade80] font-bold text-xs uppercase tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>FREE</span>
                  <span
                    className="text-xs uppercase tracking-[0.15em] text-[#8b0000] group-hover:text-[#1a1a1a] transition-colors font-bold"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    DOWNLOAD →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/store?category=free-resources"
              className="text-xs uppercase tracking-[0.15em] text-[#8b0000] hover:text-[#1a1a1a] transition-colors font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              VIEW ALL FREE RESOURCES →
            </Link>
          </div>
        </div>
      </section>

      {/* CREDIBILITY */}
      <section id="splinter" className="py-12 md:py-20 border-t border-[#e8e3dc] bg-white">
        <div className="container max-w-3xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            BUILT IN THE FIRE. NOT A SEMINARY.
          </h2>
          <p className="text-[#6b6560] leading-relaxed mb-10">
            Adam drove garbage trucks and conducted trains before going full-time. Christie homeschools five children. Married 24 years, teaching Sunday School 17 straight. Every resource comes from lived obedience — not a classroom.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="border border-[#e8e3dc] bg-[#F7F5F0] p-4 rounded-sm">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>3</p>
              <p className="text-xs text-[#6b6560] uppercase tracking-[0.1em] mt-1">Publications</p>
            </div>
            <div className="border border-[#e8e3dc] bg-[#F7F5F0] p-4 rounded-sm">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>70K+</p>
              <p className="text-xs text-[#6b6560] uppercase tracking-[0.1em] mt-1">Subscribers</p>
            </div>
            <div className="border border-[#e8e3dc] bg-[#F7F5F0] p-4 rounded-sm">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>50+</p>
              <p className="text-xs text-[#6b6560] uppercase tracking-[0.1em] mt-1">Resources</p>
            </div>
            <div className="border border-[#e8e3dc] bg-[#F7F5F0] p-4 rounded-sm">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>24</p>
              <p className="text-xs text-[#6b6560] uppercase tracking-[0.1em] mt-1">Years Married</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCRIPTURE — Mark 4:22 */}
      <section className="py-8 md:py-12 text-center border-t border-[#e8e3dc]">
        <div className="container max-w-3xl mx-auto px-4">
          <p className="text-lg md:text-xl italic text-[#1a1a1a]/50 mb-2 leading-relaxed">
            For there is nothing hid, which shall not be manifested; neither was any thing kept secret, but that it should come abroad.
          </p>
          <p className="text-xs text-[#8b0000] uppercase tracking-[0.15em] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            MARK 4:22 (KJV)
          </p>
        </div>
      </section>

      {/* WATCH — video */}
      <section className="py-12 md:py-20 border-t border-[#e8e3dc] bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h2
              className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              WATCH THE TEACHING NOBODY ELSE WILL GIVE YOU
            </h2>
            <p className="text-[#6b6560] text-sm">Video series on spiritual warfare, the KJV, and the end times.</p>
          </div>

          <div className="mb-6">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded-sm"
                src="https://www.youtube.com/embed/eu8pXtSXbvg?rel=0"
                title="The Mark of the Beast Is Already Here"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <Link
            href="/watch"
            className="text-xs uppercase tracking-[0.15em] text-[#8b0000] hover:text-[#1a1a1a] transition-colors font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            VIEW ALL VIDEO SERIES →
          </Link>
        </div>
      </section>

      {/* BROWSE — category grid */}
      <section className="py-12 md:py-20 border-t border-[#e8e3dc]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              BROWSE 76 RESOURCES BY CATEGORY
            </h2>
            <p className="text-[#6b6560] text-sm">Bible study, marriage, parenting, spiritual warfare, and more.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {Object.entries(CATEGORIES).map(([slug, category]) => {
              const count = getProductsByCategory(slug as any).length;
              const isVault = slug === 'vault';

              return (
                <Link
                  key={slug}
                  href={`/store?category=${slug}`}
                  className="border border-[#e8e3dc] hover:border-[#d0cbc4] bg-white p-4 md:p-6 transition-colors group rounded-sm"
                  style={{
                    borderTop: '2px solid #8b0000',
                  }}
                >
                  <h3
                    className="text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-1 text-xs md:text-sm group-hover:text-[#8b0000] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {category.label}
                  </h3>
                  <p className="text-xs text-[#6b6560] mb-3">
                    {isVault ? '$365 — FULL CLEARANCE' : `${count} DOCUMENT${count !== 1 ? 'S' : ''}`}
                  </p>
                  <div className="text-right text-[#8b0000] group-hover:text-[#1a1a1a] transition-colors text-sm">
                    →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORMS — follow on every channel */}
      <section className="py-12 md:py-20 border-t border-[#e8e3dc] bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              READ US ON EVERY PLATFORM
            </h2>
            <p className="text-[#6b6560] text-sm mt-2">Three Substacks, YouTube, and X. 70,000+ subscribers across all.</p>
          </div>

          {/* Top row: 3 Substacks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <a
              href="https://open.substack.com/pub/deadhidden?r=2t2o3r"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#e8e3dc] bg-[#F7F5F0] p-5 hover:border-[#d0cbc4] transition-colors group rounded-sm"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Substack</p>
              <h3 className="text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>Dead Hidden</h3>
              <p className="text-xs text-[#6b6560]">The hidden things. Uncorrupted. Uncensored.</p>
            </a>

            <a
              href="https://open.substack.com/pub/thebiblicalman?r=2t2o3r"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#e8e3dc] bg-[#F7F5F0] p-5 hover:border-[#d0cbc4] transition-colors group rounded-sm"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Substack</p>
              <h3 className="text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>The Biblical Man</h3>
              <p className="text-xs text-[#6b6560]">Biblical masculinity. Marriage. Headship. The daily frontline.</p>
            </a>

            <a
              href="https://open.substack.com/pub/biblicalwomanhood?r=2t2o3r"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#e8e3dc] bg-[#F7F5F0] p-5 hover:border-[#d0cbc4] transition-colors group rounded-sm"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Substack</p>
              <h3 className="text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>Biblical Womanhood</h3>
              <p className="text-xs text-[#6b6560]">God&apos;s design for women. By Christie Johnson.</p>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="https://www.youtube.com/@DeadHidden-k5y"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#e8e3dc] bg-[#F7F5F0] p-5 hover:border-[#d0cbc4] transition-colors group rounded-sm"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>YouTube</p>
              <h3 className="text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>Dead Hidden</h3>
              <p className="text-xs text-[#6b6560]">Biblical truth on camera. No filter.</p>
            </a>

            <a
              href="https://x.com/Biblicalman"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#e8e3dc] bg-[#F7F5F0] p-5 hover:border-[#d0cbc4] transition-colors group rounded-sm"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>X / Twitter</p>
              <h3 className="text-[#1a1a1a] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>@Biblicalman</h3>
              <p className="text-xs text-[#6b6560]">Daily signal. 45K followers.</p>
            </a>
          </div>
        </div>
      </section>

      {/* THE THREE ALIBIS — free lead magnet capture */}
      <section id="three-alibis" className="py-16 md:py-24 border-t border-[#e8e3dc] bg-[#F7F5F0]">
        <div className="container max-w-xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl text-[#1a1a1a] uppercase tracking-[0.06em] font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            THE THREE ALIBIS
          </h2>

          <p className="text-[#6b6560] mb-8 leading-relaxed">
            Each of us runs one. Most of us have never named it. Free PDF — for the man and for the woman.
          </p>

          <LeadMagnetCapture />

          <p className="text-xs text-[#9a9590] mt-4">
            Free. One email. No spam. Just the truth you&apos;ve been avoiding.
          </p>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="py-16 md:py-24 border-t border-[#e8e3dc]">
        <div className="container max-w-xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-[0.06em] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            JOIN 70,000+ WHO GET THE SIGNAL
          </h2>

          <p className="text-[#6b6560] mb-8 text-sm">
            Platforms throttle everything I publish — the email list is the only line they can&apos;t cut.
          </p>

          <HomepageEmailForm />

          <p className="text-xs text-[#9a9590] mt-4">
            No spam. No selling your data. Just the things they tried to bury.
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <MobileCTA />
    </main>
  );
}
