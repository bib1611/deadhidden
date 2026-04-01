import { NextResponse } from 'next/server';

// Cache content for 1 hour
const contentCache = new Map<string, { html: string; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url || (!url.includes('substack.com/p/') && !url.includes('followme419.substack.com'))) {
    return NextResponse.json({ error: 'Invalid article URL' }, { status: 400 });
  }

  // Check cache
  const cached = contentCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json({ html: cached.html });
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'DeadHidden/1.0' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch article' }, { status: 502 });
    }

    const html = await res.text();

    // Extract the article body content
    // Substack wraps article content in a div with class "body markup"
    const bodyMatch = html.match(
      /<div[^>]*class="[^"]*body markup[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*(?:<div[^>]*class="[^"]*post-footer|<div[^>]*class="[^"]*subscription-widget)/
    );

    let articleHtml = '';

    if (bodyMatch) {
      articleHtml = bodyMatch[1];
    } else {
      // Fallback: try to find content between available-content markers
      const contentMatch = html.match(
        /<div[^>]*class="[^"]*available-content[^"]*"[^>]*>([\s\S]*?)<div[^>]*class="[^"]*(?:subscription-widget|paywall-)/
      );
      if (contentMatch) {
        articleHtml = contentMatch[1];
      }
    }

    if (!articleHtml) {
      // Last resort: extract from content:encoded in page JSON
      const jsonMatch = html.match(/"body_html"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      if (jsonMatch) {
        articleHtml = JSON.parse(`"${jsonMatch[1]}"`);
      }
    }

    // Clean up the HTML
    articleHtml = cleanArticleHtml(articleHtml);

    // Cache it
    contentCache.set(url, { html: articleHtml, timestamp: Date.now() });

    return NextResponse.json({ html: articleHtml });
  } catch (err) {
    console.error('Error fetching article content:', err);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

function cleanArticleHtml(html: string): string {
  return html
    // Remove Substack-specific buttons and widgets
    .replace(/<div[^>]*class="[^"]*subscription-widget[^"]*"[\s\S]*?<\/div>/g, '')
    .replace(/<div[^>]*class="[^"]*paywall[^"]*"[\s\S]*?<\/div>/g, '')
    .replace(/<div[^>]*class="[^"]*captioned-button[^"]*"[\s\S]*?<\/div>\s*<\/div>/g, '')
    // Remove share buttons
    .replace(/<div[^>]*class="[^"]*share[^"]*"[\s\S]*?<\/div>/g, '')
    // Remove like/comment buttons
    .replace(/<div[^>]*class="[^"]*like-button[^"]*"[\s\S]*?<\/div>/g, '')
    // Remove restack buttons
    .replace(/<button[^>]*class="[^"]*restack[^"]*"[\s\S]*?<\/button>/g, '')
    // Fix image srcset to use highest quality
    .replace(/srcset="[^"]*"/g, '')
    // Clean data attributes
    .replace(/data-attrs="[^"]*"/g, '')
    .replace(/data-component-name="[^"]*"/g, '')
    // Remove empty figure captions
    .replace(/<figcaption[^>]*>\s*<\/figcaption>/g, '')
    .trim();
}
