import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Archive — Biblical Guides & Resources',
  description:
    '50+ biblical masculinity guides, marriage manuals, spiritual warfare frameworks, and Bible study resources. Digital downloads by Adam Johnson.',
  openGraph: {
    title: 'The Archive — Biblical Guides & Resources',
    description:
      '50+ biblical masculinity guides, marriage manuals, and spiritual warfare resources for Christian men.',
    url: 'https://deadhidden.org/store',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'The Archive — Biblical Guides & Resources | Dead Hidden',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Archive — Biblical Guides & Resources',
    description:
      '50+ biblical masculinity guides, marriage manuals, and spiritual warfare resources.',
    images: ['/images/og-default.jpg'],
  },
  alternates: {
    canonical: 'https://deadhidden.org/store',
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
