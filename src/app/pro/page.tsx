import type { Metadata } from 'next';
import Link from 'next/link';
import { BuyButton } from '@/components/BuyButton';

export const metadata: Metadata = {
  title: 'Dead Hidden Pro — $29/mo. One Guide Every Month.',
  description:
    'Monthly membership. One Guide Token redeemable for any paid guide except The Vault. Plus the paid tier on Dead Hidden and The Biblical Man Substacks. Cancel anytime.',
  openGraph: {
    title: 'DEAD HIDDEN PRO',
    description:
      '$29/mo. One Guide Token every month. The paid Substack tier. No retreats.',
    url: 'https://deadhidden.org/pro',
    siteName: 'Dead Hidden Ministries',
    type: 'website',
  },
  alternates: { canonical: 'https://deadhidden.org/pro' },
};

const benefits = [
  {
    title: 'One Guide Token / month',
    body: 'Redeem for any paid Dead Hidden guide ($17–$127) — the Field Manuals, the Battle Notes, the Map of the Dead, the marriage guides. Anything but the Vault.',
  },
  {
    title: 'Paid Substack — both publications',
    body: 'Complimentary paid tier on Dead Hidden and The Biblical Man for as long as your membership is active. Read everything paywalled. Comment on every post.',
  },
  {
    title: 'No retreats. Cancel anytime.',
    body: 'No annual contracts. No reactivation fees. Cancel whenever — access ends at the close of your billing cycle.',
  },
];

const faqs = [
  {
    q: 'How does the Guide Token work?',
    a: 'Every month a new token issues to your account. Reply to your welcome email with the guide you want this month — we send the secure download link within 24 hours. Tokens do not roll over: use it or lose it.',
  },
  {
    q: 'Why is the Vault excluded?',
    a: 'The Vault is the complete archive — 76 resources, $297 retail. Including it in Pro would undercut the flagship. Every other paid guide is fair game.',
  },
  {
    q: 'How fast do I get Substack access?',
    a: 'Within 24 hours of subscribing. You will receive a Substack confirmation email when comp access is granted on Dead Hidden and The Biblical Man.',
  },
  {
    q: 'What happens when I cancel?',
    a: 'Stripe stops billing. Substack comp access ends at your billing cycle close. Any unredeemed token for that month stays redeemable until cycle end. No clawbacks.',
  },
  {
    q: 'Can I upgrade to the Vault later?',
    a: 'Yes. The Vault is a one-time purchase that gives you everything at once. Pro is the steady-cadence option for readers who want to pace themselves.',
  },
];

const product = {
  slug: 'dead-hidden-pro',
  name: 'DEAD HIDDEN PRO',
  priceLabel: '$29/mo',
};

export default function ProPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#e8e0d0]">
      {/* ─── HERO ─── */}
      <section className="px-4 pt-24 pb-16 sm:pt-32 sm:pb-20 max-w-3xl mx-auto text-center">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8b0000] mb-6 font-bold">
          Dead Hidden Ministries &middot; Members
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.03em] leading-[1.02]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          DEAD HIDDEN
          <br />
          <span className="text-[#8b0000]">PRO</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#cccccc] italic">
          $29/month. One guide every month. The paid Substack tier.
        </p>

        <div className="mt-8 max-w-xl mx-auto space-y-4 text-[#aaa] text-base sm:text-lg leading-relaxed">
          <p>
            One Guide Token every month, redeemable for any paid guide except
            the Vault. Plus the paid tier on Dead Hidden and The Biblical Man.
          </p>
          <p className="text-[#e8e0d0] font-bold">No retreats. Only advancement.</p>
        </div>

        <div className="mt-10">
          <div className="max-w-sm mx-auto">
            <BuyButton
              productSlug={product.slug}
              productName={product.name}
              priceLabel={product.priceLabel}
              isFree={false}
              isSubscription={true}
              ctaText={`JOIN PRO — ${product.priceLabel} →`}
            />
          </div>
          <p className="mt-3 text-xs text-[#666] uppercase tracking-[0.2em]">
            Cancel anytime &middot; Substack access in 24 hours
          </p>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="border-y border-[#1a1a1a] py-16 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-4">
              What you get
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Three things. Every month.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="bg-[#0f0f0f] border-l-2 border-[#8b0000] p-6 md:p-8"
              >
                <div
                  className="text-2xl text-[#8b0000] font-bold mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold uppercase tracking-[0.03em] mb-4 leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {b.title}
                </h3>
                <p className="text-sm text-[#aaa] leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-4">
              The mechanics
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              How it works.
            </h2>
          </div>

          <ol className="space-y-6">
            {[
              ['Subscribe', 'Stripe handles the $29/month billing. Cancel anytime in two clicks.'],
              ['Get your tokens', 'A new Guide Token issues every billing cycle. Reply to your welcome email with the guide you want — we send the secure download in 24 hours.'],
              ['Read on Substack', 'Within 24 hours you get complimentary paid access to Dead Hidden and The Biblical Man Substacks. Read everything. Comment everywhere.'],
              ['Cancel when you want', 'No clawbacks. No reactivation fees. Access ends at the close of your billing cycle, and that is it.'],
            ].map(([step, body], i) => (
              <li key={step} className="grid grid-cols-[auto_1fr] gap-5 items-start">
                <span
                  className="text-2xl sm:text-3xl text-[#8b0000] font-bold w-10 sm:w-12"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="text-lg sm:text-xl font-bold uppercase tracking-[0.04em] text-[#e8e0d0] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step}
                  </h3>
                  <p className="text-[#aaa] leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── PROOF STRIP ─── */}
      <section className="py-12 border-y border-[#1a1a1a] bg-black">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ['$29', 'Per month'],
            ['1', 'Token / mo'],
            ['2', 'Substacks'],
            ['KJV', 'Only'],
          ].map(([n, label]) => (
            <div key={label}>
              <div
                className="text-2xl md:text-3xl font-bold uppercase tracking-[0.04em] text-[#e8e0d0]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {n}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#666] mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-4">
              Last questions
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Before you join.
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-l-2 border-[#8b0000] pl-5">
                <h3
                  className="text-lg font-bold uppercase tracking-[0.03em] text-[#e8e0d0] mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {f.q}
                </h3>
                <p className="text-[#aaa] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 sm:py-28 px-4 border-t border-[#1a1a1a] bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-6">
            One decision
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            One guide a month.
            <br />
            <span className="text-[#8b0000]">No retreats.</span>
          </h2>
          <p className="text-[#aaa] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            $29/month. Cancel anytime. Substack access in 24 hours.
          </p>

          <div className="max-w-sm mx-auto">
            <BuyButton
              productSlug={product.slug}
              productName={product.name}
              priceLabel={product.priceLabel}
              isFree={false}
              isSubscription={true}
              ctaText={`JOIN PRO — ${product.priceLabel} →`}
            />
          </div>
          <p className="mt-4 text-xs text-[#666] uppercase tracking-[0.2em]">
            Stripe-secured &middot; Cancel anytime
          </p>

          <p className="mt-12 text-sm text-[#777]">
            Want everything at once instead?{' '}
            <Link
              href="/store/the-vault"
              className="text-[#8b0000] hover:text-[#a50000] underline-offset-4 hover:underline"
            >
              The Vault &mdash; $297 lifetime &rarr;
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
