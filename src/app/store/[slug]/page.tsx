import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, CATEGORIES, getProductsByCategory, getProductBySlug, type Category } from '@/data/products';
import { BuyButton } from '@/components/BuyButton';
import { ProductJsonLd } from '@/components/JsonLd';

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

  return {
    title: `${product.name} | Dead Hidden`,
    description: product.description.substring(0, 160),
    keywords: product.seoKeywords || [],
    openGraph: {
      title: product.name,
      description: product.tagline,
      url: `https://deadhidden.org/store/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: product.name,
      description: product.tagline,
    },
    alternates: {
      canonical: `https://deadhidden.org/store/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

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
          <span className="mx-2 text-[#555]">/</span>
          <Link href={`/store/category/${product.category}`} className="hover:text-[#e8e0d0] transition-colors">
            {CATEGORIES[product.category].label}
          </Link>
          <span className="mx-2 text-[#555]">/</span>
          <span className="text-[#e8e0d0]">{product.name}</span>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold text-[#e8e0d0] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {product.name}
        </h1>

        {/* Category Badge */}
        <div className="text-xs tracking-[0.12em] uppercase text-[#555] mb-8">
          {CATEGORIES[product.category].label}
        </div>

        {/* Full Description */}
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-base md:text-lg text-[#c0b8a8] leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>

        {/* Extended: Long Description (if available) */}
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

        {/* Extended: Social Proof (if available) */}
        {product.extendedContent?.socialProof && (
          <div className="mb-12 bg-[#111] border border-[#222] p-6">
            <p className="text-sm text-[#888] italic leading-relaxed">
              {product.extendedContent.socialProof}
            </p>
          </div>
        )}

        {/* Price and Buy Button */}
        <div className="border-t border-[#222] pt-12 mb-16">
          <div className="text-sm tracking-[0.12em] uppercase text-[#888] mb-3">
            PRICE
          </div>
          <div className="text-5xl md:text-6xl font-bold text-[#e8e0d0] mb-8">
            {product.priceLabel}
          </div>

          <BuyButton
            productSlug={product.slug}
            priceLabel={product.priceLabel}
            isFree={product.isFree}
            isSubscription={false}
          />

          {!product.isFree && (
            <p className="text-xs text-[#555] mt-4">
              Digital product. All sales are final.{' '}
              <Link href="/refund-policy" className="text-[#8b0000] underline hover:text-[#a50000]">
                Refund Policy
              </Link>
            </p>
          )}
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
                  <div className="text-xs tracking-[0.12em] uppercase text-[#555] mb-2">
                    {CATEGORIES[relatedProduct.category].label}
                  </div>
                  <h4
                    className="text-sm uppercase font-bold text-[#e8e0d0] mb-2 line-clamp-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {relatedProduct.name}
                  </h4>
                  <p className="text-xs text-[#888]">{relatedProduct.priceLabel}</p>
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
                  <div className="text-xs tracking-[0.12em] uppercase text-[#555] mb-2">
                    {CATEGORIES[cp.category].label}
                  </div>
                  <h4
                    className="text-sm uppercase font-bold text-[#e8e0d0] mb-2 line-clamp-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cp.name}
                  </h4>
                  <p className="text-xs text-[#888]">{cp.priceLabel}</p>
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
    </main>
  );
}
