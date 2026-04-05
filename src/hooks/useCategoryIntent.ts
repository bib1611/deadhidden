'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const CATEGORY_STORAGE_KEY = 'dh_category_scores';

export type IntentCategory = 'marriage' | 'masculinity' | 'bible-study' | 'spiritual-warfare' | 'parenting' | 'womanhood';

const CATEGORY_MAP: Record<IntentCategory, string[]> = {
  'marriage': [
    '/store/kings-marriage-manual-red', '/store/kings-marriage-manual',
    '/store/headship-manual', '/store/she-just-gets-me',
    '/store/covenant-conversation', '/store/headship-bundle',
    '/store/marriage-bundle',
  ],
  'masculinity': [
    '/store/caged-porn', '/store/caged', '/store/kings-conquest',
    '/store/biblical-masculinity', '/store/what-are-you-hungry-for',
    '/store/manhood-reloaded', '/store/mans-war',
  ],
  'bible-study': [
    '/store/how-to-study-bible', '/store/darkest-proverbs',
    '/store/romans-nuclear-truth', '/store/esther',
    '/store/hebrews-field-guide', '/store/proverbs-field-guide',
  ],
  'spiritual-warfare': [
    '/store/blood-and-bandwidth', '/store/exposing-enemy',
    '/store/overcoming-mental-torment', '/store/fourth-answer',
    '/store/spiritual-warfare-bundle',
  ],
  'parenting': [
    '/store/before-the-world-does', '/store/absalom-protocol',
    '/store/12-conversations', '/store/parenting-bundle',
  ],
  'womanhood': [
    '/store/traditional-homemaking', '/store/biblical-womanhood-bundle',
    '/store/queens-guide', '/store/proverbs-31-field-guide',
    '/store/feminine-reset',
  ],
};

// Also map /read article paths and /blog paths to categories
const CONTENT_CATEGORY_KEYWORDS: Record<IntentCategory, string[]> = {
  'marriage': ['marriage', 'husband', 'wife', 'headship', 'covenant', 'intimacy'],
  'masculinity': ['masculinity', 'manhood', 'men', 'man', 'caged', 'porn'],
  'bible-study': ['bible', 'study', 'scripture', 'proverbs', 'romans', 'esther', 'hebrews'],
  'spiritual-warfare': ['warfare', 'spiritual', 'enemy', 'torment', 'demonic', 'battle'],
  'parenting': ['parenting', 'father', 'mother', 'children', 'kids', 'family'],
  'womanhood': ['woman', 'womanhood', 'homemaking', 'feminine', 'wife', 'queen'],
};

interface CategoryScores {
  [key: string]: number;
}

function getCategoryScores(): CategoryScores {
  try {
    return JSON.parse(sessionStorage.getItem(CATEGORY_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function incrementCategory(category: IntentCategory): void {
  try {
    const scores = getCategoryScores();
    scores[category] = (scores[category] || 0) + 1;
    sessionStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // ignore
  }
}

export function getTopCategory(): IntentCategory | null {
  const scores = getCategoryScores();
  let topCategory: IntentCategory | null = null;
  let topScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > topScore) {
      topScore = score;
      topCategory = category as IntentCategory;
    }
  }

  return topCategory;
}

// Product recommendations mapped by category
export interface ProductRecommendation {
  name: string;
  slug: string;
  price: string;
  description: string;
  stripeLink?: string;
}

const CATEGORY_RECOMMENDATIONS: Record<IntentCategory, ProductRecommendation> = {
  'marriage': {
    name: "THE KING'S MARRIAGE MANUAL",
    slug: 'kings-marriage-manual-red',
    price: '$47',
    description: 'The uncut marriage manual your pastor was afraid to write.',
  },
  'masculinity': {
    name: 'CAGED',
    slug: 'caged-porn',
    price: '$37',
    description: 'Break the cage. Kill what owns you.',
  },
  'bible-study': {
    name: 'HOW TO STUDY THE BIBLE',
    slug: 'how-to-study-bible',
    price: '$7',
    description: 'The system that turns passive readers into active soldiers.',
  },
  'spiritual-warfare': {
    name: 'BLOOD AND BANDWIDTH',
    slug: 'blood-and-bandwidth',
    price: '$50',
    description: 'The enemy is real. This is your battle plan.',
  },
  'parenting': {
    name: 'BEFORE THE WORLD DOES',
    slug: 'before-the-world-does',
    price: '$27',
    description: 'Get to your kids before the culture does.',
  },
  'womanhood': {
    name: 'TRADITIONAL BIBLICAL HOMEMAKING',
    slug: 'traditional-homemaking',
    price: '$32.95',
    description: "God's design for the home — no feminist filter.",
  },
};

const FALLBACK_RECOMMENDATION: ProductRecommendation = {
  name: 'THE VAULT SAMPLER',
  slug: 'vault-sampler',
  price: '$7',
  description: 'Taste the arsenal before you buy it.',
};

export function getRecommendation(): ProductRecommendation {
  const top = getTopCategory();
  if (top && CATEGORY_RECOMMENDATIONS[top]) {
    return CATEGORY_RECOMMENDATIONS[top];
  }
  return FALLBACK_RECOMMENDATION;
}

export function useCategoryIntent() {
  const pathname = usePathname();

  useEffect(() => {
    // Check direct store page matches
    for (const [category, paths] of Object.entries(CATEGORY_MAP)) {
      if (paths.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
        incrementCategory(category as IntentCategory);
        return;
      }
    }

    // Check store category pages
    if (pathname.startsWith('/store/category/')) {
      const segment = pathname.split('/store/category/')[1]?.split('/')[0];
      if (segment) {
        const categoryMapping: Record<string, IntentCategory> = {
          'marriage-family': 'marriage',
          'masculinity': 'masculinity',
          'bible-study': 'bible-study',
          'spiritual-warfare': 'spiritual-warfare',
          'parenting': 'parenting',
          'women': 'womanhood',
        };
        const mapped = categoryMapping[segment];
        if (mapped) incrementCategory(mapped);
      }
      return;
    }

    // Check content pages by keyword matching on URL path
    const pathLower = pathname.toLowerCase();
    for (const [category, keywords] of Object.entries(CONTENT_CATEGORY_KEYWORDS)) {
      if (keywords.some((kw) => pathLower.includes(kw))) {
        incrementCategory(category as IntentCategory);
        return;
      }
    }
  }, [pathname]);

  return { getTopCategory, getRecommendation };
}
