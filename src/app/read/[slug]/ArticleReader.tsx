'use client';

import Link from 'next/link';
import type { Article } from '@/lib/articles';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ArticleReader({
  article,
  contentHtml,
  substackUrl,
}: {
  article: Article;
  contentHtml: string;
  substackUrl: string;
}) {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Back nav */}
      <div className="border-b border-[#1a1a1a] px-4 sm:px-6 pt-20 pb-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/read"
            className="text-xs tracking-[0.15em] uppercase text-[#555] hover:text-[#8b0000] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ← BACK TO ARTICLES
          </Link>
        </div>
      </div>

      {/* Article header */}
      <header className="px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="max-w-3xl mx-auto">
          {/* Source + Date */}
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
            <span className="text-[12px] text-[#555]">
              {formatDate(article.pubDate)}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e8e0d0] leading-[1.1] mb-4"
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
            alt=""
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Article body */}
      <article className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto">
          {contentHtml ? (
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
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
        </div>
      </article>

      {/* Bottom CTA */}
      <div className="border-t border-[#222] px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-[#555] mb-4">Originally published on</p>
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
            font-size: 1.05rem;
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

        .article-content blockquote {
          border-left: 3px solid #8b0000;
          padding-left: 1.25em;
          margin: 1.5em 0;
          color: #888;
          font-style: italic;
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
