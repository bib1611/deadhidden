import type { Metadata } from 'next';
import Link from 'next/link';
import { discoveryCategories } from '@/data/discovery';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Where to Begin — Dead Hidden',
  description:
    'You just found this place. You have no idea who we are. Good. Here is where you start — whether you came from a tweet, a Substack, or a search you ran at 2am.',
  openGraph: {
    title: 'Where to Begin — Dead Hidden',
    description: 'You just found this place. Here is where you start.',
    url: 'https://deadhidden.org/where-to-begin',
    images: [
      {
        url: 'https://deadhidden.org/api/og?title=Where+to+Begin&subtitle=You+Just+Found+This+Place',
        width: 1200,
        height: 630,
        alt: 'Dead Hidden — Where to Begin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where to Begin — Dead Hidden',
    description: 'You just found this place. Here is where you start.',
    creator: '@Biblicalman',
  },
  alternates: {
    canonical: 'https://deadhidden.org/where-to-begin',
  },
};

export default function WhereToBeginPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero — for cold traffic */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-8">
            YOU JUST FOUND THIS PLACE.
          </h1>

          <p className="text-lg text-muted leading-relaxed mb-6">
            This is not a church website. This is not a brand. This is where Christians go when the performance stops working and they need someone who will tell them the truth.
          </p>

          <p className="text-lg text-muted leading-relaxed">
            If you&apos;ve been checking every box and still feel dead inside — you&apos;re in the right place.
          </p>

          {/* Path Selector CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/store/biblical-man-field-manual"
              className="flex-1 text-center px-8 py-5 bg-[#111] border-2 border-[#8b0000] text-white font-oswald text-lg md:text-xl tracking-wider font-bold hover:bg-[#8b0000] transition-colors"
            >
              I&apos;M A MAN →
            </Link>
            <Link
              href="/for-women"
              className="flex-1 text-center px-8 py-5 bg-[#111] border-2 border-[#8b0000] text-white font-oswald text-lg md:text-xl tracking-wider font-bold hover:bg-[#8b0000] transition-colors"
            >
              I&apos;M A WOMAN →
            </Link>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="pb-16 md:pb-20 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto pt-16">
          <h2 className="font-oswald text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-wide">
            WHO IS THIS FOR
          </h2>

          <div className="space-y-6">
            <p className="text-muted leading-relaxed">
              <strong className="text-foreground">The man</strong> who has been performing faithfulness for years. Leading the prayer. Tithing the check. Saying the right words at the men&apos;s breakfast. And the whole time something inside him knows it&apos;s hollow. He can&apos;t name it. He just knows the fire went out and nobody noticed.
            </p>

            <p className="text-muted leading-relaxed">
              <strong className="text-foreground">The woman</strong> who did everything right. Submitted. Served. Stayed quiet when she should have spoken. Spoke when she was told to be silent. She has been bleeding in the pew for years and the only counsel she gets is &ldquo;pray harder.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Where to start — 3 entry points */}
      <section className="pb-16 md:pb-20 px-4 border-t border-border bg-card">
        <div className="max-w-3xl mx-auto pt-16">
          <h2 className="font-oswald text-2xl md:text-3xl font-bold text-foreground mb-10 tracking-wide">
            WHERE TO START
          </h2>

          <div className="space-y-6">
            {/* Entry 1: From a tweet */}
            <a
              href="/#three-alibis"
              className="block border border-border p-6 hover:border-blood transition-colors group"
            >
              <p className="text-xs tracking-[0.2em] text-blood uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                IF YOU JUST FOUND THIS FROM A TWEET
              </p>
              <p className="font-oswald text-lg font-bold text-foreground group-hover:text-blood transition-colors mb-2">
                Get the free PDF — The Three Alibis
              </p>
              <p className="text-sm text-muted">
                Each of us runs one. Most of us have never named it. Free. No strings. Start here.
              </p>
            </a>

            {/* Entry 2: For men */}
            <div className="border border-border p-6">
              <p className="text-xs tracking-[0.2em] text-blood uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                IF YOU&apos;RE A MAN
              </p>
              <p className="font-oswald text-lg font-bold text-foreground mb-2">
                The Biblical Man
              </p>
              <p className="text-sm text-muted mb-4">
                Biblical masculinity without the soft church filter. Marriage. Headship. The daily frontline. 45,000 men read this.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://open.substack.com/pub/thebiblicalman?r=2t2o3r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs uppercase tracking-[0.15em] text-blood hover:text-foreground transition-colors font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  READ THE SUBSTACK →
                </a>
                <Link
                  href="/store/biblical-man-field-manual"
                  className="inline-block text-xs uppercase tracking-[0.15em] text-blood hover:text-foreground transition-colors font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  GET THE FIELD MANUAL →
                </Link>
              </div>
            </div>

            {/* Entry 3: For women */}
            <div className="border border-border p-6">
              <p className="text-xs tracking-[0.2em] text-blood uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                IF YOU&apos;RE A WOMAN
              </p>
              <p className="font-oswald text-lg font-bold text-foreground mb-2">
                Biblical Womanhood
              </p>
              <p className="text-sm text-muted mb-4">
                God&apos;s design for women — without the feminist filter and without the guilt trip. Written by Christie, who has lived it for 24 years. 29,000 women read this.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://open.substack.com/pub/biblicalwomanhood?r=2t2o3r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs uppercase tracking-[0.15em] text-blood hover:text-foreground transition-colors font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  READ THE SUBSTACK →
                </a>
                <Link
                  href="/store/biblical-woman-field-manual"
                  className="inline-block text-xs uppercase tracking-[0.15em] text-blood hover:text-foreground transition-colors font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  GET THE FIELD MANUAL →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Dead Hidden */}
      <section className="pb-16 md:pb-20 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto pt-16">
          <h2 className="font-oswald text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-wide">
            WHAT IS DEAD HIDDEN
          </h2>

          <div className="space-y-4">
            <p className="text-muted leading-relaxed">
              A man who drove garbage trucks and conducted trains started writing about what the Bible actually says. His wife started writing about what it means to be a woman under God&apos;s design — not the culture&apos;s version of it. They have five children, 24 years of marriage, and 17 straight years teaching Sunday School.
            </p>

            <p className="text-muted leading-relaxed">
              None of this came from a seminary classroom. It came from the fire. From the 3am arguments. From the seasons where obedience felt like bleeding out and nobody clapped.
            </p>

            <p className="text-muted leading-relaxed italic">
              &ldquo;For there is nothing hid, which shall not be manifested; neither was any thing kept secret, but that it should come abroad.&rdquo;
              <span className="text-blood not-italic text-sm ml-2">— Mark 4:22 (KJV)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Category Grid — same as before */}
      <section className="pb-16 md:pb-20 px-4 border-t border-border bg-card">
        <div className="max-w-3xl mx-auto pt-16">
          <h2 className="font-oswald text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-wide">
            PICK YOUR BATTLE
          </h2>
          <p className="text-sm text-muted mb-8">
            76 resources. Every category has a free starting point.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
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
                  className="group block border border-border p-6 hover:border-blood transition-colors"
                >
                  <h3 className="font-oswald text-sm md:text-base font-bold text-foreground group-hover:text-blood transition-colors mb-2 tracking-wide uppercase">
                    {cat.headline}
                  </h3>
                  <p className="text-xs text-muted mb-3 leading-relaxed">
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
