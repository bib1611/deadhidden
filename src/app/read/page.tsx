import type { Metadata } from 'next';
import { FEEDS, parseRSSFeed, type Article } from '@/lib/articles';
import { ArticleGrid } from './ArticleGrid';

export const metadata: Metadata = {
  title: 'Free Articles — Biblical Masculinity & Spiritual Warfare',
  description:
    'Free articles from Dead Hidden and The Biblical Man. Biblical masculinity, spiritual warfare, marriage, and unfiltered KJV truth. No algorithm. No paywall.',
  openGraph: {
    title: 'Free Articles — Dead Hidden',
    description:
      'Free articles on biblical masculinity, spiritual warfare, and marriage from Adam Johnsson.',
    url: 'https://deadhidden.org/read',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Articles — Dead Hidden',
    description:
      'Free articles on biblical masculinity, spiritual warfare, and marriage.',
  },
  alternates: {
    canonical: 'https://deadhidden.org/read',
  },
};

// Revalidate every 10 minutes
export const revalidate = 600;

async function getArticles(): Promise<Article[]> {
  const allArticles: Article[] = [];

  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, { next: { revalidate: 600 } });
      if (!res.ok) continue;
      const xml = await res.text();
      const articles = parseRSSFeed(xml, feed);
      allArticles.push(...articles);
    } catch (err) {
      console.error(`Failed to fetch feed ${feed.source}:`, err);
    }
  }

  allArticles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return allArticles;
}

export default async function ReadPage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            FREE ARTICLES
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            READ
          </h1>
          <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl">
            Every free article from both publications. No algorithm. No paywall nags.
            No pop-ups. Just the words.
          </p>
        </div>
      </div>

      {/* Articles */}
      <ArticleGrid articles={articles} />
    </main>
  );
}
