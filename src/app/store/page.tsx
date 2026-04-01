'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, CATEGORIES, getProductsByCategory, type Category } from '@/data/products';

function StoreContent() {
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
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedProducts.map((product) => (
            <div
              key={product.slug}
              className="border border-[#222] bg-[#111] p-6 flex flex-col h-full"
            >
              {/* Category Badge */}
              <div className="text-xs tracking-[0.12em] uppercase text-[#555] mb-3">
                {CATEGORIES[product.category].label}
              </div>

              {/* Title */}
              <h2
                className="text-lg md:text-xl uppercase font-bold text-[#e8e0d0] mb-3 line-clamp-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-[#888] line-clamp-3 mb-4 flex-grow">
                {product.tagline}
              </p>

              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.category === 'vault' && (
                  <span className="text-xs px-3 py-1 bg-[#8b0000] text-[#e8e0d0] tracking-[0.1em] uppercase">
                    FULL ACCESS
                  </span>
                )}
                {product.isFree && (
                  <span className="text-xs px-3 py-1 bg-[#2d5a2d] text-[#b8d9b8] tracking-[0.1em] uppercase">
                    DECLASSIFIED
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                {product.isFree ? (
                  <span className="text-lg font-semibold text-[#5cb85c]">FREE</span>
                ) : (
                  <span className="text-lg font-semibold text-[#e8e0d0]">{product.priceLabel}</span>
                )}
              </div>

              {/* CTA Link */}
              <Link
                href={`/store/${product.slug}`}
                className="text-sm tracking-[0.15em] uppercase font-semibold text-[#e8e0d0] hover:text-[#8b0000] transition-colors"
              >
                ACCESS →
              </Link>
            </div>
          ))}
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
