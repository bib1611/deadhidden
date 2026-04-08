import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Archive — 76 Biblical Resources | Dead Hidden',
  description:
    'Browse 76 downloadable resources on Bible study, marriage, parenting, biblical masculinity, biblical womanhood, and spiritual warfare. Guides, manuals, and protocols — all KJV-grounded.',
  keywords: [
    'christian resources download',
    'bible study guide PDF',
    'biblical marriage guide',
    'spiritual warfare resources',
    'KJV study materials',
    'biblical masculinity resources',
    'christian parenting guide',
  ],
  openGraph: {
    title: 'The Archive — 76 Biblical Resources | Dead Hidden',
    description:
      'Browse 76 downloadable guides on Bible study, marriage, parenting, and spiritual warfare. KJV only.',
    type: 'website',
    url: 'https://deadhidden.org/store',
    images: [
      {
        url: 'https://deadhidden.org/api/og?title=The+Archive&subtitle=76+Biblical+Resources',
        width: 1200,
        height: 630,
        alt: 'Dead Hidden — The Archive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Archive — 76 Biblical Resources | Dead Hidden',
    description:
      'Browse 76 downloadable guides on Bible study, marriage, parenting, and spiritual warfare.',
    creator: '@Biblicalman',
  },
  alternates: {
    canonical: 'https://deadhidden.org/store',
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
