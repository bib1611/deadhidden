import { NextResponse } from 'next/server';
import { FEEDS, parseRSSFeed, type Article } from '@/lib/articles';

// Cache articles for 10 minutes
let cachedArticles: Article[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function fetchAllArticles(): Promise<Article[]> {
  const now = Date.now();
  if (cachedArticles && now - cacheTimestamp < CACHE_DURATION) {
    return cachedArticles;
  }

  const allArticles: Article[] = [];

  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, {
        next: { revalidate: 600 },
        headers: { 'User-Agent': 'DeadHidden/1.0' },
      });

      if (!res.ok) continue;

      const xml = await res.text();
      const articles = parseRSSFeed(xml, feed);
      allArticles.push(...articles);
    } catch (err) {
      console.error(`Failed to fetch feed ${feed.source}:`, err);
    }
  }

  // Sort by date, newest first
  allArticles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  cachedArticles = allArticles;
  cacheTimestamp = now;

  return allArticles;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source'); // 'dead-hidden' | 'biblical-man' | null (all)
  const slug = searchParams.get('slug'); // specific article

  const articles = await fetchAllArticles();

  if (slug) {
    const article = articles.find((a) => a.slug === slug);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  }

  const filtered = source
    ? articles.filter((a) => a.source === source)
    : articles;

  return NextResponse.json(filtered);
}
