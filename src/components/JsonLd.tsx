// JSON-LD structured data components for SEO

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://deadhidden.org/#organization',
        name: 'Dead Hidden Ministries',
        url: 'https://deadhidden.org',
        logo: {
          '@type': 'ImageObject',
          url: 'https://deadhidden.org/images/logo.png',
        },
        founder: {
          '@type': 'Person',
          name: 'Adam Johnsson',
          alternateName: 'The Biblical Man',
          url: 'https://deadhidden.org/about',
          jobTitle: 'Founder & Teacher',
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
          'https://biblicalman.substack.com',
          'https://followme419.substack.com',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://deadhidden.org/#website',
        name: 'Dead Hidden Ministries',
        url: 'https://deadhidden.org',
        publisher: { '@id': 'https://deadhidden.org/#organization' },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  slug,
  price,
  image,
}: {
  name: string;
  description: string;
  slug: string;
  price: number;
  image?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: `https://deadhidden.org/store/${slug}`,
    brand: { '@type': 'Brand', name: 'Dead Hidden' },
    ...(image && { image }),
    offers: {
      '@type': 'Offer',
      price: (price / 100).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://deadhidden.org/store/${slug}`,
      seller: { '@id': 'https://deadhidden.org/#organization' },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  pubDate,
  imageUrl,
  source,
}: {
  title: string;
  description: string;
  slug: string;
  pubDate: string;
  imageUrl?: string | null;
  source: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: new Date(pubDate).toISOString(),
    url: `https://deadhidden.org/read/${slug}?source=${source}`,
    ...(imageUrl && { image: imageUrl }),
    author: {
      '@type': 'Person',
      name: 'Adam Johnsson',
      url: 'https://deadhidden.org/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dead Hidden',
      logo: {
        '@type': 'ImageObject',
        url: 'https://deadhidden.org/images/logo.png',
      },
    },
    mainEntityOfPage: `https://deadhidden.org/read/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
