'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics';

type ArticleSource = 'dead-hidden' | 'biblical-man' | 'biblical-womanhood';

interface ProductRecommendation {
  slug: string;
  name: string;
  description: string;
  price: string;
}

// Keyword-based product mapping
const KEYWORD_PRODUCT_MAP: Array<{
  keywords: string[];
  products: ProductRecommendation[];
}> = [
  {
    keywords: ['marriage', 'husband', 'wife', 'wives', 'married', 'covenant', 'wedding', 'spouse', 'intimacy'],
    products: [
      { slug: 'kings-marriage-manual-red', name: "THE KING'S MARRIAGE MANUAL", description: 'Biblical headship, intimacy, and covenant conflict — the uncut version.', price: '$47' },
      { slug: 'headship-manual', name: 'THE HEADSHIP MANUAL', description: 'The doctrine of biblical headship for men who are ready to own it.', price: '$37' },
    ],
  },
  {
    keywords: ['masculinity', 'manhood', 'strength', 'man', 'men', 'masculine', 'warrior', 'soldier', 'fight', 'battle'],
    products: [
      { slug: 'caged', name: 'CAGED', description: 'Break free from the cage modern Christianity built around your manhood.', price: '$37' },
      { slug: 'kings-conquest', name: "THE KING'S CONQUEST", description: 'The complete masculinity framework. 47 pages of war doctrine.', price: '$47' },
    ],
  },
  {
    keywords: ['bible', 'scripture', 'kjv', 'study', 'word', 'verse', 'proverbs', 'psalm', 'genesis', 'revelation', 'doctrine'],
    products: [
      { slug: 'how-to-study-bible', name: 'HOW TO STUDY THE BIBLE', description: 'The system that turns passive readers into active students of the Word.', price: '$7' },
      { slug: 'darkest-proverbs', name: 'THE DARKEST PROVERBS', description: 'The Proverbs your pastor skipped. The ones that cut.', price: '$17' },
    ],
  },
  {
    keywords: ['spiritual warfare', 'demon', 'satan', 'devil', 'enemy', 'deliverance', 'torment', 'anxiety', 'depression', 'mental', 'oppression'],
    products: [
      { slug: 'exposing-the-enemy', name: 'EXPOSING THE ENEMY', description: 'Name the enemy. Learn his tactics. Shut him down.', price: '$7' },
      { slug: 'overcoming-mental-torment', name: 'OVERCOMING MENTAL TORMENT', description: 'The biblical protocol for breaking free from anxiety, depression, and spiritual oppression.', price: '$59.99' },
    ],
  },
  {
    keywords: ['parent', 'parenting', 'kid', 'kids', 'child', 'children', 'son', 'sons', 'daughter', 'daughters', 'raising', 'teach'],
    products: [
      { slug: 'before-the-world-does', name: 'BEFORE THE WORLD DOES', description: 'Get to your kids before the culture does.', price: '$49.99' },
      { slug: 'absalom-protocol', name: 'THE ABSALOM PROTOCOL', description: "When your child turns away. The biblical father's response.", price: '$27' },
    ],
  },
  {
    keywords: ['womanhood', 'homemaking', 'mother', 'homemaker', 'feminine', 'virtue', 'proverbs 31', 'titus 2', 'submission', 'modest'],
    products: [
      { slug: 'traditional-biblical-homemaking', name: 'TRADITIONAL BIBLICAL HOMEMAKING', description: "God's design for the home. No feminist filter.", price: '$32.95' },
      { slug: 'biblical-womanhood-bundle', name: 'THE BIBLICAL WOMANHOOD BUNDLE', description: "Christie's complete womanhood library. Everything in one package.", price: '$97' },
    ],
  },
  {
    keywords: ['faith', 'doubt', 'prayer', 'believe', 'trust', 'hope', 'fear', 'salvation', 'grace'],
    products: [
      { slug: 'fourth-answer', name: 'THE FOURTH ANSWER', description: 'When God says no, wait, yes — and the answer nobody talks about.', price: '$37' },
      { slug: 'give-me-something-to-believe-in', name: 'GIVE ME SOMETHING TO BELIEVE IN', description: 'For the believer hanging on by a thread.', price: '$5' },
    ],
  },
];

// Fallback products
const FALLBACK_PRODUCTS: ProductRecommendation[] = [
  { slug: 'vault-sampler', name: 'THE VAULT SAMPLER', description: 'Taste the arsenal before you buy it. A curated selection from The Vault.', price: '$7' },
  { slug: 'how-to-study-bible', name: 'HOW TO STUDY THE BIBLE', description: 'The system that turns passive readers into active students of the Word.', price: '$7' },
];

// Source-based default mapping
const SOURCE_DEFAULTS: Record<ArticleSource, ProductRecommendation[]> = {
  'dead-hidden': [
    { slug: 'how-to-study-bible', name: 'HOW TO STUDY THE BIBLE', description: 'The system that turns passive readers into active students of the Word.', price: '$7' },
    { slug: 'exposing-the-enemy', name: 'EXPOSING THE ENEMY', description: 'Name the enemy. Learn his tactics. Shut him down.', price: '$7' },
  ],
  'biblical-man': [
    { slug: 'caged', name: 'CAGED', description: 'Break free from the cage modern Christianity built around your manhood.', price: '$37' },
    { slug: 'kings-marriage-manual-red', name: "THE KING'S MARRIAGE MANUAL", description: 'Biblical headship, intimacy, and covenant conflict — the uncut version.', price: '$47' },
  ],
  'biblical-womanhood': [
    { slug: 'traditional-biblical-homemaking', name: 'TRADITIONAL BIBLICAL HOMEMAKING', description: "God's design for the home. No feminist filter.", price: '$32.95' },
    { slug: 'biblical-womanhood-bundle', name: 'THE BIBLICAL WOMANHOOD BUNDLE', description: "Christie's complete womanhood library. Everything in one package.", price: '$97' },
  ],
};

function getRecommendations(
  title: string,
  description: string,
  source: ArticleSource,
): ProductRecommendation[] {
  const text = `${title} ${description}`.toLowerCase();

  // Score each keyword group
  let bestMatch: { products: ProductRecommendation[]; score: number } = { products: [], score: 0 };

  for (const group of KEYWORD_PRODUCT_MAP) {
    const score = group.keywords.reduce((acc, kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      const matches = text.match(regex);
      return acc + (matches ? matches.length : 0);
    }, 0);

    if (score > bestMatch.score) {
      bestMatch = { products: group.products, score };
    }
  }

  if (bestMatch.score > 0) return bestMatch.products;

  // Fall back to source-based defaults
  return SOURCE_DEFAULTS[source] || FALLBACK_PRODUCTS;
}

export function ArticleCTA({
  title,
  description,
  source,
  position,
}: {
  title: string;
  description: string;
  source: ArticleSource;
  position: 'mid' | 'end';
}) {
  const products = getRecommendations(title, description, source);
  const product = position === 'mid' ? products[0] : products[products.length > 1 ? 1 : 0];

  if (!product) return null;

  return (
    <div className="my-10 bg-[#111] border border-[#222] p-6" style={{ borderLeft: '3px solid #8b0000' }}>
      <p
        className="text-[10px] tracking-[0.2em] uppercase text-[#8b0000] font-bold mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {position === 'mid' ? 'GO DEEPER' : 'RECOMMENDED'}
      </p>
      <h4
        className="text-lg uppercase font-bold text-[#e8e0d0] mb-2"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {product.name}
      </h4>
      <p className="text-sm text-[#888] mb-4 leading-relaxed">
        {product.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[#8b0000] font-bold text-lg">{product.price}</span>
        <Link
          href={`/store/${product.slug}`}
          onClick={() => {
            track('cta_click', {
              product: product.slug,
              location: `article_${position}`,
              price: product.price.replace('$', ''),
            });
          }}
          className="bg-[#8b0000] text-[#e8e0d0] px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          GET THIS RESOURCE →
        </Link>
      </div>
    </div>
  );
}

export function VaultBanner() {
  return (
    <div className="my-10 bg-[#111] border border-[#8b0000]/40 p-6 text-center">
      <p
        className="text-[10px] tracking-[0.2em] uppercase text-[#8b0000] font-bold mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        WANT EVERYTHING?
      </p>
      <h4
        className="text-xl uppercase font-bold text-[#e8e0d0] mb-2"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        THE BIBLICAL MAN VAULT
      </h4>
      <p className="text-sm text-[#888] mb-4">
        76 resources. Every guide, manual, and protocol. One price. <span className="text-[#e8e0d0] font-semibold">$365</span>
      </p>
      <Link
        href="/store/the-vault"
        onClick={() => {
          track('cta_click', {
            product: 'the-vault',
            location: 'article_vault_banner',
            price: '365',
          });
        }}
        className="inline-block bg-[#8b0000] text-[#e8e0d0] px-8 py-3 text-xs uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        CLAIM THE FULL ARSENAL →
      </Link>
    </div>
  );
}
