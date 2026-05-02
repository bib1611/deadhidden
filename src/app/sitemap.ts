import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { discoveryCategories } from '@/data/discovery';
import { blogPosts } from '@/data/blog-posts';
import { FEEDS, parseRSSFeed } from '@/lib/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://deadhidden.org';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/store`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/faithwall`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/read`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/publications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/refund-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/where-to-begin`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/support`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/wars-and-rumors-of-wars`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/store/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p.isFeatured ? 0.8 : 0.7,
  }));

  // Discovery category pages
  const discoveryPages: MetadataRoute.Sitemap = discoveryCategories.map((cat) => ({
    url: `${base}/where-to-begin/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Article pages from RSS feeds
  const articlePages: MetadataRoute.Sitemap = [];
  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, { next: { revalidate: 3600 } });
      if (!res.ok) continue;
      const xml = await res.text();
      const articles = parseRSSFeed(xml, feed);
      for (const article of articles) {
        articlePages.push({
          url: `${base}/read/${article.slug}?source=${article.source}`,
          lastModified: new Date(article.pubDate),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        });
      }
    } catch {
      // skip failed feeds
    }
  }

  return [...staticPages, ...productPages, ...discoveryPages, ...blogPages, ...articlePages];
}
