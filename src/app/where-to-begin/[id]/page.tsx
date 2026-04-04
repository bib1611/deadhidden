import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { discoveryCategories } from '@/data/discovery';
import { products } from '@/data/products';

export function generateStaticParams() {
  return discoveryCategories.map((cat) => ({ id: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cat = discoveryCategories.find((c) => c.id === id);
  if (!cat) return {};
  return {
    title: `${cat.shortName} — Where to Begin`,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cat = discoveryCategories.find((c) => c.id === id);
  if (!cat) notFound();

  const categoryProducts = cat.productSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  const startProduct = products.find((p) => p.slug === cat.startHere);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/where-to-begin"
            className="text-sm text-muted hover:text-foreground transition-colors mb-8 inline-block"
          >
            ← Back to Where to Begin
          </Link>

          <h1 className="font-oswald text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            {cat.headline}
          </h1>
          <p className="text-lg text-muted mb-12 leading-relaxed max-w-2xl">
            {cat.description}
          </p>

          {/* Reading Path */}
          <div className="border border-blood bg-[#1a0000] p-6 mb-12">
            <p className="text-sm text-blood font-oswald uppercase tracking-widest mb-2">
              RECOMMENDED PATH
            </p>
            <p className="text-foreground leading-relaxed">
              {cat.entryPoint}
            </p>
          </div>

          {/* Start Here callout */}
          {startProduct && (
            <div className="mb-12">
              <p className="text-xs text-muted uppercase tracking-widest mb-4 font-oswald">
                START HERE
              </p>
              <Link
                href={`/store/${startProduct.slug}`}
                className="block border-2 border-blood bg-card p-6 hover:bg-[#1a0000] transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-oswald text-lg font-bold text-foreground group-hover:text-blood transition-colors">
                    {startProduct.name}
                  </h3>
                  <span className={`text-sm font-bold ${startProduct.isFree ? 'text-blood' : 'text-foreground'}`}>
                    {startProduct.isFree ? 'FREE' : (startProduct.priceLabel.endsWith('+') ? startProduct.priceLabel.slice(0, -1) : startProduct.priceLabel)}
                  </span>
                </div>
                <p className="text-sm text-muted">{startProduct.tagline}</p>
              </Link>
            </div>
          )}

          {/* All products in this category */}
          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-6 font-oswald">
              ALL RESOURCES IN THIS TOPIC
            </p>
            <div className="grid gap-4">
              {categoryProducts.map((product) => {
                if (!product || product.slug === cat.startHere) return null;
                return (
                  <Link
                    key={product.slug}
                    href={`/store/${product.slug}`}
                    className="flex items-center justify-between border border-border bg-card p-5 hover:border-blood transition-colors group"
                  >
                    <div className="mr-4">
                      <h3 className="font-oswald text-sm font-bold text-foreground group-hover:text-blood transition-colors tracking-wide">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted mt-1">{product.tagline}</p>
                    </div>
                    <span className={`text-sm font-bold whitespace-nowrap ${product.isFree ? 'text-blood' : 'text-foreground'}`}>
                      {product.isFree ? 'FREE' : (product.priceLabel.endsWith('+') ? product.priceLabel.slice(0, -1) : product.priceLabel)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Vault CTA */}
          <div className="mt-16 text-center border-t border-border pt-12">
            <p className="text-muted mb-4 text-sm">
              Want every resource on every topic?
            </p>
            <Link
              href="/store/the-vault"
              className="inline-block px-8 py-4 bg-blood text-white font-oswald tracking-wider hover:bg-blood-bright transition-colors"
            >
              GET THE VAULT — ALL 50+ RESOURCES
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
