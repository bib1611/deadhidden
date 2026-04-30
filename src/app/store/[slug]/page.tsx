import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, CATEGORIES, getProductsByCategory, getProductBySlug, type Category } from '@/data/products';
import { BuyButton } from '@/components/BuyButton';
import { ShareButtons } from '@/components/ShareButtons';
import { ProductJsonLd } from '@/components/JsonLd';
import VaultValueStack from '@/components/VaultValueStack';
import Image from 'next/image';
import { MobileProductCTA } from '@/components/MobileProductCTA';
import { ProductFAQ } from '@/components/ProductFAQ';
import { ProductViewTracker } from '@/components/ProductViewTracker';

// Generate static params from all product slugs for SSG
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  const ogImage = `https://deadhidden.org/api/og?title=${encodeURIComponent(product.name)}&type=product&price=${encodeURIComponent(product.priceLabel)}${product.tagline ? `&subtitle=${encodeURIComponent(product.tagline)}` : ''}`;

  return {
    title: `${product.name} | Dead Hidden`,
    description: product.description.substring(0, 160),
    keywords: product.seoKeywords || [],
    openGraph: {
      title: product.name,
      description: product.tagline,
      url: `https://deadhidden.org/store/${slug}`,
      type: 'website',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: product.name,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.tagline,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://deadhidden.org/store/${slug}`,
    },
  };
}

/**
 * Format price labels: convert "$37+" to "Starting at $37" for clarity
 */
function formatPrice(priceLabel: string): { prefix: string | null; price: string } {
  if (priceLabel.endsWith('+')) {
    return { prefix: 'Starting at', price: priceLabel.slice(0, -1) };
  }
  return { prefix: null, price: priceLabel };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { prefix: pricePrefix, price: priceDisplay } = formatPrice(product.priceLabel);

  // Get related products from same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  // Cross-category recommendations — pick from different categories
  const crossCategoryMap: Record<Category, Category[]> = {
    vault: ['marriage-family', 'masculinity', 'spiritual-warfare'],
    'marriage-family': ['parenting', 'women', 'masculinity'],
    'bible-study': ['spiritual-warfare', 'masculinity', 'free-resources'],
    'spiritual-warfare': ['masculinity', 'bible-study', 'marriage-family'],
    masculinity: ['spiritual-warfare', 'marriage-family', 'bible-study'],
    parenting: ['marriage-family', 'masculinity', 'women'],
    women: ['marriage-family', 'parenting', 'free-resources'],
    bundles: ['vault', 'masculinity', 'spiritual-warfare'],
    'free-resources': ['bible-study', 'masculinity', 'spiritual-warfare'],
  };
  const crossCategories = crossCategoryMap[product.category] || [];
  const crossCategoryProducts = crossCategories
    .flatMap((cat) => {
      const catProducts = getProductsByCategory(cat).filter((p) => p.isFeatured);
      return catProducts.length > 0 ? [catProducts[0]] : [getProductsByCategory(cat)[0]];
    })
    .filter(Boolean)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <ProductViewTracker slug={product.slug} price={product.priceLabel} />
      <ProductJsonLd
        name={product.name}
        description={product.description}
        slug={product.slug}
        price={product.priceCents}
      />
      {/* Breadcrumb */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto text-xs tracking-[0.1em] uppercase text-[#888]">
          <Link href="/store" className="hover:text-[#e8e0d0] transition-colors">
            THE ARCHIVE
          </Link>
          <span className="mx-2 text-[#777]">/</span>
          <Link href={`/store/category/${product.category}`} className="hover:text-[#e8e0d0] transition-colors">
            {CATEGORIES[product.category].label}
          </Link>
          <span className="mx-2 text-[#777]">/</span>
          <span className="text-[#e8e0d0]">{product.name}</span>
        </div>
      </div>

      {/* Product Content */}
      <div className={`${product.slug === 'the-vault' ? 'max-w-6xl' : 'max-w-4xl'} mx-auto px-4 sm:px-6 lg:px-8 py-24`}>
        {/* Title */}
        {product.slug === 'the-vault' ? (
          <div className="relative mb-10 overflow-hidden border border-[#2a211d] bg-[#0d0b0a] p-5 sm:p-8 lg:p-10 shadow-2xl">
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,#8b0000_0,transparent_28%),linear-gradient(90deg,transparent_0,rgba(232,224,208,.18)_50%,transparent_100%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex border border-[#8b0000]/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#a45b43]">
                  Declassified field file — final sale digital archive
                </div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-7xl uppercase font-bold leading-[0.9] tracking-[0.03em] text-[#e8e0d0]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Your marriage is bleeding.<br />
                  Your son is softening.<br />
                  Your Bible gathers dust.
                </h1>
                <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#c0b8a8]">
                  76 recovered documents. One field package. For the believer done playing church.
                </p>
                <div className="mt-6 grid gap-3 text-xs uppercase tracking-[0.16em] text-[#888] sm:grid-cols-3">
                  <span className="border border-[#222] bg-[#111] px-3 py-2">Bestselling Dead Hidden archive</span>
                  <span className="border border-[#222] bg-[#111] px-3 py-2">Instant PDF access</span>
                  <span className="border border-[#222] bg-[#111] px-3 py-2">No refunds. No subscription.</span>
                </div>
              </div>
              {product.coverImage && (
                <div className="relative mx-auto w-full max-w-sm">
                  <div className="absolute -right-3 -top-3 z-10 rotate-6 border-2 border-[#8b0000] px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-[#8b0000] opacity-80">
                    Recovered
                  </div>
                  <Image
                    src={product.coverImage}
                    alt={`${product.name} cover`}
                    width={400}
                    height={520}
                    className="w-full h-auto border border-[#2a211d] shadow-2xl grayscale-[15%]"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <h1
            className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold text-[#e8e0d0] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {product.name}
          </h1>
        )}

        {/* Category Badge */}
        <div className="text-xs tracking-[0.12em] uppercase text-[#777] mb-6">
          {product.slug === 'the-vault' ? 'THE FIELD PACKAGE / 76 DOCUMENT MANIFEST' : CATEGORIES[product.category].label}
        </div>

        {/* Cover Image */}
        {product.coverImage && product.slug !== 'the-vault' && (
          <div className="mb-8 flex justify-center md:justify-start">
            <Image
              src={product.coverImage}
              alt={`${product.name} cover`}
              width={400}
              height={520}
              className="max-w-[300px] md:max-w-[400px] w-full h-auto shadow-lg border border-[#222]"
            />
          </div>
        )}

        {/* Sale urgency banner */}
        {product.saleLabel && product.salePriceCents && (
          <div className="mb-6 p-4 bg-[#8b0000] border border-[#a50000]">
            <p
              className="text-sm md:text-base font-bold text-[#e8e0d0] uppercase tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {product.slug === 'the-vault'
                ? `${product.saleLabel} — $${product.salePriceCents / 100}. Instant PDF archive. All sales final.`
                : `${product.saleLabel} — $${product.salePriceCents / 100} (Reg. ${product.originalPriceCents ? product.originalPriceCents / 100 : product.priceCents / 100}). This price does not hold.`}
            </p>
          </div>
        )}

        {/* Price + Quick Buy — visible immediately, no scrolling */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-[#111] border border-[#222]" style={{ borderLeft: '3px solid #8b0000' }}>
          <div className="flex-grow">
            <div className="flex items-baseline gap-3">
              {pricePrefix && (
                <span className="text-sm text-[#888] uppercase tracking-wide">{pricePrefix}</span>
              )}
              {product.salePriceCents ? (
                <>
                  <span className="text-xl text-[#777] line-through">{product.originalPriceCents ? `$${product.originalPriceCents / 100}` : priceDisplay}</span>
                  <span className="text-3xl md:text-4xl font-bold text-[#e8e0d0]">${product.salePriceCents / 100}</span>
                </>
              ) : (
                <span className="text-3xl md:text-4xl font-bold text-[#e8e0d0]">{priceDisplay}</span>
              )}
              {product.slug === 'the-vault' && (
                <span className="text-sm text-[#777] line-through">$1,500+</span>
              )}
              {product.isFree && (
                <span className="text-sm text-[#4ade80] font-bold uppercase">Free download</span>
              )}
            </div>
            {product.slug === 'how-to-study-bible' && (
              <p className="text-xs text-[#4ade80] font-bold mt-1">318 believers bought this</p>
            )}
            {product.slug === 'the-vault' && (
              <p className="text-xs text-[#4ade80] font-bold mt-1">76 resources — every field manual, one price</p>
            )}
            <p className="text-xs text-[#888] mt-1">
              {product.slug === 'the-vault'
                ? 'Instant PDF download. All sales final. Start with the $7 sampler if you are unsure.'
                : 'Instant PDF download. Buy once, keep forever.'}
            </p>
          </div>
          <div className="sm:w-48 flex-shrink-0">
            <BuyButton
              productSlug={product.slug}
              productName={product.name}
              priceLabel={product.priceLabel}
              isFree={product.isFree}
              isSubscription={false}
              ctaText={product.ctaText}
            />
          </div>
        </div>

        {/* Social Proof — moved to top for The Vault page */}
        {product.extendedContent?.socialProof && product.slug === 'the-vault' && (
          <div className="mb-12 bg-[#111] border border-[#8b0000]/30 p-6">
            <p className="text-base text-[#e8e0d0] font-bold leading-relaxed">
              {product.extendedContent.socialProof}
            </p>
          </div>
        )}

        {/* Full Description */}
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-base md:text-lg text-[#c0b8a8] leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>

        {/* Extended: Long Description — origin story (moved up for Vault) */}
        {product.extendedContent?.longDescription && (
          <div className="prose prose-invert max-w-none mb-12">
            {product.extendedContent.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-base md:text-lg text-[#c0b8a8] leading-relaxed mb-6">
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Extended: Who Is This For (if available) */}
        {product.extendedContent?.whoIsThisFor && (
          <div className="mb-12 border-t border-[#222] pt-12">
            <h2
              className="text-2xl uppercase font-bold text-[#e8e0d0] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              WHO THIS IS FOR
            </h2>
            <ul className="space-y-3 text-[#c0b8a8]">
              {product.extendedContent.whoIsThisFor.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#8b0000] font-bold flex-shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {product.slug === 'the-vault' && (
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="border border-[#222] bg-[#0d0d0d] p-5">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#e8e0d0]" style={{ fontFamily: 'var(--font-heading)' }}>
                    This is not for you if
                  </h3>
                  <ul className="space-y-3 text-sm text-[#aaa]">
                    <li>→ You want comfort. Buy a pillow.</li>
                    <li>→ You want three easy steps. Buy a magazine.</li>
                    <li>→ You want to collect PDFs and stay the same.</li>
                  </ul>
                </div>
                <div className="border border-[#8b0000]/40 bg-[#120d0d] p-5">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#e8e0d0]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Not ready for the full archive?
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#aaa]">
                    Start smaller. The $7 sampler lets you taste the arsenal. The $97 Essential Arsenal gives you the ten highest-impact field manuals.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link href="/store/vault-sampler" className="border border-[#333] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#e8e0d0] hover:border-[#8b0000]">
                      Taste the Vault — $7
                    </Link>
                    <Link href="/store/essential-arsenal" className="bg-[#8b0000] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#a50000]">
                      Deploy the 10 — $97
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* What's Inside */}
        <div className="mb-12 border-t border-[#222] pt-12">
          <h2
            className="text-2xl uppercase font-bold text-[#e8e0d0] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            WHAT&apos;S INSIDE
          </h2>
          <ul className="space-y-3 text-[#c0b8a8]">
            {product.extendedContent?.whatsInside ? (
              product.extendedContent.whatsInside.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#8b0000] font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))
            ) : product.isFree ? (
              <>
                <li className="flex gap-3">
                  <span className="text-[#8b0000] font-bold flex-shrink-0">✓</span>
                  <span>Instant download — no credit card required</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8b0000] font-bold flex-shrink-0">✓</span>
                  <span>PDF delivered directly to your email</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex gap-3">
                  <span className="text-[#8b0000] font-bold flex-shrink-0">✓</span>
                  <span>Instant digital download — PDF delivered to your email</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8b0000] font-bold flex-shrink-0">✓</span>
                  <span>Lifetime access — buy once, keep forever</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8b0000] font-bold flex-shrink-0">✓</span>
                  <span>Secure checkout via Stripe — PDF sent immediately</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Vault Value Stack — itemized pricing for every product (full Vault only) */}
        {product.slug === 'the-vault' && <VaultValueStack />}

        {/* Social Proof — for non-vault products (vault has it at top) */}
        {product.extendedContent?.socialProof && product.slug !== 'the-vault' && (
          <div className="mb-12 bg-[#111] border border-[#222] p-6">
            <p className="text-sm text-[#888] italic leading-relaxed">
              {product.extendedContent.socialProof}
            </p>
          </div>
        )}

        {/* Final Sale Trust Box — digital product clarity, not refund theater */}
        {product.slug === 'the-vault' && (
          <div className="mb-12 border border-[#8b0000]/40 bg-[#120d0d] p-6">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[#8b0000]">Final sale. Clear terms. No games.</div>
            <h2 className="mb-4 text-2xl uppercase font-bold text-[#e8e0d0]" style={{ fontFamily: 'var(--font-heading)' }}>
              Digital archive. Instant delivery. No refunds.
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[#aaa]">
              You get the full archive immediately after purchase. Because the files are delivered in full and can be downloaded instantly, all sales are final. If you are unsure, start with the $7 Vault Sampler or the $97 Essential Arsenal first. If there is a delivery or access problem, contact us and we will get your files to you.
            </p>
          </div>
        )}

        {/* FAQ Section */}
        {product.extendedContent?.faq && product.extendedContent.faq.length > 0 && (
          <ProductFAQ items={product.extendedContent.faq} />
        )}

        {/* Price and Buy Button */}
        <div className="border-t border-[#222] pt-12 mb-16">
          <div className="text-sm tracking-[0.12em] uppercase text-[#888] mb-3">
            {pricePrefix ? `${pricePrefix}`.toUpperCase() : 'PRICE'}
          </div>
          {product.salePriceCents ? (
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl text-[#777] line-through">{product.originalPriceCents ? `$${product.originalPriceCents / 100}` : priceDisplay}</span>
              <span className="text-5xl md:text-6xl font-bold text-[#e8e0d0]">${product.salePriceCents / 100}</span>
            </div>
          ) : (
            <div className="text-5xl md:text-6xl font-bold text-[#e8e0d0] mb-8">
              {priceDisplay}
            </div>
          )}

          <BuyButton
            productSlug={product.slug}
            productName={product.name}
            priceLabel={product.priceLabel}
            isFree={product.isFree}
            isSubscription={false}
            ctaText={product.ctaText}
          />

          {!product.isFree && (
            <p className="text-xs text-[#777] mt-4">
              Digital product. All sales are final.{' '}
              <Link href="/refund-policy" className="text-[#8b0000] underline hover:text-[#a50000]">
                Refund Policy
              </Link>
            </p>
          )}

          {/* Support phone number */}
          <p className="text-sm text-[#888] mt-4">
            Questions? Call{' '}
            <a href="tel:+17014144725" className="text-[#e8e0d0] font-bold">
              (701) 414-4725
            </a>
          </p>

          {/* Comparison line — objection-handling one-liner */}
          {product.comparisonLine && (
            <div className="mt-6 p-4 border-l-2 border-[#8b0000] bg-[#111]">
              <p className="text-sm text-[#888] italic leading-relaxed">
                {product.comparisonLine}
              </p>
            </div>
          )}

          {/* Not ready for the full Vault? — Essential Arsenal upsell */}
          {product.slug === 'the-vault' && (
            <div className="mt-8 p-6 border border-[#222] bg-[#111]">
              <p className="text-sm text-[#888] mb-2">Not ready for the full Vault?</p>
              <Link
                href="/store/essential-arsenal"
                className="text-[#8b0000] hover:text-[#e8e0d0] text-sm font-bold uppercase tracking-wide transition-colors"
              >
                GET THE ESSENTIAL ARSENAL — 10 CORE RESOURCES FOR $97 →
              </Link>
            </div>
          )}

          {/* Vault upsell on Essential Arsenal */}
          {product.slug === 'essential-arsenal' && (
            <div className="mt-8 p-6 border border-[#222] bg-[#111]">
              <p className="text-sm text-[#888] mb-2">Want everything?</p>
              <Link
                href="/store/the-vault"
                className="text-[#8b0000] hover:text-[#e8e0d0] text-sm font-bold uppercase tracking-wide transition-colors"
              >
                GET THE FULL VAULT — ALL 76 RESOURCES FOR $297 →
              </Link>
            </div>
          )}

          <ShareButtons
            url={`https://deadhidden.org/store/${product.slug}`}
            title={product.name}
            description={product.tagline}
          />
        </div>

        {/* Continue the Search */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#222] pt-12">
            <h3
              className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              CONTINUE THE SEARCH
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.slug}
                  href={`/store/${relatedProduct.slug}`}
                  className="border border-[#222] bg-[#111] p-4 hover:border-[#8b0000] transition-colors"
                >
                  <div className="text-xs tracking-[0.12em] uppercase text-[#777] mb-2">
                    {CATEGORIES[relatedProduct.category].label}
                  </div>
                  <h4
                    className="text-sm uppercase font-bold text-[#e8e0d0] mb-2 line-clamp-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {relatedProduct.name}
                  </h4>
                  <p className="text-xs text-[#888]">{relatedProduct.priceLabel.endsWith('+') ? relatedProduct.priceLabel.slice(0, -1) : relatedProduct.priceLabel}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        {/* Cross-Category: You Might Also Need */}
        {crossCategoryProducts.length > 0 && (
          <div className="border-t border-[#222] pt-12 mt-12">
            <h3
              className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              YOU MIGHT ALSO NEED
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {crossCategoryProducts.map((cp) => (
                <Link
                  key={cp.slug}
                  href={`/store/${cp.slug}`}
                  className="border border-[#222] bg-[#111] p-4 hover:border-[#8b0000] transition-colors"
                >
                  <div className="text-xs tracking-[0.12em] uppercase text-[#777] mb-2">
                    {CATEGORIES[cp.category].label}
                  </div>
                  <h4
                    className="text-sm uppercase font-bold text-[#e8e0d0] mb-2 line-clamp-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cp.name}
                  </h4>
                  <p className="text-xs text-[#888]">{cp.priceLabel.endsWith('+') ? cp.priceLabel.slice(0, -1) : cp.priceLabel}</p>
                </Link>
              ))}
            </div>

            {/* Link to category pillar page */}
            <div className="mt-6 text-center">
              <Link
                href={`/store/category/${product.category}`}
                className="text-xs tracking-[0.15em] uppercase text-[#8b0000] hover:text-[#e8e0d0] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                VIEW ALL {CATEGORIES[product.category].label} RESOURCES →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile buy bar */}
      <MobileProductCTA
        productSlug={product.slug}
        productName={product.name}
        priceLabel={product.priceLabel}
        salePriceCents={product.salePriceCents}
        originalPriceCents={product.originalPriceCents}
        isFree={product.isFree}
        ctaText={product.ctaText}
        showOnDesktop={product.slug === 'the-vault'}
      />
    </main>
  );
}
