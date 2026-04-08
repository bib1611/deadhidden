import { Suspense } from 'react';
import type { Metadata } from 'next';
import { BlogContent } from '@/components/BlogContent';

export const metadata: Metadata = {
  title: 'Blog — Biblical Truth, Masculinity & Marriage | Dead Hidden',
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
    description:
      'Bible study, biblical masculinity, and marriage resources from Dead Hidden Ministries.',
    type: 'website',
    url: 'https://deadhidden.org/blog',
    images: [
      {
        url: 'https://deadhidden.org/api/og?title=Blog&publication=dead-hidden',
        width: 1200,
        height: 630,
        alt: 'Dead Hidden Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Dead Hidden Ministries',
    description:
      'Bible study, biblical masculinity, and marriage resources from Dead Hidden Ministries.',
  },
  alternates: {
    canonical: 'https://deadhidden.org/blog',
  },
};

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <BlogContent />
    </Suspense>
  );
}
