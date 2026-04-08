import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, getFeaturedProducts, getFreeProducts, getProductsByCategory } from '@/data/products';
import { OrganizationJsonLd } from '@/components/JsonLd';
import { MobileCTA } from '@/components/MobileCTA';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { HomepageEmailForm } from '@/components/HomepageEmailForm';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const freeProducts = getFreeProducts();

  return (
    <main className="bg-[#0a0a0a] text-[#e8e0d0]">
      <ScrollDepthTracker page="/" />
      <OrganizationJsonLd />

      {/* 1. HERO — clear visual hierarchy: brand → headline → support → CTA */}
      <section className="relative overflow-hidden bg-[#0a0a0a] pt-12 pb-16 md:pt-20 md:pb-28 border-b border-[#222]">
        {/* Subtle background grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

        <div className="container max-w-4xl mx-auto px-4 relative">
          {/* Brand — prominent logo */}
          <div className="mb-8 md:mb-12">
            <Image
              src="/images/logo.png"
              alt="Dead Hidden Ministries"
              width={160}
              height={160}
              className="w-24 h-24 md:w-36 md:h-36 opacity-95"
              priority
            />
          </div>

          {/* Headline — largest text, answers "What is this?" */}
          <h1
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] leading-[0.95] text-[#e8e0d0] uppercase tracking-[0.04em] font-bold mb-5 max-w-3xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            BIBLICAL TRUTH<br className="hidden md:block" /> THEY TRIED TO BURY.
          </h1>

          {/* Supporting line — one sentence, answers "Why should I care?" */}
          <p className="text-lg md:text-xl text-[#a09888] max-w-xl mb-10 leading-relaxed">
            50+ resources on Scripture, marriage, parenting, and spiritual warfare — built in the fire, not a seminary classroom.
          </p>

          {/* CTA — one primary button, nothing competing */}
          <Link
            href="/where-to-begin"
            className="inline-block bg-[#8b0000] text-[#e8e0d0] px-10 py-4 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors text-sm md:text-base"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            WHERE TO BEGIN
          </Link>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS — immediately after hero, first thing mobile users see */}
      <section className="py-12 md:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              THE 4 RESOURCES THAT CHANGE EVERYTHING
            </h2>
            <p className="text-[#888] text-sm mt-2">Most purchased. Most highlighted. Most dog-eared.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 4).map((product) => {
              const isVault = product.slug === 'the-vault';

              return (
                <Link
                  key={product.slug}
                  href={`/store/${product.slug}`}
                  className="border border-[#222] bg-[#111] p-6 flex flex-col h-full relative hover:border-[#333] transition-colors group"
                  style={{
                    borderTop: '2px solid #8b0000',
                  }}
                >
                  {isVault && (
                    <div className="absolute top-4 right-4 bg-[#8b0000]/20 text-[#a50000] text-xs px-2 py-1 uppercase font-bold tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>
                      FULL ACCESS
                    </div>
                  )}

                  {product.slug === 'how-to-study-bible' && (
                    <div className="absolute top-4 right-4 bg-[#1a3a1a] text-[#4ade80] text-xs px-2 py-1 uppercase font-bold tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>
                      MOST POPULAR
                    </div>
                  )}

                  <h3
                    className="text-[#e8e0d0] uppercase tracking-[0.08em] font-bold mb-2 text-sm group-hover:text-[#8b0000] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#888] mb-2">{product.tagline}</p>

                  {product.slug === 'how-to-study-bible' && (
                    <p className="text-xs text-[#4ade80] mb-2 font-bold">318 believers bought this</p>
                  )}

                  {isVault && (
                    <p className="text-xs text-[#888] mb-2">
                      <span className="line-through text-[#777]">$1,500+</span>{' '}
                      <span className="text-[#4ade80] font-bold">Save 76%</span>
                    </p>
                  )}

                  <p className="text-[#777] text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#222]">
                    <span className="text-[#8b0000] font-bold">{product.priceLabel.endsWith('+') ? product.priceLabel.slice(0, -1) : product.priceLabel}</span>
                    <span
                      className="text-xs uppercase tracking-[0.15em] text-[#8b0000] group-hover:text-[#e8e0d0] transition-colors font-bold"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      VIEW →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS — social proof right after products */}
      <section className="py-12 md:py-16 border-t border-[#222]">
        <div className="container max-w-6xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            REAL CHRISTIANS. REAL MARRIAGES SAVED.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-[#222] bg-[#111] p-6">
              <p className="text-[#e8e0d0] text-sm italic leading-relaxed mb-4">
                &ldquo;I was checking all the Christian boxes and felt completely dead inside. This Bible study system cracked something open in me that 20 years of church couldn&rsquo;t reach.&rdquo;
              </p>
              <p className="text-xs text-[#777] uppercase tracking-[0.1em]">— Paid subscriber, 4 months</p>
            </div>
            <div className="border border-[#222] bg-[#111] p-6">
              <p className="text-[#e8e0d0] text-sm italic leading-relaxed mb-4">
                &ldquo;The Marriage Manual saved my marriage. Not exaggerating. My wife and I read it together and it was the first time we&rsquo;d been on the same page in years.&rdquo;
              </p>
              <p className="text-xs text-[#777] uppercase tracking-[0.1em]">— Husband &amp; wife, married 12 years</p>
            </div>
            <div className="border border-[#222] bg-[#111] p-6">
              <p className="text-[#e8e0d0] text-sm italic leading-relaxed mb-4">
                &ldquo;The Submission Fraud guide was the first time I read something about biblical womanhood that didn&rsquo;t feel like a guilt trip or a cage. Finally, someone who gets it right.&rdquo;
              </p>
              <p className="text-xs text-[#777] uppercase tracking-[0.1em]">— Woman, homeschool mother of 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHERE TO BEGIN — discovery system, reduces overwhelm for new visitors */}
      <section className="py-12 md:py-20 border-t border-[#222] bg-[#111]">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              FIND YOUR FIGHT IN 60 SECONDS
            </h2>
            <p className="text-[#888] text-sm">Choose the battle you&apos;re in. We&apos;ll hand you the weapon.</p>
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
                className="border border-[#222] bg-[#0a0a0a] p-4 text-center hover:border-[#8b0000] transition-colors group"
              >
                <p className="text-2xl mb-2">{cat.icon}</p>
                <p
                  className="text-xs text-[#e8e0d0] uppercase tracking-[0.1em] font-bold group-hover:text-[#8b0000] transition-colors"
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
              className="text-xs uppercase tracking-[0.15em] text-[#8b0000] hover:text-[#e8e0d0] transition-colors font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              VIEW ALL 10 CATEGORIES →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FREE RESOURCES — low-commitment entry point */}
      <section className="py-12 md:py-20 border-t border-[#222]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              START FREE. NO EMAIL REQUIRED.
            </h2>
            <p className="text-[#888] text-sm mt-2">Download these now. Zero commitment. Zero catch.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {freeProducts.slice(0, 4).map((product) => (
              <Link
                key={product.slug}
                href={`/store/${product.slug}`}
                className="border border-[#222] bg-[#111] p-6 flex flex-col h-full hover:border-[#333] transition-colors group"
                style={{
                  borderTop: '2px solid #8b0000',
                }}
              >
                <div className="bg-[#1a3a1a] text-[#4ade80] text-xs px-2 py-0.5 inline-block mb-4 w-fit uppercase font-bold tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>
                  FREE
                </div>

                <h3
                  className="text-[#e8e0d0] uppercase tracking-[0.08em] font-bold mb-2 text-sm group-hover:text-[#8b0000] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {product.name}
                </h3>

                <p className="text-[#777] text-sm line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#222]">
                  <span className="text-[#4ade80] font-bold text-xs uppercase tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>FREE</span>
                  <span
                    className="text-xs uppercase tracking-[0.15em] text-[#8b0000] group-hover:text-[#e8e0d0] transition-colors font-bold"
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
              className="text-xs uppercase tracking-[0.15em] text-[#8b0000] hover:text-[#e8e0d0] transition-colors font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              VIEW ALL FREE RESOURCES →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. THE SPLINTER + WHO THIS IS FOR — combined, compressed, SEO preserved */}
      <section id="splinter" className="py-12 md:py-20 border-t border-[#222] bg-[#111]">
        <div className="container max-w-3xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            BUILT IN THE FIRE. NOT A SEMINARY.
          </h2>

          <div className="space-y-4 mb-10">
            <p className="text-lg md:text-xl text-[#e8e0d0] leading-relaxed">
              Dead Hidden is a Bible study ministry — a friend to churches, families, and every Christian who knows the modern church is missing something.
            </p>
            <p className="text-[#a09888] leading-relaxed">
              We exist to serve the body of Christ with resources the pulpit used to provide. Bible study systems. Marriage frameworks. Parenting guides. Spiritual warfare protocols. The kind of material that used to come from the local church — before the church stopped teaching it.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <p className="text-[#c0b8a8] leading-relaxed">
              <strong className="text-[#e8e0d0]">The Biblical Man</strong> — Adam&apos;s publication for men ready to lead their homes and fight for their faith. Biblical masculinity, headship, and the hard truths the modern pulpit abandoned. <strong className="text-[#e8e0d0]">Biblical Womanhood</strong> — Christie&apos;s publication for women who want God&apos;s design without the feminist filter. Virtue, prayer, and the strength the world calls weakness. <strong className="text-[#e8e0d0]">Dead Hidden</strong> — the ministry itself. 50+ downloadable resources, three publications, and 70,000+ subscribers across all platforms.
            </p>
            <p className="text-[#c0b8a8] leading-relaxed">
              This ministry was forged in real life — not a classroom. Adam drove garbage trucks and conducted trains before going full-time. Christie homeschools five children. They&apos;ve been married 24 years, taught Sunday School for 17 straight, and serve their local church every week. Every resource on this site comes from the trenches of lived obedience.
            </p>
            <p className="text-[#888] leading-relaxed">
              Whether you&apos;re a pastor looking for small group material, a father trying to lead his family, a wife who wants biblical truth without compromise, or a new believer who doesn&apos;t know where to start — this ministry was built to serve you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="border border-[#222] bg-[#0a0a0a] p-4">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>3</p>
              <p className="text-xs text-[#777] uppercase tracking-[0.1em] mt-1">Publications</p>
            </div>
            <div className="border border-[#222] bg-[#0a0a0a] p-4">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>70K+</p>
              <p className="text-xs text-[#777] uppercase tracking-[0.1em] mt-1">Subscribers</p>
            </div>
            <div className="border border-[#222] bg-[#0a0a0a] p-4">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>50+</p>
              <p className="text-xs text-[#777] uppercase tracking-[0.1em] mt-1">Resources</p>
            </div>
            <div className="border border-[#222] bg-[#0a0a0a] p-4">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>24</p>
              <p className="text-xs text-[#777] uppercase tracking-[0.1em] mt-1">Years Married</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SCRIPTURE BREAK */}
      <section className="py-16 md:py-24 text-center border-t border-[#222]">
        <div className="container max-w-3xl mx-auto px-4">
          <p className="text-xl md:text-2xl italic text-[#e8e0d0]/80 mb-4 leading-relaxed">
            For there is nothing hid, which shall not be manifested; neither was any thing kept secret, but that it should come abroad.
          </p>
          <p
            className="text-[#8b0000] uppercase tracking-[0.15em] font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            MARK 4:22 (KJV)
          </p>
        </div>
      </section>

      {/* 7b. WATCH — embedded YouTube videos to increase time on site */}
      <section className="py-12 md:py-20 border-t border-[#222] bg-[#111]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              WATCH THE TEACHING NOBODY ELSE WILL GIVE YOU
            </h2>
            <p className="text-[#888] text-sm">Video series on spiritual warfare, the KJV, and the end times.</p>
          </div>

          {/* Featured Video — large */}
          <div className="mb-8">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/eu8pXtSXbvg?rel=0"
                title="The Mark of the Beast Is Already Here"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <h3
                className="text-lg md:text-xl uppercase font-bold text-[#e8e0d0]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                THE MARK OF THE BEAST IS ALREADY HERE
              </h3>
              <p className="text-xs text-[#777] mt-1">Featured — 1.5K views</p>
            </div>
          </div>

          {/* Playlist Embeds — 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=PLiHaOYX3u49EhXzIEdx0fVbgBa8OEtFrH&rel=0"
                  title="What's the Big Deal About the KJV?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <h3
                className="text-sm uppercase font-bold text-[#e8e0d0] mt-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                WHAT&apos;S THE BIG DEAL ABOUT THE KJV?
              </h3>
              <p className="text-xs text-[#777] mt-1">9-part series</p>
            </div>

            <div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=PLiHaOYX3u49EkJQC9pIRxF6sqKNJoq6rp&rel=0"
                  title="Antichrist and the Endtimes"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <h3
                className="text-sm uppercase font-bold text-[#e8e0d0] mt-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                ANTICHRIST AND THE ENDTIMES
              </h3>
              <p className="text-xs text-[#777] mt-1">5-part series</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/watch"
              className="text-xs uppercase tracking-[0.15em] text-[#8b0000] hover:text-[#e8e0d0] transition-colors font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              VIEW FULL VIDEO ARCHIVE →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. THE ARCHIVE - CATEGORIES GRID */}
      <section className="py-12 md:py-20 border-t border-[#222]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              BROWSE 76 RESOURCES BY CATEGORY
            </h2>
            <p className="text-[#888] text-sm">Bible study, marriage, parenting, spiritual warfare, and more.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {Object.entries(CATEGORIES).map(([slug, category]) => {
              const count = getProductsByCategory(slug as any).length;
              const isVault = slug === 'vault';

              return (
                <Link
                  key={slug}
                  href={`/store?category=${slug}`}
                  className="border border-[#222] hover:border-[#333] bg-[#111] p-4 md:p-6 transition-colors group"
                  style={{
                    borderTop: '2px solid #8b0000',
                  }}
                >
                  <h3
                    className="text-[#e8e0d0] uppercase tracking-[0.08em] font-bold mb-1 text-xs md:text-sm group-hover:text-[#8b0000] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {category.label}
                  </h3>
                  <p className="text-xs text-[#777] mb-3">
                    {isVault ? '$365 — FULL CLEARANCE' : `${count} DOCUMENT${count !== 1 ? 'S' : ''}`}
                  </p>
                  <div className="text-right text-[#8b0000] group-hover:text-[#e8e0d0] transition-colors text-sm">
                    →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. THE SIGNAL - PUBLICATIONS */}
      <section className="py-12 md:py-20 border-t border-[#222] bg-[#111]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2
              className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              READ US ON EVERY PLATFORM
            </h2>
            <p className="text-[#888] text-sm mt-2">Three Substacks, YouTube, and X. 70,000+ subscribers across all.</p>
          </div>

          {/* Top row: 3 Substacks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <a
              href="https://open.substack.com/pub/deadhidden?r=2t2o3r"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#222] bg-[#0a0a0a] p-5 hover:border-[#333] transition-colors group"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Substack</p>
              <h3 className="text-[#e8e0d0] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>Dead Hidden</h3>
              <p className="text-xs text-[#888]">The hidden things. Uncorrupted. Uncensored.</p>
            </a>

            <a
              href="https://open.substack.com/pub/thebiblicalman?r=2t2o3r"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#222] bg-[#0a0a0a] p-5 hover:border-[#333] transition-colors group"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Substack</p>
              <h3 className="text-[#e8e0d0] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>The Biblical Man</h3>
              <p className="text-xs text-[#888]">Biblical masculinity. Marriage. Headship. The daily frontline.</p>
            </a>

            <a
              href="https://open.substack.com/pub/biblicalwomanhood?r=2t2o3r"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#222] bg-[#0a0a0a] p-5 hover:border-[#333] transition-colors group"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Substack</p>
              <h3 className="text-[#e8e0d0] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>Biblical Womanhood</h3>
              <p className="text-xs text-[#888]">God&apos;s design for women. By Christie Johnson.</p>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="https://www.youtube.com/@DeadHidden-k5y"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#222] bg-[#0a0a0a] p-5 hover:border-[#333] transition-colors group"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>YouTube</p>
              <h3 className="text-[#e8e0d0] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>Dead Hidden</h3>
              <p className="text-xs text-[#888]">Biblical truth on camera. No filter.</p>
            </a>

            <a
              href="https://x.com/Biblicalman"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#222] bg-[#0a0a0a] p-5 hover:border-[#333] transition-colors group"
              style={{ borderTop: '2px solid #8b0000' }}
            >
              <p className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-2 font-bold" style={{ fontFamily: 'var(--font-heading)' }}>X / Twitter</p>
              <h3 className="text-[#e8e0d0] uppercase tracking-[0.08em] font-bold mb-1 text-sm group-hover:text-[#8b0000] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>@Biblicalman</h3>
              <p className="text-xs text-[#888]">Daily signal. 45K followers.</p>
            </a>
          </div>
        </div>
      </section>

      {/* 10. EMAIL SIGNUP — primary on-site capture */}
      <section className="py-16 md:py-24 border-t border-[#222]">
        <div className="container max-w-xl mx-auto px-4">
          <h2
            className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            JOIN 70,000+ WHO GET THE SIGNAL
          </h2>

          <p className="text-[#888] mb-2 text-sm">
            Platforms throttle everything I publish.
          </p>
          <p className="text-[#e8e0d0] mb-8 text-sm font-bold">
            The email list is the only line they can&apos;t cut.
          </p>

          <HomepageEmailForm />

          <p className="text-xs text-[#555] mt-4">
            No spam. No selling your data. Just the things they tried to bury.
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <MobileCTA />
    </main>
  );
}
