import type { Metadata } from 'next';
import Link from 'next/link';
import { discoveryCategories } from '@/data/discovery';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Where to Begin — Find Exactly What You Need',
  description:
    'Not sure where to start? Pick your battle. Biblical masculinity, marriage, spiritual warfare, parenting, Bible study, and more. Free starting points for every topic.',
  openGraph: {
    title: 'Where to Begin — Dead Hidden',
    description: 'Pick your battle. Find exactly the resource you need.',
  },
};

export default function WhereToBeginPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            WHERE TO BEGIN
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            50+ resources. Pick your battle. Every category has a free starting
            point so you can see what you&apos;re getting into before you spend
            a dime.
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          {discoveryCategories.map((cat) => {
            const startProduct = products.find((p) => p.slug === cat.startHere);
            const totalProducts = cat.productSlugs.length;
            const freeCount = cat.productSlugs.filter((s) => {
              const p = products.find((pr) => pr.slug === s);
              return p?.isFree;
            }).length;

            return (
              <Link
                key={cat.id}
                href={`/where-to-begin/${cat.id}`}
                className="group block border border-border bg-card p-8 hover:border-blood transition-colors"
              >
                <h2 className="font-oswald text-xl md:text-2xl font-bold text-foreground group-hover:text-blood transition-colors mb-3 tracking-wide">
                  {cat.headline}
                </h2>
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-subtle">
                  <span>{totalProducts} resources</span>
                  {freeCount > 0 && (
                    <span className="text-blood font-semibold">
                      {freeCount} FREE
                    </span>
                  )}
                  {startProduct && (
                    <span className="ml-auto text-muted group-hover:text-foreground transition-colors">
                      Start here →
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-4">
        <div className="max-w-2xl mx-auto text-center border-t border-border pt-16">
          <p className="text-muted mb-6">
            Already know you want everything?
          </p>
          <Link
            href="/store/the-vault"
            className="inline-block px-8 py-4 bg-blood text-white font-oswald text-lg tracking-wider hover:bg-blood-bright transition-colors"
          >
            GET THE VAULT — ALL 50+ RESOURCES
          </Link>
        </div>
      </section>
    </main>
  );
}
