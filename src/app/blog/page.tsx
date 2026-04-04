import { Suspense } from 'react';
import type { Metadata } from 'next';
import { blogPosts, BLOG_CATEGORIES, type BlogPost } from '@/data/blog-posts';
import { BlogContent } from '@/components/BlogContent';

export const metadata: Metadata = {
  title: 'Blog — Dead Hidden Ministries',
  description:
    'Bible study, biblical masculinity, biblical womanhood, marriage, and spiritual warfare articles. Deep dive into Scripture with KJV-focused analysis and application.',
  keywords: [
    'bible study articles',
    'biblical masculinity',
    'marriage resources',
    'KJV scripture',
    'spiritual warfare',
    'biblical womanhood',
  ],
  openGraph: {
    title: 'Blog — Dead Hidden Ministries',
    description: 'Bible study, biblical masculinity, and marriage resources from Dead Hidden Ministries.',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <BlogContent />
    </Suspense>
  );
}
