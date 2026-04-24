import type { Metadata } from 'next';
import { CATEGORIES, type Category } from '@/data/products';
import { StoreContent } from '@/components/StoreContent';

export const metadata: Metadata = {
  title: 'The Archive | Dead Hidden Ministries',
  description:
    'Browse Dead Hidden Bible study resources, guides, bundles, and free downloads. Instant PDF delivery. No subscription required.',
  alternates: {
    canonical: 'https://deadhidden.org/store',
  },
};

interface StorePageProps {
  searchParams?: Promise<{
    category?: string | string[];
  }>;
}

function normalizeCategory(value: string | string[] | undefined): Category | undefined {
  const category = Array.isArray(value) ? value[0] : value;
  if (!category) return undefined;

  return Object.prototype.hasOwnProperty.call(CATEGORIES, category)
    ? (category as Category)
    : undefined;
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const params = searchParams ? await searchParams : undefined;
  const initialCategory = normalizeCategory(params?.category);

  return <StoreContent initialCategory={initialCategory} />;
}
