'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import type { Article } from '@/lib/articles';
import { ArticleCTA, VaultBanner } from '@/components/ArticleCTA';
import { ArticleEmailCapture } from '@/components/ArticleEmailCapture';
import { ShareButtons } from '@/components/ShareButtons';
import { useScrollDepth } from '@/hooks/useScrollDepth';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Estimate reading time from HTML content (225 wpm) */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const wordCount = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 225));
}

/** Reading progress bar — thin red bar at top of viewport */
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-[#8b0000] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ArticleReader({
  article,
  contentHtml,
  substackUrl,
  relatedArticles,
}: {
  article: Article;
  contentHtml: string;
  substackUrl: string;
  relatedArticles: Article[];
}) {
  const trackedRef = useRef(false);

  useScrollDepth(`/read/${article.slug}`);

  useEffect(() => {
    if (!trackedRef.current) {
      trackedRef.current = true;
      track('article_read', {
        article: article.slug,
        source: article.source,
      });
    }
  }, [article.slug, article.source]);

  const readingTime = contentHtml ? estimateReadingTime(contentHtml) : null;

  // Split content at ~40% for mid-article CTA insertion
  const midCTAHtml = contentHtml ? splitContentAtPercent(contentHtml, 40) : null;

  const articleUrl = `https://deadhidden.org/read/${article.slug}?source=${article.source}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Reading progress bar */}
      <ReadingProgressBar />

      {/* Floating share buttons */}
      <ShareButtons
        url={articleUrl}
        title={article.title}
        slug={article.slug}
        floating
      />

      {/* Back nav */}
      <div className="border-b border-[#1a1a1a] px-4 sm:px-6 pt-20 pb-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/read"
            className="text-xs tracking-[0.15em] uppercase text-[#777] hover:text-[#8b0000] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ← BACK TO ARTICLES
          </Link>
        </div>
      </div>

      {/* Article header — Task 5: mobile padding px-[22px] */}
      <header className="px-[22px] sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="max-w-3xl mx-auto">
          {/* Source + Date + Reading Time */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`text-[10px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 ${
                article.source === 'dead-hidden'
                  ? 'bg-[#8b0000]/20 text-[#cc3333]'
                  : 'bg-[#1a3a1a]/40 text-[#6b9b6b]'
              }`}
            >
              {article.sourceName}
            </span>
            <span className="text-[12px] text-[#777]">
              {formatDate(article.pubDate)}
            </span>
            {readingTime && (
              <span className="text-[12px] text-[#777]">
                · {readingTime} min read
              </span>
            )}
          </div>

          {/* Title — Task 5: mobile leading-[1.25] */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e8e0d0] leading-[1.25] sm:leading-[1.1] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.description && (
            <p className="text-lg sm:text-xl text-[#888] leading-relaxed">
              {article.description}
            </p>
          )}
        </div>
      </header>

      {/* Hero image */}
      {article.imageUrl && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Article body — Task 5: mobile padding px-[22px] */}
      <article className="px-[22px] sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto">
          {contentHtml ? (
            midCTAHtml ? (
              <>
                {/* First ~40% of content */}
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: midCTAHtml.before }}
                />

                {/* Mid-article CTA */}
                <ArticleCTA
                  title={article.title}
                  description={article.description}
                  source={article.source}
                  position="mid"
                />

                {/* Remaining content */}
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: midCTAHtml.after }}
                />
              </>
            ) : (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            )
          ) : (
            <div className="text-center py-16">
              <p className="text-[#888] mb-6">
                This article is available on Substack.
              </p>
              <a
                href={substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#8b0000] text-[#e8e0d0] text-sm uppercase tracking-[0.15em] font-semibold hover:bg-[#a50000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                READ ON SUBSTACK →
              </a>
            </div>
          )}

          {/* End-of-article CTA */}
          {contentHtml && (
            <>
              <ArticleCTA
                title={article.title}
                description={article.description}
                source={article.source}
                position="end"
              />

              {/* Inline email capture */}
              <ArticleEmailCapture />

              {/* Related articles — Task 6 */}
              {relatedArticles.length > 0 && (
                <div className="mt-12 pt-10 border-t border-[#222]">
                  <h3
                    className="text-sm tracking-[0.15em] uppercase text-[#777] mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    KEEP READING
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedArticles.map((related) => (
                      <Link
                        key={`${related.source}-${related.slug}`}
                        href={`/read/${related.slug}?source=${related.source}`}
                        className="group block border border-[#222] bg-[#111] hover:border-[#8b0000] transition-all duration-300"
                      >
                        {related.imageUrl && (
                          <div className="aspect-[16/9] overflow-hidden bg-[#0a0a0a]">
                            <img
                              src={related.imageUrl}
                              alt={related.title}
                              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-3 sm:p-4">
                          <span
                            className={`inline-block text-[9px] tracking-[0.15em] uppercase font-semibold px-1.5 py-0.5 mb-2 ${
                              related.source === 'dead-hidden'
                                ? 'bg-[#8b0000]/20 text-[#cc3333]'
                                : related.source === 'biblical-womanhood'
                                ? 'bg-[#2a1a2a]/40 text-[#b07ab0]'
                                : 'bg-[#1a3a1a]/40 text-[#6b9b6b]'
                            }`}
                          >
                            {related.sourceName}
                          </span>
                          <h4
                            className="text-sm font-bold text-[#e8e0d0] leading-tight group-hover:text-[#8b0000] transition-colors line-clamp-2"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {related.title}
                          </h4>
                          <span className="text-[10px] text-[#666] mt-1.5 block">
                            {formatDateShort(related.pubDate)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Vault banner */}
              <VaultBanner />
            </>
          )}
        </div>
      </article>

      {/* Bottom CTA */}
      <div className="border-t border-[#222] px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-[#777] mb-4">Originally published on</p>
          <a
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8b0000] hover:text-[#cc3333] text-sm uppercase tracking-[0.15em] font-semibold transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {article.sourceName} SUBSTACK →
          </a>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/read"
              className="px-5 py-2.5 border border-[#333] text-[#888] text-xs uppercase tracking-[0.15em] hover:border-[#8b0000] hover:text-[#e8e0d0] transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              MORE ARTICLES
            </Link>
            <Link
              href="/store"
              className="px-5 py-2.5 bg-[#8b0000] text-[#e8e0d0] text-xs uppercase tracking-[0.15em] hover:bg-[#a50000] transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              THE ARCHIVE
            </Link>
          </div>
        </div>
      </div>

      {/* Article typography styles */}
      <style>{`
        .article-content {
          font-family: var(--font-body);
          font-size: 1.125rem;
          line-height: 1.85;
          color: #c8c0b0;
        }

        @media (max-width: 640px) {
          .article-content {
            font-size: 18px;
            line-height: 1.75;
          }
        }

        .article-content p {
          margin-bottom: 1.5em;
        }

        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4 {
          font-family: var(--font-heading);
          color: #e8e0d0;
          font-weight: 700;
          margin-top: 2em;
          margin-bottom: 0.75em;
          line-height: 1.2;
        }

        .article-content h2 {
          font-size: 1.75rem;
        }

        .article-content h3 {
          font-size: 1.4rem;
        }

        .article-content a {
          color: #cc3333;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }

        .article-content a:hover {
          color: #e8e0d0;
        }

        .article-content strong,
        .article-content b {
          color: #e8e0d0;
          font-weight: 600;
        }

        .article-content em {
          color: #d0c8b8;
          font-style: italic;
        }

        /* Task 4: Scripture/blockquote styling */
        .article-content blockquote {
          border-left: 3px solid #8b0000;
          padding-left: 20px;
          margin: 1.5em 0;
          background: rgba(139, 0, 0, 0.05);
          padding-top: 0.75em;
          padding-bottom: 0.75em;
          padding-right: 1em;
          color: #b8b0a0;
          font-style: italic;
          font-size: 1.05rem;
        }

        .article-content blockquote p:last-child {
          margin-bottom: 0;
        }

        .article-content hr {
          border: none;
          border-top: 1px solid #333;
          margin: 2.5em 0;
        }

        .article-content img {
          max-width: 100%;
          height: auto;
          margin: 1.5em 0;
        }

        .article-content figure {
          margin: 2em 0;
        }

        .article-content figcaption {
          font-size: 0.85rem;
          color: #666;
          margin-top: 0.5em;
          text-align: center;
        }

        .article-content ul,
        .article-content ol {
          margin: 1em 0;
          padding-left: 1.5em;
        }

        .article-content li {
          margin-bottom: 0.5em;
        }

        .article-content .image-link-expand,
        .article-content .pencraft,
        .article-content .icon-container {
          display: none !important;
        }

        .article-content .captioned-image-container {
          margin: 2em 0;
        }

        .article-content .captioned-image-container img {
          width: 100%;
          max-height: 600px;
          object-fit: cover;
        }

        /* Reading progress feel */
        .article-content > *:first-child {
          margin-top: 0;
        }

        /* Drop cap for first paragraph */
        .article-content > p:first-of-type::first-letter {
          font-family: var(--font-heading);
          font-size: 3.5em;
          float: left;
          line-height: 0.8;
          padding-right: 0.1em;
          padding-top: 0.05em;
          color: #8b0000;
          font-weight: 700;
        }
      `}</style>
    </main>
  );
}

/**
 * Split HTML content at approximately the given percentage of top-level elements.
 * This is a rough heuristic — it counts closing tags for p, h2, h3, blockquote, figure, ul, ol
 * to find a good split point near the target percentage.
 */
function splitContentAtPercent(html: string, percent: number): { before: string; after: string } | null {
  // Find all top-level block element boundaries
  const blockEndRegex = /<\/(p|h[1-6]|blockquote|figure|ul|ol|div)>/gi;
  const positions: number[] = [];
  let m;
  while ((m = blockEndRegex.exec(html)) !== null) {
    positions.push(m.index + m[0].length);
  }

  if (positions.length < 4) return null; // Too short to split

  const targetIdx = Math.floor(positions.length * (percent / 100));
  const splitPos = positions[Math.max(1, Math.min(targetIdx, positions.length - 2))];

  return {
    before: html.slice(0, splitPos),
    after: html.slice(splitPos),
  };
}
