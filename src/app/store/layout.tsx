import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Archive — Biblical Guides & Resources',
  description:
    '50+ biblical masculinity guides, marriage manuals, spiritual warfare frameworks, and Bible study resources. Digital downloads by Adam Johnsson.',
  openGraph: {
    title: 'The Archive — Biblical Guides & Resources',
    description:
      '50+ biblical masculinity guides, marriage manuals, and spiritual warfare resources for Christian men.',
    url: 'https://deadhidden.org/store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Archive — Biblical Guides & Resources',
    description:
      '50+ biblical masculinity guides, marriage manuals, and spiritual warfare resources.',
  },
  alternates: {
    canonical: 'https://deadhidden.org/store',
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
