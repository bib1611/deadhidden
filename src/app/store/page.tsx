'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, CATEGORIES, getProductsByCategory, type Category } from '@/data/products';
import { useScrollDepth } from '@/hooks/useScrollDepth';

function StoreContent() {
  useScrollDepth('/store');
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || undefined;
  const [activeCategory, setActiveCategory] = useState<Category | undefined>(initialCategory);

  const categoryList = ['all' as const, ...Object.keys(CATEGORIES) as Category[]];
  const displayedProducts = activeCategory ? getProductsByCategory(activeCategory) : products;
  const productCount = displayedProducts.length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            RESTRICTED ACCESS
          </div>
          <h1
            className="text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0] mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            THE ARCHIVE
          </h1>

          {/* Category Filter Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categoryList.map((cat) => {
              const isAll = cat === 'all';
              const isActive = isAll ? !activeCategory : activeCategory === cat;
              const label = isAll ? 'ALL' : CATEGORIES[cat as Category].label;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isAll ? undefined : (cat as Category))}
                  className={`px-4 py-2 text-xs tracking-[0.12em] uppercase whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#8b0000] text-[#e8e0d0]'
                      : 'border border-[#222] text-[#888] hover:text-[#e8e0d0]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Product Count */}
          <div className="mt-6 text-sm tracking-[0.1em] uppercase text-[#888]">
            {productCount} DOCUMENTS FOUND
          </div>
        </div>

        {/* Product Grid — every card is fully clickable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/store/${product.slug}`}
              className="border border-[#222] bg-[#111] p-6 flex flex-col h-full hover:border-[#8b0000] transition-colors group"
            >
              {/* Top row: Category + Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs tracking-[0.12em] uppercase text-[#777]">
                  {CATEGORIES[product.category].label}
                </div>
                {product.saleLabel ? (
                  <span className="text-xs px-2 py-0.5 bg-[#8b0000] text-[#e8e0d0] tracking-[0.1em] uppercase font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {product.saleLabel}
                  </span>
                ) : product.category === 'vault' ? (
                  <span className="text-xs px-2 py-0.5 bg-[#8b0000]/20 text-[#a50000] tracking-[0.1em] uppercase font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    FULL ACCESS
                  </span>
                ) : product.isFree ? (
                  <span className="text-xs px-2 py-0.5 bg-[#1a3a1a] text-[#4ade80] tracking-[0.1em] uppercase font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    FREE
                  </span>
                ) : product.slug === 'how-to-study-bible' ? (
                  <span className="text-xs px-2 py-0.5 bg-[#1a3a1a] text-[#4ade80] tracking-[0.1em] uppercase font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    MOST POPULAR
                  </span>
                ) : null}
              </div>

              {/* Title */}
              <h2
                className="text-lg md:text-xl uppercase font-bold text-[#e8e0d0] mb-2 line-clamp-2 group-hover:text-[#8b0000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-[#888] line-clamp-2 mb-4 flex-grow">
                {product.tagline}
              </p>

              {/* Price + CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-[#222]">
                {product.isFree ? (
                  <span className="text-lg font-bold text-[#4ade80]">FREE</span>
                ) : product.salePriceCents ? (
                  <span className="flex items-baseline gap-2">
                    <span className="text-sm text-[#777] line-through">${product.originalPriceCents ? product.originalPriceCents / 100 : product.priceCents / 100}</span>
                    <span className="text-lg font-bold text-[#e8e0d0]">${product.salePriceCents / 100}</span>
                  </span>
                ) : (
                  <span className="text-lg font-bold text-[#e8e0d0]">{product.priceLabel.endsWith('+') ? product.priceLabel.slice(0, -1) : product.priceLabel}</span>
                )}
                <span
                  className="text-xs tracking-[0.15em] uppercase font-bold text-[#8b0000] group-hover:text-[#e8e0d0] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {product.isFree ? 'DOWNLOAD →' : 'VIEW →'}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse by Category — SEO internal links */}
        <div className="mt-16 border-t border-[#222] pt-16">
          <h2
            className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            BROWSE BY CATEGORY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(CATEGORIES) as Category[]).map((cat) => {
              const catProducts = getProductsByCategory(cat);
              return (
                <Link
                  key={cat}
                  href={`/store/category/${cat}`}
                  className="border border-[#222] bg-[#111] p-6 hover:border-[#8b0000] transition-colors"
                >
                  <div className="text-xs tracking-[0.12em] uppercase text-[#8b0000] mb-2">
                    {catProducts.length} RESOURCES
                  </div>
                  <h3
                    className="text-lg uppercase font-bold text-[#e8e0d0] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {CATEGORIES[cat].label}
                  </h3>
                  <p className="text-sm text-[#888]">{CATEGORIES[cat].description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            RESTRICTED ACCESS
          </div>
          <h1
            className="text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0] mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            THE ARCHIVE
          </h1>
          <div className="text-sm text-[#888]">Loading documents...</div>
        </div>
      </main>
    }>
      <StoreContent />
    </Suspense>
  );
}
