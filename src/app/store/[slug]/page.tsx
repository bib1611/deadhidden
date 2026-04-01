import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, CATEGORIES, getProductsByCategory, getProductBySlug } from '@/data/products';
import { BuyButton } from '@/components/BuyButton';

// Generate static params from all product slugs for SSG
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Breadcrumb */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto text-xs tracking-[0.1em] uppercase text-[#888]">
          <Link href="/store" className="hover:text-[#e8e0d0] transition-colors">
            THE ARCHIVE
          </Link>
          <span className="mx-2 text-[#555]">/</span>
          <span>{CATEGORIES[product.category].label}</span>
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

        {/* What's Inside */}
        <div className="mb-12 border-t border-[#222] pt-12">
          <h2
            className="text-2xl uppercase font-bold text-[#e8e0d0] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            WHAT'S INSIDE
          </h2>
          <ul className="space-y-3 text-[#c0b8a8]">
            {product.isFree ? (
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
      </div>
    </main>
  );
}
