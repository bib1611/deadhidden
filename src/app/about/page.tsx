import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Adam Johnsson — The Biblical Man',
  description:
    'Adam Johnsson — garbage truck driver, train conductor, father of 5, married 24 years, Sunday School teacher 17 years. Creator of Dead Hidden and The Biblical Man.',
  openGraph: {
    title: 'About Adam Johnsson — The Biblical Man',
    description:
      'The story behind Dead Hidden. Former garbage truck driver. Father of 5. 45K+ X followers. $84K ARR Substack.',
    url: 'https://deadhidden.org/about',
  },
  twitter: {
    card: 'summary',
    title: 'About Adam Johnsson — The Biblical Man',
    description:
      'Former garbage truck driver. Father of 5. Creator of Dead Hidden.',
  },
  alternates: {
    canonical: 'https://deadhidden.org/about',
  },
};

export default function AboutPage() {
  const testimonyParagraphs = [
    "I grew up in the system. Did everything they told me to do. Read the Bible versions they handed me. Sat under the teaching they approved. Believed the doctrines they packaged.",
    "Then I saw the cracks.",
    "Verses missing. Doctrines softened. The deity of Christ undermined in translation after translation. The modern Bible versions weren't just different — they were corrupted. Systematically. Deliberately. By people with documented agendas.",
    "I found the King James Bible. Not as a preference. Not as a tradition. As the preserved word of God in English. The one line they couldn't corrupt because God promised to preserve His words. And He did.",
    "Once you see it, you can't unsee it. The constructed matrix of modern Christianity — the watered-down doctrine, the carnal churches, the spiritual children they produce instead of warriors — it all traces back to one thing: they changed the Book.",
    "Dead Hidden exists because someone has to say it. Someone has to lay the documents on the table and let people read them for themselves.",
    "I'm not a seminary graduate. I'm not a theologian with letters after my name. I'm a man who reads his Bible, believes what it says, and won't apologize for teaching it the way God wrote it.",
    "The King James Bible says what it says. They changed it because it was too dangerous. Dead Hidden is here to hand it back to you.",
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            WHO WE ARE
          </div>
          <h1
            className="text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            THE MAN BEHIND THE ARCHIVE
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
              My name is Adam. Garbage truck driver. Train conductor. Father of five. Married twenty-four years.
            </p>
            <p className="text-sm text-[#888] leading-relaxed mb-3">
              Christie runs <span className="text-[#e8e0d0]">Biblical Womanhood</span> — because the men aren't the only ones who need to hear the truth. She's been beside me through every season of this fight.
            </p>
            <p className="text-sm text-[#888] leading-relaxed">
              Teaching Sunday School for seventeen years. Preaching since I was fourteen years old. KJV only. No compromise. No apology.
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
            ENTER THE ARCHIVE
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
