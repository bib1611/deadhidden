---
name: seo
description: Audit and optimize SEO for Next.js App Router sites. Use when user mentions SEO, search visibility, meta tags, schema markup, sitemap, robots.txt, Open Graph, search rankings, Google indexing, or wants their site to show up in search results. Also trigger on "why can't people find my site" or any search discoverability concern. Covers technical SEO, on-page optimization, structured data, and content signals.
---

# SEO Skill — Next.js App Router Optimization

Comprehensive SEO audit and optimization tool for Next.js App Router sites deployed on Vercel. No external APIs required. Reads your codebase, audits the live site, reports what's missing, and fixes it.

## Site Context

- **Domain**: deadhidden.org
- **Framework**: Next.js 16+ with App Router
- **Deployment**: Vercel (bib1611s-projects)
- **Brand**: Dead Hidden / The Biblical Man
- **Target queries**: "biblical masculinity", "christian men guides", "KJV bible study", "dead hidden", "the biblical man", "Adam Johnsson"
- **Social**: @SlayStupidity (X/Twitter), @thebiblicalman (YouTube)

---

## When Invoked

1. Read all `page.tsx`, `layout.tsx`, and route files in `src/app/`
2. Check for `robots.ts`, `sitemap.ts`, `manifest.ts` in `src/app/`
3. Audit the live site via Chrome CDP or fetch
4. Output pass/fail table
5. Fix what's missing

---

## 1. Next.js Metadata API (Per-Page)

Every `page.tsx` must export a `metadata` object or `generateMetadata` function:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Dead Hidden',
  description: 'Unique description, 150-160 chars, includes target keywords',
  alternates: {
    canonical: 'https://deadhidden.org/page-path',
  },
  openGraph: {
    title: 'Page Title',
    description: 'Same or adapted description',
    url: 'https://deadhidden.org/page-path',
    siteName: 'Dead Hidden',
    type: 'website', // or 'article' for posts
    images: [{
      url: 'https://deadhidden.org/images/og-default.png',
      width: 1200,
      height: 630,
      alt: 'Dead Hidden',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SlayStupidity',
    creator: '@SlayStupidity',
    title: 'Page Title',
    description: 'Description',
    images: ['https://deadhidden.org/images/og-default.png'],
  },
};
```

**Rules:**
- Title: 50-60 chars. Format: `Page Name | Dead Hidden`
- Description: 150-160 chars, unique per page, include relevant keywords
- OG image: 1200x630px, real image (not placeholder)
- Canonical URL: must match actual deployed URL exactly
- Every dynamic route (`[slug]`) must use `generateMetadata`

## 2. Root Layout Metadata

`src/app/layout.tsx` should set defaults:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://deadhidden.org'),
  title: {
    default: 'Dead Hidden',
    template: '%s | Dead Hidden',
  },
  description: 'The things they buried. The documents they don\'t want you to read.',
  openGraph: { /* defaults */ },
  twitter: { /* defaults */ },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

## 3. Structured Data (JSON-LD)

Add JSON-LD via a component or directly in layouts/pages:

**Homepage — Organization + WebSite:**
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Dead Hidden',
      url: 'https://deadhidden.org',
      logo: 'https://deadhidden.org/images/logo.png',
      founder: {
        '@type': 'Person',
        name: 'Adam Johnsson',
        alternateName: 'The Biblical Man',
        url: 'https://deadhidden.org/about',
        sameAs: [
          'https://x.com/SlayStupidity',
          'https://www.youtube.com/@thebiblicalman',
          'https://biblicalman.substack.com',
          'https://followme419.substack.com',
        ],
      },
      sameAs: [
        'https://x.com/SlayStupidity',
        'https://www.youtube.com/@thebiblicalman',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Dead Hidden',
      url: 'https://deadhidden.org',
    },
  ],
};

// In page component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Product pages — Product schema:**
```typescript
{
  '@type': 'Product',
  name: product.title,
  description: product.description,
  url: `https://deadhidden.org/store/${product.slug}`,
  brand: { '@type': 'Brand', name: 'Dead Hidden' },
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `https://deadhidden.org/store/${product.slug}`,
  },
}
```

**Article reader pages — Article schema:**
```typescript
{
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  datePublished: article.pubDate,
  author: {
    '@type': 'Person',
    name: 'Adam Johnsson',
    url: 'https://deadhidden.org/about',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Dead Hidden',
    logo: { '@type': 'ImageObject', url: 'https://deadhidden.org/images/logo.png' },
  },
  mainEntityOfPage: `https://deadhidden.org/read/${article.slug}`,
}
```

## 4. robots.ts (App Router)

Create `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/success'],
      },
    ],
    sitemap: 'https://deadhidden.org/sitemap.xml',
  };
}
```

## 5. sitemap.ts (App Router)

Create `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: 'https://deadhidden.org', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: 'https://deadhidden.org/store', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: 'https://deadhidden.org/read', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://deadhidden.org/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://deadhidden.org/publications', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: 'https://deadhidden.org/refund-policy', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // Add dynamic product pages
  // Add dynamic article pages from RSS feeds

  return [...staticPages, ...dynamicPages];
}
```

Include ALL indexable pages. Update when new products/articles are added.

## 6. Image SEO

- All `<img>` tags need descriptive `alt` text
- Use Next.js `<Image>` component for automatic optimization
- OG images: 1200x630px, WebP or JPEG
- Add `loading="lazy"` to below-fold images (Next.js Image does this by default)
- Keep images under 200KB where possible

## 7. Content & Heading Structure

- **H1 tags:** One per page, includes target keywords
- **Heading hierarchy:** h1 > h2 > h3, no skipping levels
- **Internal linking:** Pages should cross-link (store → read, read → store, about → both)
- **Keyword placement:** Target keywords in H1, first paragraph, meta description
- **Content depth:** Product pages need 100+ words of description for indexing

## 8. Technical Performance

- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Font loading:** Use `display=swap` on Google Fonts (already present)
- **CSS:** Minimal, critical CSS inlined by Next.js
- **JavaScript:** Server Components by default = minimal client JS
- **HTTPS:** All internal links/resources use https://
- **Mobile responsive:** Viewport meta present, responsive layout

## 9. Quick Audit Output Format

```
| Check                  | Status | Notes                          |
|------------------------|--------|--------------------------------|
| Page titles            | ✅/❌  | [details]                     |
| Meta descriptions      | ✅/❌  | [details]                     |
| OG tags                | ✅/❌  | [details]                     |
| Twitter cards          | ✅/❌  | [details]                     |
| Canonical URLs         | ✅/❌  | [details]                     |
| JSON-LD schema         | ✅/❌  | [details]                     |
| robots.txt             | ✅/❌  | [details]                     |
| sitemap.xml            | ✅/❌  | [details]                     |
| Image alt text         | ✅/❌  | [details]                     |
| H1 structure           | ✅/❌  | [details]                     |
| Internal linking       | ✅/❌  | [details]                     |
| Mobile viewport        | ✅/❌  | [details]                     |
| HTTPS enforcement      | ✅/❌  | [details]                     |
| Page speed indicators  | ✅/❌  | [details]                     |
```

## 10. Post-Audit Actions

After fixing issues:
1. Deploy and verify `/robots.txt` and `/sitemap.xml` are accessible
2. Test OG tags by sharing a link on X/Discord and checking the preview card
3. Submit sitemap in Google Search Console
4. Monitor `site:deadhidden.org` for indexing progress
5. Use Chrome Lighthouse for performance scoring
6. Validate structured data at https://validator.schema.org/ or Google's Rich Results Test

## 11. Google Search Console Setup

1. Add property for `deadhidden.org`
2. Verify via DNS TXT record at IONOS
3. Submit sitemap URL: `https://deadhidden.org/sitemap.xml`
4. Monitor Coverage report for indexing issues
5. Check Performance report for search query data

---

## Priority Order for Fixes

1. **robots.ts + sitemap.ts** — Google can't index what it can't find
2. **JSON-LD structured data** — Rich results in search
3. **OG images** — Social sharing previews
4. **Canonical URLs** — Prevent duplicate content
5. **Meta descriptions** — Click-through rates
6. **Internal linking** — Crawl depth and link equity
7. **Image alt text** — Accessibility + image search
8. **Performance** — Core Web Vitals affect rankings
