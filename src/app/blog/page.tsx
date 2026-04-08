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
    <Suspense fallback={
      <main className="min-h-screen bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-8 w-48 mb-4" />
          <div className="skeleton h-12 w-96 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-[#222] bg-[#111] p-6">
                <div className="skeleton h-4 w-24 mb-4" />
                <div className="skeleton h-6 w-full mb-3" />
                <div className="skeleton h-4 w-full mb-2" />
                <div className="skeleton h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </main>
    }>
      <BlogContent />
    </Suspense>
  );
}
