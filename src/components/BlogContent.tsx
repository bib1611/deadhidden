'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, BLOG_CATEGORIES, AUTHOR_DISPLAY } from '@/data/blog-posts';

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
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header — matches /read page styling */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            DEEP STUDY
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            BLOG
          </h1>
          <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl">
            SEO-focused articles on Bible study, biblical masculinity, marriage, and more.
            Written to go deep — not to get likes.
          </p>
        </div>
      </div>

      {/* Filter + Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1 mb-2 border-b border-[#222] pb-4">
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
                  className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-semibold transition-colors ${
                    isActive
                      ? 'text-[#e8e0d0] bg-[#8b0000]/20 border border-[#8b0000]/40'
                      : 'text-[#777] hover:text-[#888] border border-transparent'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Post Count */}
          <div className="mb-10 text-xs tracking-[0.1em] uppercase text-[#666] pt-2">
            {postCount} {postCount === 1 ? 'ARTICLE' : 'ARTICLES'}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-[#222] bg-[#111] hover:border-[#8b0000] transition-all duration-300"
              >
                <div className="p-5 sm:p-6">
                  {/* Category + Featured Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 bg-[#8b0000]/20 text-[#cc3333]">
                      {BLOG_CATEGORIES[post.category as keyof typeof BLOG_CATEGORIES]?.label ||
                        post.category}
                    </span>
                    {post.featured && (
                      <span className="text-[10px] tracking-[0.15em] uppercase font-semibold px-2 py-0.5 bg-[#1a1a1a] text-[#a50000]">
                        FEATURED
                      </span>
                    )}
                    <span className="text-[11px] text-[#777]">
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-[11px] text-[#777]">
                      · {post.readingTime} min
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-lg sm:text-xl font-bold text-[#e8e0d0] mb-2 group-hover:text-[#8b0000] transition-colors leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-[#888] leading-relaxed line-clamp-2 mb-4">
                    {post.metaDescription}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                    <span className="text-[11px] text-[#666]">
                      By {AUTHOR_DISPLAY[post.author]}
                    </span>
                    <span className="text-xs tracking-[0.15em] uppercase text-[#777] group-hover:text-[#8b0000] transition-colors">
                      READ →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {displayedPosts.length === 0 && (
            <div className="text-center py-20 text-[#777]">
              <p className="text-lg">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
