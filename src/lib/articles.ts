// Types and utilities for article fetching from Substack RSS feeds

export interface Article {
  title: string;
  slug: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl: string | null;
  source: 'dead-hidden' | 'biblical-man' | 'biblical-womanhood';
  sourceName: string;
  contentHtml?: string;
}

export interface FeedConfig {
  url: string;
  source: Article['source'];
  sourceName: string;
}

export const FEEDS: FeedConfig[] = [
  {
    url: 'https://followme419.substack.com/feed',
    source: 'dead-hidden',
    sourceName: 'Dead Hidden',
  },
  {
    url: 'https://biblicalman.substack.com/feed',
    source: 'biblical-man',
    sourceName: 'The Biblical Man',
  },
  {
    url: 'https://biblicalwomanhood.substack.com/feed',
    source: 'biblical-womanhood',
    sourceName: 'Biblical Womanhood',
  },
];

// Extract slug from Substack URL
export function extractSlug(url: string): string {
  const match = url.match(/\/p\/([^/?#]+)/);
  return match ? match[1] : '';
}

// Filter out non-article items (lives, tests, podcasts-only)
export function isArticle(item: { title: string; description: string; imageUrl: string | null }): boolean {
  const title = item.title.toLowerCase();
  const desc = item.description.toLowerCase();

  // Skip live recordings
  if (title.startsWith('live with biblical man')) return false;
  if (title.startsWith('going live')) return false;

  // Skip test posts
  if (title === 'did you get this?' || title === 'are you getting this???') return false;
  if (desc === 'just a test' || desc === 'bad day.') return false;

  // Skip podcast-only items (mp3 enclosures with no real description)
  if (item.imageUrl?.includes('.mp3') && desc.length < 60) return false;

  return true;
}

// Parse RSS XML string into articles
export function parseRSSFeed(xml: string, config: FeedConfig): Article[] {
  const articles: Article[] = [];

  // Match all <item> blocks
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const title = extractCDATA(itemXml, 'title') || extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const pubDate = extractTag(itemXml, 'pubDate');
    const description = extractCDATA(itemXml, 'description') || extractTag(itemXml, 'description');

    // Get image from enclosure
    const enclosureMatch = itemXml.match(/<enclosure[^>]+url="([^"]+)"[^>]*type="image/);
    const imageUrl = enclosureMatch ? enclosureMatch[1] : null;

    const slug = extractSlug(link);

    if (!title || !link || !slug) continue;

    const article: Article = {
      title: decodeEntities(title),
      slug,
      link,
      pubDate,
      description: decodeEntities(description),
      imageUrl,
      source: config.source,
      sourceName: config.sourceName,
    };

    if (isArticle(article)) {
      articles.push(article);
    }
  }

  return articles;
}

function extractCDATA(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
