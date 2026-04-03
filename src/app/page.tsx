import Link from 'next/link';
import { CATEGORIES, getFeaturedProducts, getFreeProducts, getProductsByCategory } from '@/data/products';
import { EmailSignup } from '@/components/EmailSignup';
import { OrganizationJsonLd } from '@/components/JsonLd';
import { MobileCTA } from '@/components/MobileCTA';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const freeProducts = getFreeProducts();

  return (
    <main className="bg-[#0a0a0a] text-[#e8e0d0]">
      <OrganizationJsonLd />

      {/* 1. HERO — shorter, punchier, both CTAs go somewhere that converts */}
      <section className="flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a] bg-black py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <img
            src="/images/logo.png"
            alt="Dead Hidden"
            className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-6 opacity-90"
          />

          <h1
            className="text-3xl md:text-5xl lg:text-6xl text-[#e8e0d0] uppercase tracking-[0.08em] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            BIBLICAL TRUTH THEY TRIED TO BURY.
          </h1>

          <p className="text-sm md:text-base text-[#888] max-w-2xl mx-auto mb-4 leading-relaxed">
            50+ Bible study guides. Biblical masculinity. Biblical womanhood. Marriage. Spiritual warfare. Built in the fire — not a seminary classroom.
          </p>

          <p className="text-xs tracking-[0.2em] uppercase text-[#555] mb-8">
            45,000+ FOLLOWERS · 70,000+ SUBSCRIBERS · THREE SUBSTACKS
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/where-to-begin"
              className="bg-[#8b0000] text-[#e8e0d0] px-8 py-3.5 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              WHERE TO BEGIN
            </Link>
            <Link
              href="/store"
              className="border border-[#e8e0d0]/30 text-[#e8e0d0] px-8 py-3.5 uppercase tracking-[0.15em] font-bold hover:border-[#e8e0d0]/60 transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ENTER THE ARCHIVE
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS — immediately after hero, first thing mobile users see */}
      <section className="py-12 md:py-20 border-t border-[#222]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-3 font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              MOST POPULAR
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-[#e8e0d0] uppercase tracking-[0.08em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              START HERE
            </h2>
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
                      <span className="line-through text-[#555]">$1,500+</span>{' '}
                      <span className="text-[#4ade80] font-bold">Save 76%</span>
                    </p>
                  )}

                  <p className="text-[#555] text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#222]">
                    <span className="text-[#8b0000] font-bold">{product.priceLabel}</span>
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
          <p
            className="text-xs tracking-[0.3em] text-[#8b0000] uppercase text-center mb-8 font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            FROM THE FRONT LINES
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-[#222] bg-[#111] p-6">
              <p className="text-[#e8e0d0] text-sm italic leading-relaxed mb-4">
                &ldquo;I was checking all the Christian boxes and felt completely dead inside. This Bible study system cracked something open in me that 20 years of church couldn&rsquo;t reach.&rdquo;
              </p>
              <p className="text-xs text-[#555] uppercase tracking-[0.1em]">— Paid subscriber, 4 months</p>
            </div>
            <div className="border border-[#222] bg-[#111] p-6">
              <p className="text-[#e8e0d0] text-sm italic leading-relaxed mb-4">
                &ldquo;The Marriage Manual saved my marriage. Not exaggerating. My wife and I read it together and it was the first time we&rsquo;d been on the same page in years.&rdquo;
              </p>
              <p className="text-xs text-[#555] uppercase tracking-[0.1em]">— Husband &amp; wife, married 12 years</p>
            </div>
            <div className="border border-[#222] bg-[#111] p-6">
              <p className="text-[#e8e0d0] text-sm italic leading-relaxed mb-4">
                &ldquo;The Submission Fraud guide was the first time I read something about biblical womanhood that didn&rsquo;t feel like a guilt trip or a cage. Finally, someone who gets it right.&rdquo;
              </p>
              <p className="text-xs text-[#555] uppercase tracking-[0.1em]">— Woman, homeschool mother of 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHERE TO BEGIN — discovery system, reduces overwhelm for new visitors */}
      <section className="py-12 md:py-20 border-t border-[#222] bg-[#111]">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-3 font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              DON&apos;T KNOW WHERE TO START?
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#e8e0d0] uppercase tracking-[0.08em] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              PICK YOUR BATTLE
            </h2>
            <p className="text-[#888] text-sm">Choose the fight you&apos;re in. We&apos;ll show you where to start.</p>
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
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-3 font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              DECLASSIFIED
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#e8e0d0] uppercase tracking-[0.08em] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              FREE. NO EMAIL. JUST READ.
            </h2>
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

                <p className="text-[#555] text-sm line-clamp-2 mb-4 flex-grow">
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
          <p
            className="text-xs tracking-[0.3em] text-[#8b0000] uppercase text-center mb-8 font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            WHAT IS DEAD HIDDEN?
          </p>

          <div className="space-y-4 mb-10">
            <p className="text-lg md:text-xl text-[#e8e0d0] leading-relaxed">
              The Bible you grew up on wasn't the Bible your great-grandparents read.
            </p>
            <p className="text-[#a09888] leading-relaxed">
              Verses were removed. Doctrine was softened. The deity of Christ was undermined — not by atheists, but by the translators themselves. The church didn't decline by accident. It was engineered.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <p className="text-[#c0b8a8] leading-relaxed">
              Dead Hidden is a Bible study resource library for Christians who know something is missing from the modern church. Bible study systems for believers who were never taught how to read Scripture with precision. Spiritual warfare protocols for anyone who feels the attack but can&apos;t name the source. Marriage resources for husbands and wives who refuse to let the covenant die.
            </p>
            <p className="text-[#c0b8a8] leading-relaxed">
              For men: biblical masculinity resources and headship frameworks the modern church won&apos;t preach. For women: biblical womanhood guides, resources on finding a godly man, and the unfiltered truth about submission that the church either waters down or weaponizes. By Adam and Christie Johnsson.
            </p>
            <p className="text-[#a09888] leading-relaxed">
              Every guide on this site was forged in real life — not theory. Adam and Christie have been married 24 years, raised five children, and taught Sunday School for 17 years straight. The frameworks here come from the fire of lived obedience, tested against the same failures, temptations, and silence that you face right now.
            </p>
            <p className="text-[#888] leading-relaxed">
              This is Bible study without the seminary filter. Biblical marriage without the compromise. Parenting without the cultural surrender. Spiritual warfare without the charismatic sideshow. If you want comfortable Christianity, this is the wrong site. If you want the truth — you are in the right place.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="border border-[#222] bg-[#0a0a0a] p-4">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>50+</p>
              <p className="text-xs text-[#555] uppercase tracking-[0.1em] mt-1">Resources</p>
            </div>
            <div className="border border-[#222] bg-[#0a0a0a] p-4">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>9</p>
              <p className="text-xs text-[#555] uppercase tracking-[0.1em] mt-1">Categories</p>
            </div>
            <div className="border border-[#222] bg-[#0a0a0a] p-4">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>17</p>
              <p className="text-xs text-[#555] uppercase tracking-[0.1em] mt-1">Years Teaching</p>
            </div>
            <div className="border border-[#222] bg-[#0a0a0a] p-4">
              <p className="text-2xl md:text-3xl text-[#8b0000] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>24</p>
              <p className="text-xs text-[#555] uppercase tracking-[0.1em] mt-1">Years Married</p>
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

      {/* 8. THE ARCHIVE - CATEGORIES GRID */}
      <section className="py-12 md:py-20 border-t border-[#222]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-3 font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              THE ARCHIVE
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-[#e8e0d0] uppercase tracking-[0.08em] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              66 DOCUMENTS. NINE CATEGORIES.
            </h2>
            <p className="text-[#888]">The things they buried.</p>
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
                  <p className="text-xs text-[#555] mb-3">
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
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-3 font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              THE SIGNAL
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#e8e0d0] uppercase tracking-[0.08em] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              MULTIPLE FREQUENCIES. ONE MISSION.
            </h2>
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
              <p className="text-xs text-[#888]">God&apos;s design for women. By Christie Johnsson.</p>
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

      {/* 10. EMAIL SIGNUP */}
      <section className="py-16 md:py-24 border-t border-[#222]">
        <div className="container max-w-xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl text-[#e8e0d0] uppercase tracking-[0.08em] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            GET THE SIGNAL
          </h2>

          <p className="text-[#888] mb-8 text-sm">
            Most of what I publish gets throttled by platforms. The email list is the only line they can't cut.
          </p>

          <EmailSignup />
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <MobileCTA />
    </main>
  );
}
