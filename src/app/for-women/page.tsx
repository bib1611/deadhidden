import type { Metadata } from 'next';
import Link from 'next/link';
import { WomensGuideCapture } from '@/components/WomensGuideCapture';

export const metadata: Metadata = {
  title: 'For Women — Dead Hidden',
  description:
    'Three free guides for the complementarian woman who did everything right and is still bleeding. No feminist framing. No husband bashing. Just the truth.',
  openGraph: {
    title: 'You Did Everything Right.',
    description:
      'Three free guides. Each one names a wound nobody in your small group will say out loud.',
    url: 'https://deadhidden.org/for-women',
    siteName: 'Dead Hidden',
    type: 'website',
  },
};

const guides = [
  {
    number: 1,
    title: 'The Idol of Expectation',
    subtitle:
      'You did everything right. God didn\u2019t deliver what you were told He would.',
    teaser:
      'She submitted. She served. She stayed. The promise didn\u2019t come.',
  },
  {
    number: 2,
    title: 'The Subtle Takeover',
    subtitle:
      'She didn\u2019t want to lead. She just didn\u2019t have a choice. Or so she told herself.',
    teaser:
      'She reached for the wheel because it was on the floor.',
  },
  {
    number: 3,
    title: 'Performing for the Pew',
    subtitle:
      'Her whole spiritual life has an audience. She is so tired.',
    teaser:
      'At some point faithfulness and performance became indistinguishable.',
  },
];

export default function ForWomenPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="px-4 pt-28 pb-20 sm:pt-36 sm:pb-28 max-w-3xl mx-auto text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#e8e0d0] uppercase tracking-[0.04em] leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          YOU DID EVERYTHING RIGHT.
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-[#8b0000] italic">
          This is for the woman who is still bleeding anyway.
        </p>

        <div className="mt-8 max-w-xl mx-auto space-y-3 text-[#888] text-base sm:text-lg leading-relaxed">
          <p>
            Three free guides. Each one names a wound nobody in your small group
            will say out loud.
          </p>
          <p>No feminist framing. No husband bashing. Just the truth.</p>
        </div>

        <div className="mt-10">
          <WomensGuideCapture />
        </div>

        <p className="mt-4 text-xs text-[#555]">
          All three guides arrive in one email. Read them on your own time.
        </p>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-[#222]" />
      </div>

      {/* ─── GUIDE CARDS ─── */}
      <section className="px-4 py-20 sm:py-28 max-w-5xl mx-auto">
        <div className="grid gap-10 md:grid-cols-3">
          {guides.map((guide) => (
            <div
              key={guide.number}
              className="border border-[#222] p-6 sm:p-8"
            >
              <p
                className="text-[#8b0000] text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Guide {guide.number}
              </p>

              <h3
                className="text-xl font-bold text-[#e8e0d0] uppercase tracking-wide mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {guide.title}
              </h3>

              <p className="text-sm text-[#888] italic leading-relaxed mb-4">
                {guide.subtitle}
              </p>

              <p className="text-sm text-[#666] leading-relaxed">
                {guide.teaser}
              </p>

              <p
                className="mt-6 text-[10px] text-[#555] uppercase tracking-[0.15em] font-bold"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Included when you sign up
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-[#222]" />
      </div>

      {/* ─── BOTTOM CTA — FIELD MANUAL ─── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-2xl mx-auto border border-[#8b0000] p-8 sm:p-12 text-center">
          <p
            className="text-[#8b0000] text-xs font-bold tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Go deeper
          </p>

          <h2
            className="text-2xl sm:text-3xl font-bold text-[#e8e0d0] uppercase tracking-wide"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            THE BIBLICAL WOMAN FIELD MANUAL
          </h2>

          <p className="mt-4 text-[#888] text-base leading-relaxed max-w-lg mx-auto">
            13 chapters. 25,000 words. For the complementarian woman who has
            done everything right and is still bleeding. $77 launch special.
          </p>

          <Link
            href="/store/biblical-woman-field-manual"
            className="btn-press inline-block mt-8 bg-[#8b0000] text-[#e8e0d0] px-8 py-4 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-all text-sm"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            GET THE FIELD MANUAL
          </Link>
        </div>
      </section>
    </main>
  );
}
