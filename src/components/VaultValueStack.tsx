import { products, CATEGORIES, type Category } from '@/data/products';

export default function VaultValueStack() {
  const excludeSlugs = new Set([
    'the-vault',
    'vault-sampler',
    'essential-arsenal',
    'thanksgiving-marriage-vault',
    'the-table',
    'wars-and-rumors-of-wars',
    'warrior-bundle',
  ]);

  const filteredProducts = products.filter(
    (product) => !excludeSlugs.has(product.slug) && product.priceCents > 0
  );

  const categoryOrder: Category[] = [
    'marriage-family',
    'parenting',
    'bible-study',
    'spiritual-warfare',
    'masculinity',
    'women',
  ];

  const groupedByCategory = categoryOrder.reduce(
    (acc, category) => {
      const categoryProducts = filteredProducts.filter(
        (p) => p.category === category
      );
      if (categoryProducts.length > 0) {
        acc[category] = categoryProducts;
      }
      return acc;
    },
    {} as Record<Category, typeof products>
  );

  let grandTotal = 0;
  const categoryTotals: Record<string, number> = {};

  Object.entries(groupedByCategory).forEach(([category, prods]) => {
    const categoryTotal = prods.reduce((sum, p) => sum + p.priceCents, 0);
    categoryTotals[category] = categoryTotal;
    grandTotal += categoryTotal;
  });

  const discountPrice = 36500;
  const savingsAmount = grandTotal - discountPrice;
  const discountPercent = Math.round((savingsAmount / grandTotal) * 100);

  const fmt = (cents: number) => {
    const d = cents / 100;
    return d % 1 === 0 ? `$${d}` : `$${d.toFixed(2)}`;
  };

  return (
    <div className="mb-12 border-t border-[#222] pt-12">
      <h2
        className="text-2xl uppercase font-bold text-[#e8e0d0] mb-2"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        WHAT YOU&apos;RE GETTING
      </h2>
      <p className="text-sm text-[#888] mb-8">
        Every resource. Every manual. Every protocol. Individually priced.
      </p>

      <div className="border border-[#222] bg-[#0d0d0d]">
        {categoryOrder.map((category) => {
          const categoryProducts = groupedByCategory[category];
          if (!categoryProducts) return null;
          const categoryTotal = categoryTotals[category];

          return (
            <div
              key={category}
              className="border-b border-[#1a1a1a] last:border-b-0"
            >
              {/* Category header */}
              <div className="flex items-center justify-between px-6 py-3 bg-[#111]">
                <h3
                  className="text-xs uppercase tracking-[0.15em] text-[#8b0000] font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {CATEGORIES[category].label}
                </h3>
                <span className="text-xs text-[#777]">
                  {fmt(categoryTotal)} value
                </span>
              </div>

              {/* Product rows */}
              <div className="divide-y divide-[#151515]">
                {categoryProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="flex items-center justify-between px-6 py-2.5"
                  >
                    <span className="text-sm text-[#c0b8a8] pr-4">
                      {product.name}
                    </span>
                    <span className="text-sm text-[#888] flex-shrink-0 tabular-nums">
                      {fmt(product.priceCents)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Total section */}
        <div className="px-6 py-8 bg-[#111] border-t border-[#222]">
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-sm uppercase tracking-[0.12em] text-[#888]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              TOTAL IF PURCHASED SEPARATELY
            </span>
            <span className="text-2xl text-[#888] line-through tabular-nums">
              {fmt(grandTotal)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span
              className="text-sm uppercase tracking-[0.12em] text-[#e8e0d0] font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              THE VAULT PRICE
            </span>
            <span className="text-4xl font-bold text-[#8b0000] tabular-nums">
              $365
            </span>
          </div>

          <div className="mt-4 text-center">
            <span
              className="inline-block px-4 py-2 border border-[#8b0000] text-[#8b0000] text-xs uppercase tracking-[0.2em] font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              SAVE {discountPercent}% — THAT&apos;S {fmt(savingsAmount)} BACK IN YOUR POCKET
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
