export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  keywords: string[];
  category:
    | 'bible-study'
    | 'biblical-masculinity'
    | 'marriage'
    | 'biblical-womanhood'
    | 'spiritual-warfare'
    | 'parenting'
    | 'sexual-purity';
  publishDate: string;
  updatedDate?: string;
  author: 'adam' | 'christie';
  linkedProducts: string[];
  productLinks: { slug: string; placement: 'inline' | 'end' }[];
  wordCount: number;
  readingTime: number;
  featured: boolean;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-study-the-bible-kjv',
    title: 'How to Study the Bible in the KJV: A Step-by-Step Method That Actually Works',
    metaDescription:
      "Most Christians read the Bible. Few actually study it. Here's a step-by-step KJV Bible study method that builds doctrine, not just feelings. No seminary required.",
    primaryKeyword: 'how to study the Bible KJV',
    secondaryKeywords: [
      'KJV Bible study method',
      'how to read the King James Bible',
      'how to study scripture for yourself',
      'KJV only Bible study guide',
    ],
    keywords: [
      'how to study the Bible KJV',
      'KJV Bible study method',
      'how to read the King James Bible',
      'Bible study',
      'scripture study',
      'King James Version',
    ],
    category: 'bible-study',
    publishDate: '2026-04-07',
    author: 'adam',
    linkedProducts: ['how-to-study-bible', 'bible-reading-protocol-2026', 'romans-nuclear-truth', 'the-vault'],
    productLinks: [
      { slug: 'how-to-study-bible', placement: 'inline' },
      { slug: 'bible-reading-protocol-2026', placement: 'inline' },
      { slug: 'romans-nuclear-truth', placement: 'inline' },
      { slug: 'the-vault', placement: 'end' },
    ],
    wordCount: 2800,
    readingTime: 12,
    featured: true,
    content: '<p>Content coming soon.</p>',
  },
  {
    slug: 'what-is-biblical-masculinity',
    title:
      'What Is Biblical Masculinity? The Definition the Modern Church Is Afraid to Give You',
    metaDescription:
      "Biblical masculinity isn't toxic or tender — it's a specific design from God. Here's what the KJV actually says about what it means to be a man.",
    primaryKeyword: 'what is biblical masculinity',
    secondaryKeywords: [
      'biblical manhood definition',
      'what the Bible says about being a man',
      'biblical masculinity KJV',
      'definition of a godly man',
    ],
    keywords: [
      'what is biblical masculinity',
      'biblical manhood',
      'godly man',
      'masculinity Bible',
      'KJV masculinity',
      'biblical manhood definition',
    ],
    category: 'biblical-masculinity',
    publishDate: '2026-04-14',
    author: 'adam',
    linkedProducts: ['5-deceptions', 'headship-manual', 'biblical-masculinity', 'kings-conquest', 'the-vault'],
    productLinks: [
      { slug: '5-deceptions', placement: 'inline' },
      { slug: 'headship-manual', placement: 'inline' },
      { slug: 'biblical-masculinity', placement: 'inline' },
      { slug: 'kings-conquest', placement: 'inline' },
      { slug: 'the-vault', placement: 'end' },
    ],
    wordCount: 3200,
    readingTime: 14,
    featured: true,
    content: '<p>Content coming soon.</p>',
  },
  {
    slug: 'biblical-headship-husband-wife-kjv',
    title: 'Biblical Headship: What the KJV Actually Teaches (And What Your Church Got Wrong)',
    metaDescription:
      "Ephesians 5 is the most misread passage in the Bible. Here's what biblical headship actually means, what it demands of husbands, and how to live it.",
    primaryKeyword: 'biblical headship husband wife',
    secondaryKeywords: [
      'what is biblical headship',
      'husband head of wife Bible',
      'Ephesians 5 headship meaning',
      'complementarian marriage KJV',
    ],
    keywords: [
      'biblical headship',
      'husband wife KJV',
      'headship marriage',
      'Ephesians 5',
      'complementarian marriage',
      'biblical marriage roles',
    ],
    category: 'marriage',
    publishDate: '2026-04-21',
    author: 'adam',
    linkedProducts: ['queens-guide', 'headship-manual', 'kings-marriage-manual-red', 'misogynist-test', 'the-vault'],
    productLinks: [
      { slug: 'queens-guide', placement: 'inline' },
      { slug: 'headship-manual', placement: 'inline' },
      { slug: 'kings-marriage-manual-red', placement: 'inline' },
      { slug: 'misogynist-test', placement: 'inline' },
      { slug: 'the-vault', placement: 'end' },
    ],
    wordCount: 3400,
    readingTime: 15,
    featured: true,
    content: '<p>Content coming soon.</p>',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getRelatedBlogPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return blogPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export const BLOG_CATEGORIES = {
  'bible-study': { label: 'Bible Study', slug: 'bible-study' },
  'biblical-masculinity': { label: 'Biblical Masculinity', slug: 'biblical-masculinity' },
  marriage: { label: 'Marriage', slug: 'marriage' },
  'biblical-womanhood': { label: 'Biblical Womanhood', slug: 'biblical-womanhood' },
  'spiritual-warfare': { label: 'Spiritual Warfare', slug: 'spiritual-warfare' },
  parenting: { label: 'Parenting', slug: 'parenting' },
  'sexual-purity': { label: 'Sexual Purity', slug: 'sexual-purity' },
} as const;

export const AUTHOR_DISPLAY: Record<BlogPost['author'], string> = {
  adam: 'Dead Hidden Team',
  christie: 'Dead Hidden Team',
};
