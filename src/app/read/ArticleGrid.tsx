'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/articles';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/read/${article.slug}?source=${article.source}`}
      className="group block border border-[#222] bg-[#111] hover:border-[#8b0000] transition-all duration-300"
    >
      {/* Image */}
      {article.imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-[#0a0a0a]">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Source tag */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-[10px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 ${
              article.source === 'dead-hidden'
                ? 'bg-[#8b0000]/20 text-[#cc3333]'
                : article.source === 'biblical-womanhood'
                ? 'bg-[#2a1a2a]/40 text-[#b07ab0]'
                : 'bg-[#1a3a1a]/40 text-[#6b9b6b]'
            }`}
          >
            {article.sourceName}
          </span>
          <span className="text-[11px] text-[#555]">{formatDate(article.pubDate)}</span>
        </div>

        {/* Title */}
        <h2
          className="text-lg sm:text-xl font-bold text-[#e8e0d0] mb-2 group-hover:text-[#8b0000] transition-colors leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {article.title}
        </h2>

        {/* Description */}
        {article.description && (
          <p className="text-sm text-[#888] leading-relaxed line-clamp-2">
            {article.description}
          </p>
        )}

        {/* Read indicator */}
        <div className="mt-4 text-xs tracking-[0.15em] uppercase text-[#555] group-hover:text-[#8b0000] transition-colors">
          READ →
        </div>
      </div>
    </Link>
  );
}

export function ArticleGrid({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<'all' | 'dead-hidden' | 'biblical-man' | 'biblical-womanhood'>('all');

  const filtered =
    filter === 'all' ? articles : articles.filter((a) => a.source === filter);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 mb-10 border-b border-[#222] pb-4">
          {[
            { key: 'all' as const, label: 'ALL' },
            { key: 'dead-hidden' as const, label: 'DEAD HIDDEN' },
            { key: 'biblical-man' as const, label: 'THE BIBLICAL MAN' },
            { key: 'biblical-womanhood' as const, label: 'BIBLICAL WOMANHOOD' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-semibold transition-colors ${
                filter === tab.key
                  ? 'text-[#e8e0d0] bg-[#8b0000]/20 border border-[#8b0000]/40'
                  : 'text-[#555] hover:text-[#888] border border-transparent'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((article) => (
            <ArticleCard key={`${article.source}-${article.slug}`} article={article} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#555]">
            <p className="text-lg">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
