import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Check, Lock, ShieldCheck, Smartphone } from 'lucide-react';

const faithWallUrl = 'https://faithwall.deadhidden.org';

export const metadata: Metadata = {
  title: 'FaithWall - Scripture Before Scrolling',
  description:
    'FaithWall is the Scripture-before-scrolling web room from Adam and Christie Johnson. Build your family wall one verse at a time.',
  alternates: {
    canonical: 'https://deadhidden.org/faithwall',
  },
  openGraph: {
    title: 'FaithWall - Scripture Before Scrolling',
    description:
      'A Scripture-before-scrolling web room for Christian families, with native phone blocking being built next.',
    url: 'https://deadhidden.org/faithwall',
    type: 'website',
  },
};

const liveNow = [
  'FaithWall web room access',
  '90-second Scripture unlock tasks',
  'Wall progress and streaks saved on your device',
  'Manual screen-time check-ins',
];

const buildingNext = [
  'Native iOS and Android app blocking',
  'Shared household wall',
  'Parent dashboard and family controls',
  'More verse packs and onboarding',
];

export default function FaithWallPage() {
  return (
    <main className="bg-[#0a0a0a] text-[#e8e0d0]">
      <section className="relative overflow-hidden border-b border-[#24201d] pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,79,0,0.22),transparent_34%),linear-gradient(180deg,#120d0b_0%,#0a0a0a_100%)]" />
        <div className="container relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.24em] text-[#d94f00]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                New from Adam &amp; Christie
              </p>
              <h1
                className="mt-4 text-5xl font-bold uppercase leading-[0.9] text-[#f7f0e6] md:text-7xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                FaithWall
              </h1>
              <p
                className="mt-4 text-2xl uppercase tracking-[0.08em] text-[#d94f00] md:text-4xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Scripture before scrolling.
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#c9c0b3] md:text-lg">
                Your kids see you reach for your phone. The question is simple: what are they
                learning comes first?
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#aaa299] md:text-base">
                FaithWall is the Scripture-before-scrolling product we have been building through
                weeks of headaches and trial. The web room is live now. Native phone blocking is
                being built next.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={faithWallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#d94f00] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#f05a00]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Open FaithWall <ArrowRight size={16} />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#e8e0d0]/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#e8e0d0] transition-all hover:border-[#d94f00]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  See how it works
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.08em] text-[#948b80]">
                <span className="inline-flex items-center gap-1">
                  <BookOpen size={14} /> Scripture tasks
                </span>
                <span className="inline-flex items-center gap-1">
                  <Smartphone size={14} /> Web room live
                </span>
                <span className="inline-flex items-center gap-1">
                  <Lock size={14} /> Blocking app next
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-sm border border-[#2b2824] bg-[#080808] p-6 shadow-2xl shadow-black/40">
              <div className="relative min-h-[430px] overflow-hidden rounded-sm bg-[radial-gradient(circle_at_72%_18%,rgba(253,248,240,0.24),transparent_34%),linear-gradient(135deg,#1A1210_0%,#3D2B1F_52%,#8B2F2A_100%)]">
                <div className="absolute left-8 top-10 max-w-[58%]">
                  <p
                    className="text-6xl font-bold leading-none text-[#FDF8F0]"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Faith<span className="text-[#C4453A]">Wall</span>
                  </p>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.35em] text-[#D4A843]">
                    Scripture Before Scrolling
                  </p>
                  <p
                    className="mt-8 max-w-sm text-xl italic text-[#E8E0D4]"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Build your wall. One verse at a time.
                  </p>
                </div>
                <div className="absolute bottom-10 right-8 top-10 w-[230px] rounded-[34px] border-4 border-[#3D2B1F] bg-[#090706] p-4 shadow-2xl">
                  <div className="h-full rounded-[26px] bg-[#1A1210] px-5 py-7 text-center">
                    <ShieldCheck className="mx-auto h-16 w-16 text-[#D4A843]" strokeWidth={1.4} />
                    <p className="mt-7 text-xl italic text-[#FDF8F0]" style={{ fontFamily: 'Georgia, serif' }}>
                      Stay on the Wall.
                    </p>
                    <p className="mt-2 text-sm text-[#D4A843]">Grow in His Word.</p>
                    <div className="mt-10 grid grid-cols-4 gap-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <span key={i} className="h-4 rounded-[1px] bg-[#C4453A]" />
                      ))}
                    </div>
                    <Lock className="mx-auto mt-10 h-10 w-10 rounded-full bg-[#D4A843] p-2 text-[#1A1210]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-[#222] bg-[#0a0a0a] py-12 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.22em] text-[#d94f00]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                How it works
              </p>
              <h2
                className="mt-3 text-3xl font-bold uppercase text-[#f7f0e6] md:text-5xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                One verse. One prayer. One brick laid.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#aaa299] md:text-base">
              FaithWall is built to create a better first move: pause, Scripture, then decide
              what gets attention.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ['Choose the moment', 'Family Time. Devotion. Homeschool. Study. Pick the part of the day you want to protect.'],
              ['Build the pause', 'Before the scroll gets the first word, FaithWall gives you a short Scripture checkpoint.'],
              ['Lay one brick', 'Read, reflect, pray, or apply the passage. Ninety seconds becomes one brick in the wall.'],
              ['Let your family see it', "The goal is a visible household pattern: God's Word before the feed."],
            ].map(([title, body]) => (
              <div key={title} className="border border-[#222] bg-[#111] p-6">
                <h3
                  className="text-lg uppercase tracking-[0.06em] text-[#f7f0e6]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#888]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#222] bg-[#f7f5f0] py-12 text-[#1a1a1a] md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border border-[#e8e3dc] bg-white p-6 md:p-8">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b0000]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Live today
              </p>
              <h2 className="mt-3 text-3xl font-bold uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                The web room is real.
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-[#5f5850]">
                {liveNow.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#8b0000]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#2b2824] bg-[#120d0b] p-6 text-[#e8e0d0] md:p-8">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#d94f00]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Building next
              </p>
              <h2
                className="mt-3 text-3xl font-bold uppercase text-[#f7f0e6]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Phone-level blocking is next.
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-[#c9c0b3]">
                {buildingNext.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#d94f00]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#120d0b] py-12 md:py-20">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.22em] text-[#d94f00]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Founding Family invitation
          </p>
          <h2
            className="mt-3 text-3xl font-bold uppercase text-[#f7f0e6] md:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Build the wall with us.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#aaa299] md:text-base">
            The live FaithWall page has the current offer, checkout, and early access details.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={faithWallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#d94f00] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#f05a00]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Open FaithWall <ArrowRight size={16} />
            </a>
            <Link
              href="/store"
              className="text-xs font-bold uppercase tracking-[0.15em] text-[#888] transition-colors hover:text-[#e8e0d0]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Back to Dead Hidden archive
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
