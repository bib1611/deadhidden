import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BuyButton } from '@/components/BuyButton';
import { getProductBySlug } from '@/data/products';

const SAMPLE_CHAPTER_URL =
  'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/wars-and-rumors-ch5-preview.pdf';

export const metadata: Metadata = {
  title: 'Wars and Rumors of Wars | Dead Hidden',
  description:
    'A comprehensive Bible study on Revelation and Daniel\'s 70th Week. Twelve chapters. Ninety-three pages. Built from the text up.',
  openGraph: {
    title: 'Wars and Rumors of Wars | Dead Hidden',
    description:
      'Revelation, Daniel\'s 70th Week, the Antichrist system, the second coming, and the millennial kingdom — handled from the King James Bible.',
    url: 'https://deadhidden.org/wars-and-rumors-of-wars',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wars and Rumors of Wars | Dead Hidden',
    description:
      'A comprehensive Bible study on Revelation and Daniel\'s 70th Week. Built from the text up.',
  },
  alternates: {
    canonical: 'https://deadhidden.org/wars-and-rumors-of-wars',
  },
};

const chapters = [
  'Chapter 1: The Seventy Weeks Prophecy (Daniel 9:24-27)',
  'Chapter 2: The Gap Theory of Daniel\'s 70th Week',
  'Chapter 3: The Times of the Gentiles',
  'Chapter 4: The Fig Tree Generation (Matthew 24)',
  'Chapter 5: The War Behind the War (Daniel 10)',
  'Chapter 6: The Rapture Doctrine (1 Thessalonians 4-5)',
  'Chapter 7: The Tribulation Timeline (Revelation 6-19)',
  'Chapter 8: The Antichrist Profile',
  'Chapter 9: The Mark of the Beast System',
  'Chapter 10: The Two Witnesses (Revelation 11)',
  'Chapter 11: The Second Coming (Revelation 19)',
  'Chapter 12: The Millennial Kingdom',
];

export default function WarsAndRumorsPage() {
  const product = getProductBySlug('wars-and-rumors-of-wars');

  if (!product || !product.extendedContent) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <section className="pt-32 md:pt-40 pb-16 px-4 sm:px-6 max-w-[900px] mx-auto text-center">
        <div
          className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-medium mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Dead Hidden Ministries
        </div>
        <div
          className="inline-block text-[10px] tracking-[0.15em] uppercase text-[#8b0000] border border-[#8b0000] px-4 py-1.5 mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Available Now
        </div>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl uppercase font-bold text-[#e8e0d0] mb-6 leading-[1.1] tracking-[0.04em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {product.name}
        </h1>
        <p className="text-lg text-[#c0b8a8] max-w-[680px] mx-auto mb-10 leading-relaxed">
          {product.tagline}
        </p>

        <div className="max-w-[320px] mx-auto mb-4">
          <BuyButton
            productSlug={product.slug}
            productName={product.name}
            priceLabel={product.priceLabel}
            isFree={product.isFree}
            isSubscription={false}
            ctaText={product.ctaText}
          />
        </div>
        <p className="text-sm text-[#777]">
          Instant PDF delivery. One purchase. Keep it forever.
        </p>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      <section className="py-16 px-4 sm:px-6 max-w-[900px] mx-auto">
        <div className="bg-[#111] border-l-[3px] border-[#8b0000] p-8">
          <p className="italic text-[#c0b8a8] text-lg leading-[1.8]">
            &ldquo;For we wrestle not against flesh and blood, but against principalities,
            against powers, against the rulers of the darkness of this world, against
            spiritual wickedness in high places.&rdquo;
          </p>
          <cite
            className="block mt-4 not-italic text-xs tracking-[0.1em] uppercase text-[#888]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ephesians 6:12 — KJV
          </cite>
        </div>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      <section className="py-16 px-4 sm:px-6 max-w-[900px] mx-auto">
        <div
          className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] font-medium mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          What This Guide Does
        </div>
        <h2
          className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          The War You Can&apos;t See Explains the One You Can
        </h2>
        {product.extendedContent.longDescription?.split('\n\n').map((para, index) => (
          <p key={index} className="text-[#c0b8a8] leading-[1.8] mb-6">
            {para}
          </p>
        ))}
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      <section className="py-16 px-4 sm:px-6 max-w-[900px] mx-auto">
        <div
          className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] font-medium mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Who This Is For
        </div>
        <h2
          className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Men Who Want the Full Picture
        </h2>
        <ul className="flex flex-col gap-4">
          {product.extendedContent.whoIsThisFor.map((item, index) => (
            <li key={index} className="text-[#c0b8a8] pl-6 relative">
              <span className="absolute left-0 text-[#8b0000]">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      <section className="py-16 px-4 sm:px-6 max-w-[900px] mx-auto">
        <div
          className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] font-medium mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          What&apos;s Inside
        </div>
        <h2
          className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          12 Chapters. 93 Pages.
        </h2>
        <ul className="flex flex-col gap-3">
          {chapters.map((chapter, index) => (
            <li
              key={index}
              className="flex items-start gap-3 bg-[#111] border border-[#222] px-4 py-3 text-[#c0b8a8] text-[15px]"
            >
              <span className="text-[#8b0000] font-semibold shrink-0 mt-px">✓</span>
              <span>{chapter}</span>
            </li>
          ))}
          <li className="flex items-start gap-3 bg-[#111] border border-[#222] px-4 py-3 text-[#888] text-[15px]">
            <span className="font-semibold shrink-0 mt-px">+</span>
            <span>Part 2 teaser: the scope of Revelation and what comes after the thousand years</span>
          </li>
        </ul>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      <section className="py-16 px-4 sm:px-6 max-w-[900px] mx-auto">
        <div
          className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] font-medium mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Sample the Argument
        </div>
        <h2
          className="text-2xl uppercase font-bold text-[#e8e0d0] mb-6 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Read Chapter 5 Free
        </h2>
        <p className="text-[#c0b8a8] leading-[1.8] mb-8">
          Daniel 10 is the spine of the whole framework: God answered on day one, but the
          messenger was held in warfare for twenty-one days. If you want to see how the guide
          handles the text before you buy it, start there.
        </p>
        <a
          href={SAMPLE_CHAPTER_URL}
          download
          className="inline-flex items-center justify-center gap-2 border border-[#222] text-[#e8e0d0] px-8 py-3 text-sm tracking-[0.1em] uppercase font-medium hover:border-[#8b0000] hover:bg-[#8b0000]/10 transition-all"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Download Chapter 5 →
        </a>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      <section className="py-16 px-4 sm:px-6 max-w-[900px] mx-auto text-center">
        <div
          className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] font-medium mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Ready to Go Deeper
        </div>
        <h2
          className="text-2xl uppercase font-bold text-[#e8e0d0] mb-4 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Take the Full Guide
        </h2>
        <p className="text-[#c0b8a8] leading-[1.8] max-w-[560px] mx-auto mb-8">
          Revelation does not need more noise. It needs men who can read the structure,
          hold the timeline, and stop borrowing conviction from other men&apos;s charts.
        </p>
        <div className="max-w-[320px] mx-auto mb-4">
          <BuyButton
            productSlug={product.slug}
            productName={product.name}
            priceLabel={product.priceLabel}
            isFree={product.isFree}
            isSubscription={false}
            ctaText={product.ctaText}
          />
        </div>
        <div className="mt-6">
          <Link
            href="/store/wars-and-rumors-of-wars"
            className="text-xs tracking-[0.1em] uppercase text-[#888] hover:text-[#e8e0d0] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            View the store page
          </Link>
        </div>
      </section>
    </main>
  );
}
