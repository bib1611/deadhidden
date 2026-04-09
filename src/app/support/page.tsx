import type { Metadata } from 'next';
import { SupportButtons } from '@/components/SupportButtons';

export const metadata: Metadata = {
  title: 'Support The Mission | Dead Hidden',
  description:
    'No sponsors. No ads. No denomination. Keep the fire lit with a one-time gift to Dead Hidden.',
  openGraph: {
    title: 'Support The Mission | Dead Hidden',
    description: 'No sponsors. No ads. No denomination. Keep the fire lit.',
    url: 'https://deadhidden.org/support',
    images: [
      {
        url: 'https://deadhidden.org/api/og?title=Support+The+Mission&subtitle=Keep+the+Fire+Lit',
        width: 1200,
        height: 630,
        alt: 'Support Dead Hidden Ministries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support The Mission | Dead Hidden',
    description: 'No sponsors. No ads. No denomination. Keep the fire lit.',
    creator: '@Biblicalman',
  },
  alternates: {
    canonical: 'https://deadhidden.org/support',
  },
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        {/* Download Recovery */}
        <div className="border border-[#222] bg-[#111] p-8 mb-16">
          <h2
            className="text-xl uppercase font-bold mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            LOST YOUR DOWNLOADS?
          </h2>
          <p className="text-[#c0b8a8] text-base leading-relaxed mb-4">
            Enter your email at{' '}
            <a
              href="/resend-downloads"
              className="text-[#8b0000] underline hover:text-[#a00000] transition-colors"
            >
              deadhidden.org/resend-downloads
            </a>{' '}
            and we&apos;ll resend them instantly. No waiting. No support ticket.
          </p>
          <a
            href="/resend-downloads"
            className="inline-block bg-[#8b0000] text-[#e8e0d0] text-sm font-bold uppercase tracking-[2px] px-6 py-3 hover:bg-[#a00000] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            GET MY FILES &rarr;
          </a>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl uppercase font-bold mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          KEEP THE FIRE LIT.
        </h1>
        <div className="h-1 bg-[#8b0000] w-16 mb-12" />

        {/* The Story */}
        <div className="space-y-6 text-base md:text-lg text-[#c0b8a8] leading-relaxed mb-16">
          <p>
            I drove a garbage truck. Then I conducted trains. Then God told me to write.
          </p>
          <p>
            I walked away from a steady paycheck with five kids and a mortgage because the words wouldn&apos;t stop. The posts at 2 AM that men said saved their marriage. The Bible studies that made comfortable Christians squirm. The truth that the modern church buried under committee meetings and coffee bars.
          </p>
          <p>
            There are no sponsors behind this. No denomination funding it. No publishing house. No corporate money. No ads. Not one.
          </p>
          <p>
            Every guide, every post, every tweet, every Substack article — it comes from a man with a Bible, five children, a wife of 24 years, and a mouth God won&apos;t let him shut.
          </p>
          <p className="text-[#e8e0d0] font-bold">
            If this ministry has fed you — even once — you can keep it alive.
          </p>
        </div>

        {/* Gift Amounts */}
        <div className="mb-16">
          <h2
            className="text-2xl uppercase font-bold mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            FUND THE WAR CHEST
          </h2>
          <p className="text-sm text-[#888] mb-8">
            One-time gift. No strings. No subscription. Just war funding.
          </p>

          <SupportButtons />
        </div>

        {/* What It Funds */}
        <div className="border-t border-[#222] pt-12 mb-16">
          <h2
            className="text-xl uppercase font-bold mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            WHERE IT GOES
          </h2>
          <div className="space-y-4 text-[#c0b8a8]">
            <div className="flex gap-3">
              <span className="text-[#8b0000] font-bold flex-shrink-0">→</span>
              <span>Daily content — free Substack posts, tweets, and Bible studies reaching 70,000+ subscribers</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#8b0000] font-bold flex-shrink-0">→</span>
              <span>New guides and manuals — the research, writing, and design of every resource in The Archive</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#8b0000] font-bold flex-shrink-0">→</span>
              <span>Infrastructure — hosting, email delivery, and the tools that keep Dead Hidden running 24/7</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#8b0000] font-bold flex-shrink-0">→</span>
              <span>A family of seven — five kids who watch their father choose obedience over comfort every single day</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-[#222] pt-12 mb-16">
          <h2
            className="text-xl uppercase font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            QUESTIONS? CALL US.
          </h2>
          <p className="text-[#888] text-sm mb-4">
            If you have questions about a purchase, need help with a download, or just want to talk — call or text.
          </p>
          <a
            href="tel:+17014262175"
            className="text-2xl text-[#e8e0d0] font-bold hover:text-[#8b0000] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            (701) 426-2175
          </a>
        </div>

        {/* The Verse */}
        <div className="border border-[#222] bg-[#111] p-8 text-center">
          <p className="text-[#888] italic text-sm leading-relaxed mb-3">
            &ldquo;Even so hath the Lord ordained that they which preach the gospel should live of the gospel.&rdquo;
          </p>
          <p className="text-xs text-[#777] tracking-[0.15em] uppercase">
            — 1 Corinthians 9:14 KJV
          </p>
        </div>
      </div>
    </main>
  );
}
