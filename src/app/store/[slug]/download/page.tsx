import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { getBlobUrl } from '@/lib/blob';

interface DownloadPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { slug } = await params;

  // Only allow free products
  const product = products.find((p) => p.slug === slug && p.isFree);
  if (!product) {
    notFound();
  }

  // Look up the blob URL
  const fileUrl = await getBlobUrl(slug);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <h1
          className="text-3xl md:text-5xl uppercase tracking-[0.08em] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          IT&apos;S YOURS.
        </h1>
        <div className="h-1 bg-[#8b0000] w-16 mx-auto mb-8" />

        <p className="text-lg text-[#888] mb-2">{product.name}</p>
        <p className="text-sm text-[#555] mb-10">Free download. No strings attached.</p>

        {fileUrl ? (
          <a
            href={fileUrl}
            download
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#8b0000] text-[#e8e0d0] hover:bg-[#a50000] font-bold tracking-wide transition-colors text-lg mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            DOWNLOAD PDF
          </a>
        ) : (
          <div>
            <p className="text-[#888] mb-4">
              File is being prepared. Please try again in a moment.
            </p>
            <p className="text-sm text-[#555]">
              If the problem persists, call or text us at{' '}
              <a href="tel:+17014262175" className="text-[#8b0000] underline">
                (701) 426-2175
              </a>{' '}
              or email{' '}
              <a href="mailto:thebiblicalman1611@gmail.com" className="text-[#8b0000] underline">
                thebiblicalman1611@gmail.com
              </a>
            </p>
          </div>
        )}

        <p className="text-xs text-[#555] mt-8">
          Bookmark this page to download again anytime.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/store"
            className="text-[#888] hover:text-[#e8e0d0] text-sm tracking-wide"
          >
            ← BACK TO THE ARCHIVE
          </Link>
          <Link
            href="/where-to-begin"
            className="text-[#8b0000] hover:text-[#e8e0d0] text-sm tracking-wide font-bold"
          >
            WHERE TO BEGIN →
          </Link>
        </div>
      </div>
    </div>
  );
}

// Revalidate every 60 seconds so new blob uploads are picked up
export const revalidate = 60;

// Generate static paths for all free products
export async function generateStaticParams() {
  return products
    .filter((p) => p.isFree)
    .map((p) => ({ slug: p.slug }));
}
