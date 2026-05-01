import type { Metadata } from 'next';
import { OrganizationJsonLd } from '@/components/JsonLd';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import HomepageBody from '@/components/cro/HomepageBody';

export const metadata: Metadata = {
  title: 'Dead Hidden Ministries — Biblical Truth They Tried to Bury',
  description:
    '83+ downloadable resources on Bible study, marriage, parenting, biblical masculinity, and spiritual warfare. Built in the fire — not a seminary classroom. KJV only.',
  keywords: [
    'bible study resources',
    'biblical masculinity',
    'christian marriage resources',
    'KJV bible study',
    'spiritual warfare guide',
    'biblical parenting',
    'biblical womanhood',
    'dead hidden ministries',
  ],
  openGraph: {
    title: 'Dead Hidden Ministries — Biblical Truth They Tried to Bury',
    description:
      '83+ resources on Scripture, marriage, parenting, and spiritual warfare. 131,000+ readers. KJV only.',
    type: 'website',
    url: 'https://deadhidden.org',
    images: [
      {
        url: 'https://deadhidden.org/api/og?title=Dead+Hidden+Ministries&subtitle=Biblical+Truth+They+Tried+to+Bury',
        width: 1200,
        height: 630,
        alt: 'Dead Hidden Ministries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dead Hidden Ministries — Biblical Truth They Tried to Bury',
    description:
      '83+ resources on Scripture, marriage, parenting, and spiritual warfare. KJV only.',
    creator: '@Biblicalman',
  },
  alternates: {
    canonical: 'https://deadhidden.org',
  },
};

export default function Home() {
  return (
    <main className="bg-ink text-bone">
      <ScrollDepthTracker page="/" />
      <OrganizationJsonLd />
      <HomepageBody />
    </main>
  );
}
