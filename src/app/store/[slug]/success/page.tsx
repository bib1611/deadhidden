'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface DownloadFile {
  name: string;
  url: string;
}

interface DownloadData {
  product: { name: string; slug: string };
  customerEmail: string | null;
  isVault: boolean;
  files: DownloadFile[];
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [data, setData] = useState<DownloadData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found. If you just made a purchase, check your email for the download link.');
      setLoading(false);
      return;
    }

    fetch(`/api/download?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      })
      .catch(() => {
        setError('Failed to verify purchase. Please try refreshing the page.');
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">
        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="animate-pulse">
              <h1
                className="text-3xl md:text-5xl uppercase tracking-[0.08em] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                VERIFYING PURCHASE...
              </h1>
              <div className="h-1 bg-[#8b0000] w-16 mx-auto" />
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center">
            <h1
              className="text-3xl md:text-5xl uppercase tracking-[0.08em] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              SOMETHING WENT WRONG
            </h1>
            <div className="h-1 bg-[#8b0000] w-16 mx-auto mb-8" />
            <p className="text-[#888] text-lg mb-8">{error}</p>
            <p className="text-[#888] text-sm mb-12">
              Contact us at{' '}
              <a href="mailto:thebiblicalman1611@gmail.com" className="text-[#8b0000] underline">
                thebiblicalman1611@gmail.com
              </a>{' '}
              with your receipt and we&apos;ll get you sorted.
            </p>
            <Link
              href="/store"
              className="inline-block px-8 py-4 bg-[#8b0000] text-[#e8e0d0] hover:bg-[#a50000] font-bold tracking-wide transition-colors"
            >
              BACK TO STORE
            </Link>
          </div>
        )}

        {/* Success State — Single Product */}
        {!loading && data && !data.isVault && (
          <div className="text-center">
            <h1
              className="text-3xl md:text-5xl uppercase tracking-[0.08em] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              IT&apos;S YOURS.
            </h1>
            <div className="h-1 bg-[#8b0000] w-16 mx-auto mb-8" />

            <p className="text-lg text-[#888] mb-2">
              {data.product.name}
            </p>

            {data.customerEmail && (
              <p className="text-sm text-[#555] mb-10">
                Receipt sent to {data.customerEmail}
              </p>
            )}

            {data.files.map((file, i) => (
              <a
                key={i}
                href={file.url}
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
            ))}

            <p className="text-xs text-[#555] mt-8">
              Bookmark this page. Your download link is tied to your purchase and won&apos;t expire.
            </p>

            <div className="mt-12">
              <Link
                href="/store"
                className="text-[#888] hover:text-[#e8e0d0] text-sm tracking-wide"
              >
                ← BACK TO THE ARCHIVE
              </Link>
            </div>
          </div>
        )}

        {/* Success State — Vault */}
        {!loading && data && data.isVault && (
          <div>
            <div className="text-center mb-12">
              <h1
                className="text-3xl md:text-5xl uppercase tracking-[0.08em] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                THE VAULT IS OPEN.
              </h1>
              <div className="h-1 bg-[#8b0000] w-16 mx-auto mb-6" />
              <p className="text-lg text-[#888]">
                Everything. Every guide, manual, protocol, and framework. It&apos;s all yours.
              </p>
              {data.customerEmail && (
                <p className="text-sm text-[#555] mt-2">
                  Receipt sent to {data.customerEmail}
                </p>
              )}
            </div>

            <p className="text-xs text-[#555] text-center mb-8">
              Bookmark this page. Your downloads are tied to your purchase and won&apos;t expire.
            </p>

            {/* File Grid */}
            <div className="grid gap-3">
              {data.files.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  download
                  className="flex items-center justify-between px-6 py-4 border border-[#222] hover:border-[#8b0000] hover:bg-[#8b0000]/10 transition-all group"
                >
                  <span className="text-sm font-bold tracking-wide uppercase pr-4">
                    {file.name}
                  </span>
                  <span className="flex-shrink-0 text-[#8b0000] group-hover:text-[#e8e0d0] transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
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
                  </span>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/store"
                className="text-[#888] hover:text-[#e8e0d0] text-sm tracking-wide"
              >
                ← BACK TO THE ARCHIVE
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
