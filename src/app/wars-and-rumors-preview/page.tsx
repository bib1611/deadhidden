import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wars and Rumors of Wars — Free Chapter Preview',
  description:
    'Download Chapter 5 free: The War Behind the War. Daniel 10, territorial spirits, and the invisible hierarchy behind every nation.',
  openGraph: {
    title: 'Wars and Rumors of Wars — Free Chapter 5',
    description:
      'The war you keep watching on the news is not the real war. Download Chapter 5 free.',
    url: 'https://deadhidden.org/wars-and-rumors-preview',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wars and Rumors of Wars — Free Chapter 5',
    description:
      'Daniel 10. Territorial spirits. The invisible hierarchy behind every nation. Chapter 5 is free.',
  },
};

const PDF_URL =
  'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/wars-and-rumors-ch5-preview.pdf';
const PREORDER_URL = 'https://buy.stripe.com/6oU3cw9bS1swgwKaRxc3m00';
const DONATE_10 = 'https://buy.stripe.com/3cI14o2Nudbe80ecZFc3m01';
const DONATE_25 = 'https://buy.stripe.com/6oUeVebk0b36gwKbVBc3m03';
const DONATE_50 = 'https://buy.stripe.com/bJedRa4VC7QU1BQ6Bhc3m02';

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

const whoFor = [
  'Men studying Revelation and Daniel who want the text handled with precision, not speculation',
  'Men who sense the prophetic clock is moving and want to understand the architecture behind it',
  'Men who are done with surface-level end-times content built from headlines instead of Scripture',
  'Men who believe Ephesians 6:12 is structural, not motivational',
  'Pastors and teachers who need a verse-by-verse framework they can teach from',
];

export default function WarsPreviewPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
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
          Free Chapter Preview
        </div>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl uppercase font-bold text-[#e8e0d0] mb-6 leading-[1.1] tracking-[0.04em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Wars and Rumors of Wars
        </h1>
        <p className="text-lg text-[#c0b8a8] max-w-[600px] mx-auto mb-10 leading-relaxed">
          A comprehensive Bible study on Revelation and Daniel&apos;s 70th Week.
          Twelve chapters. 93 pages. Built from the text up.
        </p>

        <div className="flex flex-col items-center gap-4 mb-4">
          <a
            href={PDF_URL}
            download
            className="btn-press inline-flex items-center justify-center gap-2 bg-[#8b0000] text-[#e8e0d0] px-10 py-4 text-sm tracking-[0.1em] uppercase font-semibold hover:bg-[#a50000] transition-all min-w-[320px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Download Chapter 5 Free →
          </a>
          <a
            href={PREORDER_URL}
            className="btn-press inline-flex items-center justify-center gap-2 border border-[#222] text-[#e8e0d0] px-10 py-4 text-sm tracking-[0.1em] uppercase font-medium hover:border-[#888] transition-all min-w-[320px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Preorder the Full Guide — $25
          </a>
        </div>
        <p className="text-sm text-[#555]">
          No email required. No gate. Direct PDF download.
        </p>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      {/* Scripture */}
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

      {/* Who This Is For */}
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
          {whoFor.map((item, i) => (
            <li key={i} className="text-[#c0b8a8] pl-6 relative">
              <span className="absolute left-0 text-[#8b0000]">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      {/* What's Inside */}
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
          {chapters.map((ch, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-[#111] border border-[#222] px-4 py-3 text-[#c0b8a8] text-[15px]"
            >
              <span className="text-[#8b0000] font-semibold shrink-0 mt-px">✓</span>
              <span className="flex-1">{ch}</span>
              {i === 4 && (
                <span
                  className="shrink-0 self-center bg-[#8b0000] text-[#e8e0d0] text-[9px] tracking-[0.12em] uppercase px-2 py-0.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Free Preview
                </span>
              )}
            </li>
          ))}
          <li className="flex items-start gap-3 bg-[#111] border border-[#222] px-4 py-3 text-[#888] text-[15px]">
            <span className="font-semibold shrink-0 mt-px">+</span>
            <span>Part 2 teaser: The scope of Revelation and what comes after the thousand years</span>
          </li>
        </ul>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      {/* Chapter 5 Preview Info */}
      <section className="py-16 px-4 sm:px-6 max-w-[900px] mx-auto">
        <div
          className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] font-medium mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Chapter 5 Preview
        </div>
        <h2
          className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          The War Behind the War
        </h2>
        <p className="text-[#c0b8a8] leading-[1.8] mb-6">
          Daniel prayed. God heard on Day 1. The angel didn&apos;t arrive for 21 days.
          The Prince of Persia held the messenger in warfare for three weeks in the unseen realm.
        </p>
        <p className="text-[#c0b8a8] leading-[1.8] mb-6">
          Chapter 5 maps the hierarchy. Territorial spirits assigned to nations.
          Principalities over regions. Powers operating through governments and rulers
          who may not know they&apos;re being moved. Ephesians 6:12 isn&apos;t a motivational
          metaphor. Paul is describing a chain of command.
        </p>
        <p className="text-[#c0b8a8] leading-[1.8] mb-8">
          This chapter covers Daniel 10, the invisible warfare structure, and what it
          demands we believe about how nations actually work. 13 pages. 5 original
          diagrams mapping the spiritual hierarchy.
        </p>
        <div className="text-center">
          <a
            href={PDF_URL}
            download
            className="btn-press inline-flex items-center justify-center gap-2 bg-[#8b0000] text-[#e8e0d0] px-10 py-4 text-sm tracking-[0.1em] uppercase font-semibold hover:bg-[#a50000] transition-all min-w-[320px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Download Chapter 5 Free →
          </a>
        </div>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      {/* Preorder */}
      <section className="py-16 px-4 sm:px-6 max-w-[900px] mx-auto text-center">
        <div
          className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] font-medium mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Preorder
        </div>
        <h2
          className="text-2xl uppercase font-bold text-[#e8e0d0] mb-4 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Lock In the Launch Price
        </h2>
        <div className="my-8">
          <div
            className="text-base text-[#888] line-through tracking-[0.05em]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            $97
          </div>
          <div
            className="text-5xl font-bold text-[#e8e0d0] tracking-[0.02em]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            $25
          </div>
          <div
            className="text-xs tracking-[0.12em] uppercase text-[#8b0000] mt-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Preorder Price
          </div>
        </div>
        <p className="text-sm text-[#888] mb-8">
          This price does not hold. Goes to $97 at launch.
        </p>
        <a
          href={PREORDER_URL}
          className="btn-press inline-flex items-center justify-center gap-2 bg-[#8b0000] text-[#e8e0d0] px-10 py-4 text-sm tracking-[0.1em] uppercase font-semibold hover:bg-[#a50000] transition-all min-w-[320px]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Preorder Now — $25 →
        </a>
        <p className="text-sm text-[#555] mt-4">
          Instant delivery when the full guide drops. PDF format.
        </p>
      </section>

      <hr className="border-[#222] max-w-[900px] mx-auto" />

      {/* Donation */}
      <section className="py-12 px-4 sm:px-6 max-w-[900px] mx-auto text-center">
        <div
          className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] font-medium mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Support the Work
        </div>
        <h2
          className="text-xl uppercase font-bold text-[#e8e0d0] mb-3 tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          One-Time Donation
        </h2>
        <p className="text-[#c0b8a8] text-[15px] max-w-[500px] mx-auto mb-6">
          No ads. No brand partnerships. No data sales. Dead Hidden runs on reader
          support and the men who want to go deeper into the text.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { amount: '$10', url: DONATE_10 },
            { amount: '$25', url: DONATE_25 },
            { amount: '$50', url: DONATE_50 },
          ].map((d) => (
            <a
              key={d.amount}
              href={d.url}
              className="btn-press border border-[#222] text-[#e8e0d0] px-8 py-3 text-sm tracking-[0.1em] uppercase font-medium hover:border-[#8b0000] hover:bg-[#8b0000]/10 transition-all"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {d.amount}
            </a>
          ))}
        </div>
        <p className="text-xs text-[#555] mt-6">
          Secure payment via Stripe. One-time. No subscription.
        </p>
      </section>
    </main>
  );
}
