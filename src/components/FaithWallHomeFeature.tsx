import Link from 'next/link';
import { ArrowRight, BookOpen, Lock, ShieldCheck, Smartphone } from 'lucide-react';

export function FaithWallHomeFeature() {
  return (
    <section className="border-b border-[#2b211c] bg-[#120d0b] px-4 py-12 text-[#e8e0d0] md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.22em] text-[#d94f00]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            New from Adam &amp; Christie
          </p>
          <h2
            className="mt-3 text-3xl font-bold uppercase leading-none text-[#f7f0e6] md:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            FaithWall: Scripture before scrolling.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#c9c0b3] md:text-base">
            Built through weeks of headaches and trial, FaithWall gives Christian families a
            Scripture-before-scrolling web room today while the native phone-blocking app is
            being built next.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-[#c9c0b3] sm:grid-cols-3">
            <span className="inline-flex items-center gap-2">
              <BookOpen size={16} className="text-[#d94f00]" /> 90-second Scripture tasks
            </span>
            <span className="inline-flex items-center gap-2">
              <Smartphone size={16} className="text-[#d94f00]" /> Web room live now
            </span>
            <span className="inline-flex items-center gap-2">
              <Lock size={16} className="text-[#d94f00]" /> Native blocking next
            </span>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/faithwall"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#d94f00] px-7 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#f05a00]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              See FaithWall <ArrowRight size={16} />
            </Link>
            <a
              href="https://faithwall.deadhidden.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#e8e0d0]/25 px-7 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#e8e0d0] transition-all hover:border-[#d94f00]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Open live page
            </a>
          </div>
        </div>

        <Link
          href="/faithwall"
          className="group block overflow-hidden rounded-sm border border-[#2b2824] bg-[#080808] p-6 transition-colors hover:border-[#d94f00]"
        >
          <div className="relative min-h-[360px] overflow-hidden rounded-sm bg-[radial-gradient(circle_at_75%_15%,rgba(253,248,240,0.24),transparent_34%),linear-gradient(135deg,#1A1210_0%,#3D2B1F_52%,#8B2F2A_100%)]">
            <div className="absolute left-8 top-10 max-w-[56%]">
              <p
                className="text-5xl font-bold leading-none text-[#FDF8F0] md:text-6xl"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Faith<span className="text-[#C4453A]">Wall</span>
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-[#D4A843] md:text-sm">
                Scripture Before Scrolling
              </p>
              <p className="mt-8 max-w-sm text-lg italic text-[#E8E0D4]" style={{ fontFamily: 'Georgia, serif' }}>
                Build your wall. One verse at a time.
              </p>
            </div>
            <div className="absolute bottom-6 left-8 right-8 h-28 opacity-30">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="mb-2 mr-2 inline-block h-7 w-20 border border-[#D4A843]/30 bg-[#C4453A]/70"
                  style={{ transform: i % 2 ? 'translateX(18px)' : undefined }}
                />
              ))}
            </div>
            <div className="absolute bottom-10 right-8 top-10 w-[210px] rounded-[34px] border-4 border-[#3D2B1F] bg-[#090706] p-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
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
        </Link>
      </div>
    </section>
  );
}
