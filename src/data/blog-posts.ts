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
  {
    slug: 'why-is-christianity-so-hard',
    title: 'Why Is Christianity So Hard? (The Answer You Actually Need)',
    metaDescription:
      "Joseph spent thirteen years in a pit with God's hand on his life. That's not a contradiction. That's the answer. But most people asking this question have never been told the whole story.",
    primaryKeyword: 'why is Christianity so hard',
    secondaryKeywords: [
      'Christian life is hard',
      'why does following God hurt',
      'suffering as a Christian',
      'why is faith so difficult',
    ],
    keywords: [
      'why is Christianity so hard',
      'Christian life is hard',
      'why does following God hurt',
      'suffering as a Christian',
      'why is faith so difficult',
      'KJV suffering',
    ],
    category: 'spiritual-warfare',
    publishDate: '2026-04-09',
    author: 'adam',
    linkedProducts: ['the-essential-arsenal'],
    productLinks: [
      { slug: 'the-essential-arsenal', placement: 'end' },
    ],
    wordCount: 1183,
    readingTime: 8,
    featured: false,
    content: '<p>Content coming soon.</p>',
  },
  {
    slug: 'biblical-womanhood-expectations',
    title: 'Biblical Womanhood Expectations: What the Bible Says vs. What the Church Invented',
    metaDescription:
      "The version of biblical womanhood being sold in most Christian circles isn't Proverbs 31. It's a 1950s cultural ideal with Bible verses attached. Here's the difference.",
    primaryKeyword: 'biblical womanhood expectations',
    secondaryKeywords: [
      'what does the Bible say about womanhood',
      'biblical woman characteristics',
      'Proverbs 31 woman real meaning',
    ],
    keywords: [
      'biblical womanhood expectations',
      'what does the Bible say about womanhood',
      'biblical woman characteristics',
      'Proverbs 31 woman real meaning',
      'biblical femininity',
      'KJV womanhood',
    ],
    category: 'biblical-womanhood',
    publishDate: '2026-04-09',
    author: 'adam',
    linkedProducts: ['biblical-woman-field-manual', 'the-essential-arsenal'],
    productLinks: [
      { slug: 'biblical-woman-field-manual', placement: 'inline' },
      { slug: 'the-essential-arsenal', placement: 'end' },
    ],
    wordCount: 1130,
    readingTime: 7,
    featured: true,
    content: '<p>Content coming soon.</p>',
  },
  {
    slug: 'men-spiritual-passivity',
    title: 'Men and Spiritual Passivity: The Sin Nobody Names in Church',
    metaDescription:
      "Nobody's going to put it in the bulletin. But passive Christianity in men is doing more damage to families than anything the culture is throwing at us. Here's what it looks like and where it starts.",
    primaryKeyword: 'men spiritual passivity',
    secondaryKeywords: [
      'passive Christian men',
      'male spiritual leadership',
      'men and faith',
      'passive husband church',
    ],
    keywords: [
      'men spiritual passivity',
      'passive Christian men',
      'male spiritual leadership',
      'men and faith',
      'passive husband church',
      'biblical masculinity',
    ],
    category: 'biblical-masculinity',
    publishDate: '2026-04-09',
    author: 'adam',
    linkedProducts: ['biblical-man-field-manual', 'the-essential-arsenal'],
    productLinks: [
      { slug: 'biblical-man-field-manual', placement: 'inline' },
      { slug: 'the-essential-arsenal', placement: 'end' },
    ],
    wordCount: 1061,
    readingTime: 7,
    featured: false,
    content: '<p>Content coming soon.</p>',
  },
  {
    slug: 'the-most-dangerous-lie-in-the-church',
    title: 'The Most Dangerous Lie in the Church (And Why You\'ve Already Believed It)',
    metaDescription:
      "It's not a theological error. It's not in the statement of faith. The most dangerous lie in the church is so embedded in the culture that it sounds like wisdom. Here's what it is.",
    primaryKeyword: 'most dangerous lie in the church',
    secondaryKeywords: [
      'lies the church teaches',
      'false teaching Christianity',
      'safe Christianity',
      'biblical truth church',
    ],
    keywords: [
      'most dangerous lie in the church',
      'lies the church teaches',
      'false teaching Christianity',
      'safe Christianity',
      'biblical truth church',
      'comfortable Christianity',
    ],
    category: 'spiritual-warfare',
    publishDate: '2026-04-09',
    author: 'adam',
    linkedProducts: ['the-essential-arsenal'],
    productLinks: [
      { slug: 'the-essential-arsenal', placement: 'end' },
    ],
    wordCount: 1350,
    readingTime: 7,
    featured: false,
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
