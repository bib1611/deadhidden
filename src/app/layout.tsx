import type { Metadata, Viewport } from 'next';
import { Oswald, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RadioPlayer } from '@/components/RadioPlayer';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import './globals.css';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://deadhidden.org'),
  title: {
    default: 'Dead Hidden Ministries — Bible Study, Biblical Truth & Spiritual Warfare',
    template: '%s | Dead Hidden Ministries',
  },
  description:
    'A Bible study ministry and friend to churches. Bible study guides, biblical masculinity, biblical womanhood, marriage, spiritual warfare, and parenting resources. 50+ guides by Adam & Christie Johnson.',
  keywords: [
    'KJV bible study',
    'biblical masculinity',
    'biblical womanhood',
    'christian men',
    'christian women',
    'marriage guide',
    'spiritual warfare',
    'biblical headship',
    'dead hidden',
    'the biblical man',
    'Adam Johnson',
  ],
  authors: [{ name: 'Adam Johnson', url: 'https://deadhidden.org/about' }],
  creator: 'Adam Johnson',
  publisher: 'Dead Hidden Ministries',
  openGraph: {
    title: 'Dead Hidden Ministries — Bible Study, Biblical Truth & Spiritual Warfare',
    description:
      'A Bible study ministry and friend to churches. 50+ guides on marriage, parenting, spiritual warfare, and Scripture by Adam & Christie Johnson.',
    url: 'https://deadhidden.org',
    siteName: 'Dead Hidden Ministries',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Dead Hidden Ministries — Bible Study Resources for Christians, Families & Churches',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SlayStupidity',
    creator: '@SlayStupidity',
    title: 'Dead Hidden Ministries — Bible Study, Biblical Truth & Spiritual Warfare',
    description:
      'A Bible study ministry and friend to churches. 50+ resources by Adam & Christie Johnson.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://deadhidden.org',
  },
  verification: {
    google: 'dGwYJHqDIlGR3RPYwCBBE2z2JzTMYbL2P5X95jMWsBc',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground font-inter">
        <Navbar />
        {children}
        <Footer />
        <RadioPlayer />
        <ExitIntentPopup />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
