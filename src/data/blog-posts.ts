export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
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
  author: 'Adam Johnson' | 'Christie Johnson' | 'Adam & Christie Johnson';
  linkedProducts: string[];
  wordCount: number;
  featured: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-study-the-bible-kjv',
    title: 'How to Study the Bible in the KJV: A Step-by-Step Method That Actually Works',
    metaDescription:
      'Most Christians read the Bible. Few actually study it. Here\'s a step-by-step KJV Bible study method that builds doctrine, not just feelings. No seminary required.',
    primaryKeyword: 'how to study the Bible KJV',
    secondaryKeywords: [
      'KJV Bible study method',
      'how to read the King James Bible',
      'how to study scripture for yourself',
      'KJV only Bible study guide',
    ],
    category: 'bible-study',
    publishDate: '2026-04-07',
    author: 'Adam Johnson',
    linkedProducts: ['how-to-study-bible', 'the-vault'],
    wordCount: 2500,
    featured: true,
  },
  {
    slug: 'what-is-biblical-masculinity',
    title:
      'What Is Biblical Masculinity? The Definition the Modern Church Is Afraid to Give You',
    metaDescription:
      'Biblical masculinity isn\'t toxic or tender — it\'s a specific design from God. Here\'s what the KJV actually says about what it means to be a man.',
    primaryKeyword: 'what is biblical masculinity',
    secondaryKeywords: [
      'biblical manhood definition',
      'what the Bible says about being a man',
      'biblical masculinity KJV',
      'definition of a godly man',
    ],
    category: 'biblical-masculinity',
    publishDate: '2026-04-14',
    author: 'Adam Johnson',
    linkedProducts: ['headship-manual', 'the-vault'],
    wordCount: 2400,
    featured: true,
  },
  {
    slug: 'biblical-headship-husband-wife',
    title:
      'Biblical Headship Explained: What God Actually Requires of Husbands and Wives',
    metaDescription:
      'Biblical headship isn\'t abuse or control — it\'s a specific structure God designed for marriage. Here\'s what the KJV says, without the modern church\'s filter.',
    primaryKeyword: 'biblical headship husband wife',
    secondaryKeywords: [
      'what is biblical headship',
      'husband head of wife Bible',
      'Ephesians 5 headship meaning',
      'complementarian marriage KJV',
    ],
    category: 'marriage',
    publishDate: '2026-04-21',
    author: 'Adam & Christie Johnson',
    linkedProducts: ['kings-marriage-manual-red', 'headship-manual', 'the-vault'],
    wordCount: 2600,
    featured: true,
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

export const BLOG_CATEGORIES = {
  'bible-study': { label: 'Bible Study', slug: 'bible-study' },
  'biblical-masculinity': { label: 'Biblical Masculinity', slug: 'biblical-masculinity' },
  marriage: { label: 'Marriage', slug: 'marriage' },
  'biblical-womanhood': { label: 'Biblical Womanhood', slug: 'biblical-womanhood' },
  'spiritual-warfare': { label: 'Spiritual Warfare', slug: 'spiritual-warfare' },
  parenting: { label: 'Parenting', slug: 'parenting' },
  'sexual-purity': { label: 'Sexual Purity', slug: 'sexual-purity' },
} as const;
