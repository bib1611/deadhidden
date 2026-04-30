import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { CATEGORIES, getFreeProducts, getProductsByCategory, getProductBySlug, type Category } from '@/data/products';
import { OrganizationJsonLd } from '@/components/JsonLd';
import { MobileCTA } from '@/components/MobileCTA';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { HomepageEmailForm } from '@/components/HomepageEmailForm';
import { SubstackFeed } from '@/components/SubstackFeed';
import { LeadMagnetCapture } from '@/components/LeadMagnetCapture';
import { TrackedLink } from '@/components/TrackedLink';

export const metadata: Metadata = {
  title: 'Dead Hidden Ministries — Biblical Truth They Tried to Bury',
  description:
    '83+ downloadable resources on Bible study, marriage, parenting, biblical masculinity, and spiritual warfare. Built in the fire — not a seminary classroom. KJV only.',
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
      '83+ resources on Scripture, marriage, parenting, and spiritual warfare. 131,000+ readers. KJV only.',
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
      '83+ resources on Scripture, marriage, parenting, and spiritual warfare. KJV only.',
    creator: '@Biblicalman',
  },
  alternates: {
    canonical: 'https://deadhidden.org',
  },
};

export default function Home() {
  const freeProducts = getFreeProducts();

  return (
    <main className="bg-[#F7F5F0] text-[#1a1a1a]">
      <ScrollDepthTracker page="/" />
      <OrganizationJsonLd />

      {/* 1. HERO — loud proof + sampler CTA */}
      <section className="relative overflow-hidden bg-[#090807] pt-24 pb-16 text-[#e8e0d0] md:pt-32 md:pb-24">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_18%_16%,#8b0000_0,transparent_26%),linear-gradient(90deg,transparent_0,rgba(232,224,208,.18)_50%,transparent_100%)]" />
        <div className="container relative max-w-6xl mx-auto px-4">
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <div className="border border-[#2a211d] bg-[#100d0b] p-4">
              <div className="text-4xl font-black text-[#f3ead7]" style={{ fontFamily: 'var(--font-heading)' }}>131K+</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9f9380]">readers on X & Substack</div>
            </div>
            <div className="border border-[#2a211d] bg-[#100d0b] p-4">
              <div className="text-4xl font-black text-[#f3ead7]" style={{ fontFamily: 'var(--font-heading)' }}>83+</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9f9380]">biblical resources</div>
            </div>
            <div className="border border-[#2a211d] bg-[#100d0b] p-4">
              <div className="text-4xl font-black text-[#f3ead7]" style={{ fontFamily: 'var(--font-heading)' }}>24 Yrs</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9f9380]">married, living it</div>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_.78fr]">
            <div>
              <p
                className="text-xs tracking-[0.25em] text-[#8b0000] uppercase font-bold mb-5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                DEAD HIDDEN MINISTRIES / BIBLICAL TRUTH
              </p>
              <h1
                className="text-[4.2rem] sm:text-[5.7rem] lg:text-[7.4rem] leading-[0.78] text-[#f3ead7] uppercase tracking-[0.015em] font-black mb-7"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Biblical truth they tried to bury.
              </h1>
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <TrackedLink
                  href="/store/vault-sampler"
                  eventName="vault_sampler_click"
                  eventProperties={{ location: 'home_hero' }}
                  className="inline-block btn-press bg-[#8b0000] text-white px-8 py-4 uppercase tracking-[0.14em] font-black hover:bg-[#a50000] transition-all text-sm md:text-base rounded-sm text-center"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  GET THE $7 SAMPLER →
                </TrackedLink>
                <Link
                  href="/store/the-vault"
                  className="inline-block border border-[#2a211d] px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#c8b99e] hover:border-[#8b0000] hover:text-[#f3ead7] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  SEE THE FULL VAULT
                </Link>
              </div>
              <p className="text-lg md:text-xl text-[#c8b99e] max-w-2xl mb-3 leading-relaxed">
                Garbage trucks. Trains. Five kids. 24 years married. KJV only.
              </p>
              <p className="text-base md:text-lg text-[#9f9380] max-w-2xl leading-relaxed">
                Adam drove garbage trucks and conducted trains before going full-time. This is what happened next.
              </p>
            </div>

            <div className="border border-[#2a211d] bg-[#100d0b] p-5 sm:p-6 shadow-2xl" style={{ borderLeft: '3px solid #8b0000' }}>
              <Image
                src="/images/adam-christie.jpg"
                alt="Adam and Christie Johnson"
                width={460}
                height={460}
                className="w-full h-auto grayscale-[12%]"
                priority
              />
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#f3ead7]">
                Adam &amp; Christie Johnson
              </p>
              <p className="mt-2 text-xs text-[#9f9380] leading-relaxed">
                Married 24 years. Five kids. Sunday School 17 straight years. Built in the fire — not a seminary classroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ORIGIN STORY — trust above the fold path */}
      <section className="py-12 md:py-16 border-t border-[#211a16] bg-[#0f0d0b] text-[#e8e0d0]">
        <div className="container max-w-5xl mx-auto px-4 grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-start">
          <div>
            <p className="text-xs tracking-[0.22em] text-[#8b0000] uppercase font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              The man behind it
            </p>
            <h2 className="text-3xl md:text-5xl uppercase font-black leading-tight text-[#f3ead7]" style={{ fontFamily: 'var(--font-heading)' }}>
              He did not come from seminary.
            </h2>
          </div>
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-[#c8b99e]">
            <p>
              Adam drove garbage trucks. Conducted trains. Raised a family. Then started digging through the King James Bible and pulling out what modern Christianity buried under comfort and compromise.
            </p>
            <p>
              The Vault is the field archive from that work — Bible study guides, marriage manuals, spiritual warfare resources, parenting tools, and the truth nobody in your church lobby wants to say out loud.
            </p>
            <Link
              href="/store/vault-sampler"
              className="inline-block bg-[#8b0000] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#a50000]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Get the sampler →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SAMPLER ENTRY */}
      <section className="py-12 border-t border-[#e8e3dc] bg-[#F7F5F0]">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-center border border-[#e8e3dc] bg-white p-6 md:p-8" style={{ borderTop: '3px solid #8b0000' }}>
            <div>
              <p className="text-xs tracking-[0.22em] text-[#8b0000] uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Not sure where to start?
              </p>
              <h2 className="text-3xl md:text-4xl uppercase font-black text-[#1a1a1a] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                The Vault Sampler
              </h2>
              <p className="text-[#6b6560] leading-relaxed">
                A handpicked taste of the full arsenal: Bible conquest, marriage, spiritual warfare, and KJV study discipline. If this does not light a fire under you, nothing will.
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="mb-3 text-5xl font-black text-[#1a1a1a]" style={{ fontFamily: 'var(--font-heading)' }}>$7</div>
              <Link
                href="/store/vault-sampler"
                className="inline-block bg-[#8b0000] px-8 py-4 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#a50000]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Get the sampler →
              </Link>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[#9a9590]">Instant PDF download</p>
            </div>
          </div>
        </div>
      </section>

      {/* WARS AND RUMORS LAUNCH BANNER */}
      <section className="py-10 md:py-14 border-t border-[#e8e3dc] bg-[#0a0a0a]">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <div
            className="text-[10px] tracking-[0.2em] uppercase text-[#8b0000] font-medium mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Now Live
          </div>
          <h2
            className="text-3xl md:text-4xl uppercase font-bold text-[#e8e0d0] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Wars and Rumors of Wars
          </h2>
          <p className="text-[#c0b8a8] mb-6 max-w-lg mx-auto">
            A line-by-line Bible study on Revelation and Daniel&apos;s 70th Week.
            Twelve chapters. Ninety-three pages. Built from the text up.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/wars-and-rumors-of-wars"
              className="btn-press bg-[#8b0000] text-[#e8e0d0] text-xs tracking-[0.1em] uppercase font-bold px-8 py-3 hover:bg-[#a50000] transition-all"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Read the Launch Page →
            </Link>
            <Link
              href="/store/wars-and-rumors-of-wars"
              className="text-xs tracking-[0.1em] uppercase text-[#888] hover:text-[#e8e0d0] transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              View in the Archive
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FROM THE FIELD — latest Substack posts (light mode overrides) */}
      <div className="homepage-light-feed">
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
          <div className="mb-8">
            <p className="text-xs tracking-[0.22em] text-[#8b0000] uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              From the community
            </p>
            <h2
              className="text-2xl md:text-4xl text-[#1a1a1a] uppercase tracking-[0.06em] font-black"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Real words from public reader replies.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                pull: '“I’m sending this to my husband.”',
                quote: 'You have opened my eyes and heart in so many ways. We would love to support you.',
                name: 'JO',
                handle: '@JOANNA953534211',
              },
              {
                pull: '“It would have saved my marriage.”',
                quote: 'This is so smart, and so true. It would have saved my marriage that ended years ago.',
                name: 'JELLENNE',
                handle: '@JELLENNE',
              },
              {
                pull: '“This changed my life and my wife’s life.”',
                quote: "Amen and this has changed my life and my wife's life. It's incredible.",
                name: 'TREBOR',
                handle: '@ROBERTROLLTIDE1',
              },
              {
                pull: '“I needed this.”',
                quote: 'I can’t express how much this touched me. I needed this. I’m a recent widow after 57 years together. I needed to find grace.',
                name: 'BONNIE',
                handle: '@IOWABONNIE',
              },
              {
                pull: '“Sent it to both my children.”',
                quote: 'I needed this. Sent it to both my children.',
                name: 'FIGHTINGTHERAPTURE',
                handle: '@FIGHTINGTHERAP1',
              },
              {
                pull: '“Opened my eyes and heart.”',
                quote: 'Here I am scrolling there this phone in bed and my wife asleep next to me. Struggling and overwhelmed and this just opened my eyes and heart. Thank you.',
                name: 'CD ARNOLD',
                handle: '@CDARNOLD18206',
              },
            ].map((item) => (
              <div key={item.handle} className="border border-[#e8e3dc] bg-white p-6 rounded-sm" style={{ borderTop: '2px solid #8b0000' }}>
                <p className="text-[#1a1a1a] text-lg font-black leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  {item.pull}
                </p>
                <p className="text-[#1a1a1a] text-sm italic leading-relaxed mb-5">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-xs text-[#9a9590] uppercase tracking-[0.1em]">— {item.name} · {item.handle} · Public X reply</p>
              </div>
            ))}
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
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>131K+</p>
              <p className="text-xs text-[#6b6560] uppercase tracking-[0.1em] mt-1">Readers</p>
            </div>
            <div className="border border-[#e8e3dc] bg-[#F7F5F0] p-4 rounded-sm">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>83+</p>
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
              BROWSE 83+ RESOURCES BY CATEGORY
            </h2>
            <p className="text-[#6b6560] text-sm">Bible study, marriage, parenting, spiritual warfare, and more.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {Object.entries(CATEGORIES).map(([slug, category]) => {
              const categorySlug = slug as Category;
              const count = getProductsByCategory(categorySlug).length;
              const isVault = categorySlug === 'vault';

              return (
                <Link
                  key={slug}
                  href={`/store?category=${categorySlug}`}
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
                    {isVault ? '$297 — FULL CLEARANCE' : `${count} DOCUMENT${count !== 1 ? 'S' : ''}`}
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
            <p className="text-[#6b6560] text-sm mt-2">Three Substacks, YouTube, and X. 131,000+ readers across the whole field.</p>
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
            JOIN 131,000+ WHO GET THE SIGNAL
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
