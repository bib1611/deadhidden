import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You | Dead Hidden',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <h1
          className="text-3xl md:text-5xl uppercase tracking-[0.08em] mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          THE FIRE BURNS HOTTER.
        </h1>
        <div className="h-1 bg-[#8b0000] w-16 mx-auto mb-10" />

        <p className="text-lg text-[#c0b8a8] leading-relaxed mb-4">
          Your gift just funded truth that the world would rather bury.
        </p>
        <p className="text-base text-[#888] leading-relaxed mb-12">
          No receipt necessary — God keeps the books. But if you need one for your records, check your email from Stripe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/store"
            className="bg-[#8b0000] text-[#e8e0d0] px-8 py-3.5 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ENTER THE ARCHIVE
          </Link>
          <Link
            href="/"
            className="border border-[#e8e0d0]/30 text-[#e8e0d0] px-8 py-3.5 uppercase tracking-[0.15em] font-bold hover:border-[#e8e0d0]/60 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            BACK HOME
          </Link>
        </div>
      </div>
    </main>
  );
}
