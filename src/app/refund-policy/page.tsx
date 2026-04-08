import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy — Dead Hidden',
  description:
    'Refund policy for Dead Hidden digital products. 100% satisfaction guarantee on all downloadable Bible study resources, marriage guides, and spiritual warfare protocols.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://deadhidden.org/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-3xl md:text-5xl uppercase tracking-[0.08em] mb-4 text-center"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          REFUND POLICY
        </h1>
        <div className="h-1 bg-[#8b0000] w-16 mx-auto mb-12" />

        <div className="space-y-6 text-[#aaa] leading-relaxed text-[15px]">
          <p>
            All products sold through Dead Hidden are{' '}
            <strong className="text-[#e8e0d0]">
              digital goods delivered instantly upon purchase.
            </strong>
          </p>

          <p>
            Because these are digital products containing proprietary
            intellectual property — written guides, manuals, protocols, and
            frameworks — they cannot be returned, exchanged, or refunded once
            delivered.
          </p>

          <p>
            <strong className="text-[#e8e0d0]">
              All sales are final. No refunds. No exceptions.
            </strong>
          </p>

          <p>
            When you purchase a product, you receive immediate access to the
            full digital file. The product is delivered in its entirety at the
            point of sale. Because the intellectual property is transferred
            instantly and cannot be &ldquo;returned&rdquo; in any meaningful
            sense, we do not offer refunds under any circumstances.
          </p>

          <p>
            This policy applies to all individual products and bundles,
            including The Vault.
          </p>

          <div className="border-t border-[#222] pt-6 mt-8">
            <p className="text-sm text-[#666]">
              <strong className="text-[#888]">Delivery Issues:</strong> If you
              did not receive your download link after purchase, contact us at{' '}
              <a
                href="mailto:thebiblicalman1611@gmail.com"
                className="text-[#8b0000] underline"
              >
                thebiblicalman1611@gmail.com
              </a>{' '}
              with your receipt and we will make sure you get your files. You
              can also call or text us at{' '}
              <a href="tel:+17014262175" className="text-[#8b0000] underline">(701) 426-2175</a>.
              We stand behind delivery — not refunds.
            </p>
          </div>

          <div className="border-t border-[#222] pt-6">
            <p className="text-sm text-[#666]">
              By completing a purchase on this site, you acknowledge and agree
              to this refund policy.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link
            href="/store"
            className="text-[#888] hover:text-[#e8e0d0] text-sm tracking-wide"
          >
            ← BACK TO STORE
          </Link>
        </div>
      </div>
    </div>
  );
}
