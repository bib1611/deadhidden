import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FEEDS, parseRSSFeed, type Article } from '@/lib/articles';
import { ArticleReader } from './ArticleReader';

export const revalidate = 600;

// Build the Substack URL from slug + source
function getSubstackUrl(slug: string, source: string): string {
  if (source === 'dead-hidden') {
    return `https://followme419.substack.com/p/${slug}`;
  }
  return `https://biblicalman.substack.com/p/${slug}`;
}

async function getAllArticles(): Promise<Article[]> {
  const allArticles: Article[] = [];
  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, { next: { revalidate: 600 } });
      if (!res.ok) continue;
      const xml = await res.text();
      allArticles.push(...parseRSSFeed(xml, feed));
    } catch {
      // skip failed feeds
    }
  }
  return allArticles;
}

async function fetchArticleContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'DeadHidden/1.0' },
    });
    if (!res.ok) return '';
    const html = await res.text();

    // Strategy 1: Find the body_json or body_html in the page's __NEXT_DATA__
    const nextDataMatch = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      try {
        const data = JSON.parse(nextDataMatch[1]);
        const post = data?.props?.pageProps?.post;
        if (post?.body_html) {
          return cleanHtml(post.body_html);
        }
      } catch {
        // fall through
      }
    }

    // Strategy 2: Extract from body markup div
    const bodyMatch = html.match(
      /<div[^>]*class="[^"]*body markup[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]*class="[^"]*(?:post-footer|subscription-widget))/
    );
    if (bodyMatch) {
      return cleanHtml(bodyMatch[1]);
    }

    // Strategy 3: available-content
    const availMatch = html.match(
      /<div[^>]*class="[^"]*available-content[^"]*"[^>]*>([\s\S]*?)<div[^>]*class="[^"]*subscription-widget/
    );
    if (availMatch) {
      return cleanHtml(availMatch[1]);
    }

    return '';
  } catch {
    return '';
  }
}

function cleanHtml(html: string): string {
  return html
    // Remove subscribe widgets (greedy — they nest deep)
    .replace(/<div[^>]*class="[^"]*subscribe-widget[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g, '')
    .replace(/<div[^>]*class="[^"]*subscription-widget[^"]*"[\s\S]*$/g, '')
    .replace(/<div[^>]*class="[^"]*paywall[^"]*"[\s\S]*?<\/div>/g, '')
    .replace(/<button[^>]*class="[^"]*restack[^"]*"[\s\S]*?<\/button>/g, '')
    .replace(/<div[^>]*class="[^"]*like-button[^"]*"[\s\S]*?<\/div>/g, '')
    // Remove share buttons
    .replace(/<p[^>]*class="[^"]*button-wrapper[^"]*"[\s\S]*?<\/p>/g, '')
    // Remove visibility-check divs
    .replace(/<div[^>]*class="[^"]*visibility-check[^"]*"[\s\S]*?<\/div>/g, '')
    .replace(/data-attrs="[^"]*"/g, '')
    .replace(/data-component-name="[^"]*"/g, '')
    .replace(/<figcaption[^>]*>\s*<\/figcaption>/g, '')
    .trim();
}

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const source = (sp.source as string) || 'dead-hidden';
  const articles = await getAllArticles();
  const article = articles.find((a) => a.slug === slug && a.source === source)
    || articles.find((a) => a.slug === slug);

  if (!article) {
    return { title: 'Article Not Found | Dead Hidden' };
  }

  return {
    title: `${article.title} | Dead Hidden`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      ...(article.imageUrl && { images: [article.imageUrl] }),
    },
  };
}

export default async function ArticlePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const source = (sp.source as string) || 'dead-hidden';

  const articles = await getAllArticles();
  const article = articles.find((a) => a.slug === slug && a.source === source)
    || articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const substackUrl = getSubstackUrl(slug, article.source);
  const contentHtml = await fetchArticleContent(substackUrl);

  return (
    <ArticleReader
      article={article}
      contentHtml={contentHtml}
      substackUrl={substackUrl}
    />
  );
}
