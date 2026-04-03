import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Dead Hidden Ministries — Adam & Christie Johnsson',
  description:
    'Dead Hidden Ministries — a Bible study ministry and friend to churches. Adam & Christie Johnsson: married 24 years, 5 children, 17 years teaching Sunday School. Three publications serving 70,000+ subscribers.',
  openGraph: {
    title: 'About Dead Hidden Ministries — Adam & Christie Johnsson',
    description:
      'A Bible study ministry and friend to churches. Adam & Christie Johnsson — married 24 years, 5 children, three publications, 70,000+ subscribers.',
    url: 'https://deadhidden.org/about',
  },
  twitter: {
    card: 'summary',
    title: 'About Dead Hidden Ministries',
    description:
      'A Bible study ministry and friend to churches by Adam & Christie Johnsson.',
  },
  alternates: {
    canonical: 'https://deadhidden.org/about',
  },
};

export default function AboutPage() {
  const testimonyParagraphs = [
    "I started driving a garbage truck at 4 AM and reading my Bible on break. Christie was home with the kids, teaching them Scripture before the school system could get to them. We weren't building a ministry. We were just trying to survive and stay faithful.",
    "But we kept running into the same problem. The church wasn't teaching what the Bible actually said. Marriages were falling apart in the pews. Men had no idea how to lead. Women were being fed feminism dressed in Christian language. Kids were being handed to the culture without a fight.",
    "So we started writing. Not for an audience. For the people sitting next to us in Sunday School who had the same questions we did.",
    "I wrote what I wish someone had handed me when I was twenty years old and clueless. Christie wrote what she wished older women in the church had told her instead of the watered-down advice she got.",
    "Then strangers found it. Then thousands. Then tens of thousands. People who felt the same gap — the distance between what Scripture says and what the modern church teaches.",
    "Dead Hidden Ministries is not a replacement for the local church. It is a friend to the church. The resources here exist to strengthen what the church is supposed to be doing — teaching families how to study Scripture, fight spiritual battles, raise children, and stay married.",
    "We're not seminary graduates. We're not theologians with letters after our names. We're a family that reads the Bible, believes what it says, and serves the body of Christ with everything we've got.",
    "If your church needs resources, we built them. If your family needs truth, we wrote it down. If you need a friend in the fight — you found one.",
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            A FRIEND TO CHURCHES
          </div>
          <h1
            className="text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ABOUT THE MINISTRY
          </h1>
        </div>
      </div>

      {/* Photo + Intro */}
      <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src="/images/adam-christie.jpg"
              alt="Adam and Christie Johnsson"
              className="w-full grayscale border border-[#222]"
            />
            <p className="text-xs text-[#555] mt-3 text-center uppercase tracking-[0.1em]">
              Adam & Christie — 24 years married
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg md:text-xl text-[#e8e0d0] leading-relaxed mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Dead Hidden Ministries exists to serve the body of Christ with the Bible study resources the modern church stopped providing.
            </p>
            <p className="text-sm text-[#888] leading-relaxed mb-3">
              Adam and Christie Johnsson. Married twenty-four years. Five children. Teaching Sunday School for seventeen years straight. Adam drove garbage trucks and conducted trains before going full-time. Christie homeschools and runs <span className="text-[#e8e0d0]">Biblical Womanhood</span> — because the women need the truth just as much as the men.
            </p>
            <p className="text-sm text-[#888] leading-relaxed">
              Three publications. 70,000+ subscribers. 50+ Bible study resources. A friend to churches and Christians everywhere who refuse to settle for watered-down faith.
            </p>
          </div>
        </div>
      </div>

      {/* Testimony */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {testimonyParagraphs.map((paragraph, index) => {
            // Calculate opacity based on position
            const totalParagraphs = testimonyParagraphs.length;
            const opacityValue = 0.3 + (index / totalParagraphs) * 0.7; // From 0.3 to 1.0

            return (
              <p
                key={index}
                className="text-base md:text-lg leading-relaxed"
                style={{
                  color: `rgba(232, 224, 208, ${opacityValue})`,
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="border-t border-[#222] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div
              className="text-4xl md:text-5xl font-bold text-[#e8e0d0] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              24
            </div>
            <div className="text-xs tracking-[0.15em] uppercase text-[#888]">YEARS MARRIED</div>
          </div>
          <div>
            <div
              className="text-4xl md:text-5xl font-bold text-[#e8e0d0] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              5
            </div>
            <div className="text-xs tracking-[0.15em] uppercase text-[#888]">CHILDREN</div>
          </div>
          <div>
            <div
              className="text-4xl md:text-5xl font-bold text-[#e8e0d0] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              17
            </div>
            <div className="text-xs tracking-[0.15em] uppercase text-[#888]">YEARS TEACHING</div>
          </div>
          <div>
            <div
              className="text-4xl md:text-5xl font-bold text-[#e8e0d0] mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              66
            </div>
            <div className="text-xs tracking-[0.15em] uppercase text-[#888]">RESOURCES</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[#222] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/store"
            className="inline-block px-8 py-4 bg-[#8b0000] text-[#e8e0d0] font-semibold tracking-[0.15em] uppercase hover:bg-[#a80000] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            EXPLORE OUR RESOURCES
          </Link>
        </div>
      </div>

      {/* Scripture */}
      <div className="border-t border-[#222] px-4 sm:px-6 lg:px-8 py-16 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm md:text-base text-[#888] leading-relaxed italic mb-2">
            "But the natural man receiveth not the things of the Spirit of God: for they are
            foolishness unto him: neither can he know them, because they are spiritually discerned."
          </p>
          <p className="text-xs tracking-[0.1em] uppercase text-[#555]">1 CORINTHIANS 2:14 (KJV)</p>
        </div>
      </div>
    </main>
  );
}
