'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, BLOG_CATEGORIES } from '@/data/blog-posts';

export function BlogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  const categoryList = ['all', ...Object.keys(BLOG_CATEGORIES)];
  const displayedPosts =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const postCount = displayedPosts.length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            DEEP STUDY
          </div>
          <h1
            className="text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0] mb-12"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            BLOG
          </h1>

          {/* Category Filter Tabs */}
          <div
            className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categoryList.map((cat) => {
              const isAll = cat === 'all';
              const isActive = activeCategory === cat;
              const label = isAll
                ? 'ALL'
                : BLOG_CATEGORIES[cat as keyof typeof BLOG_CATEGORIES]?.label || cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs tracking-[0.12em] uppercase whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#8b0000] text-[#e8e0d0]'
                      : 'border border-[#222] text-[#888] hover:text-[#e8e0d0]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Post Count */}
          <div className="mt-6 text-sm tracking-[0.1em] uppercase text-[#888]">
            {postCount} ARTICLES FOUND
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="border border-[#222] bg-[#111] p-6 flex flex-col h-full hover:border-[#8b0000] transition-colors group"
            >
              {/* Top row: Category + Featured Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs tracking-[0.12em] uppercase text-[#777]">
                  {BLOG_CATEGORIES[post.category as keyof typeof BLOG_CATEGORIES]?.label ||
                    post.category}
                </div>
                {post.featured && (
                  <span
                    className="text-xs px-2 py-0.5 bg-[#8b0000]/20 text-[#a50000] tracking-[0.1em] uppercase font-bold"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    FEATURED
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                className="text-lg md:text-xl uppercase font-bold text-[#e8e0d0] mb-2 line-clamp-2 group-hover:text-[#8b0000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-[#888] line-clamp-3 mb-4 flex-grow">
                {post.metaDescription}
              </p>

              {/* Metadata Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#222] text-xs text-[#666]">
                <div className="flex gap-2">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <span className="text-[#555]">{Math.ceil(post.wordCount / 200)} min read</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {displayedPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#888] text-lg">No articles in this category yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
