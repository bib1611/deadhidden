import type { Metadata, Viewport } from 'next';
import { Oswald, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RadioPlayer } from '@/components/RadioPlayer';
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
    default: 'Dead Hidden — Biblical Masculinity, KJV Bible Study & Spiritual Warfare',
    template: '%s | Dead Hidden',
  },
  description:
    'Biblical masculinity resources for Christian men. KJV Bible study guides, marriage manuals, spiritual warfare protocols, and parenting frameworks. 50+ resources by Adam Johnsson.',
  keywords: [
    'biblical masculinity',
    'christian men',
    'KJV bible study',
    'marriage guide',
    'spiritual warfare',
    'biblical headship',
    'dead hidden',
    'the biblical man',
    'Adam Johnsson',
  ],
  authors: [{ name: 'Adam Johnsson', url: 'https://deadhidden.org/about' }],
  creator: 'Adam Johnsson',
  publisher: 'Dead Hidden',
  openGraph: {
    title: 'Dead Hidden — Biblical Masculinity, KJV Bible Study & Spiritual Warfare',
    description:
      'Biblical masculinity resources for Christian men. KJV Bible study guides, marriage manuals, spiritual warfare protocols. 50+ resources by Adam Johnsson.',
    url: 'https://deadhidden.org',
    siteName: 'Dead Hidden',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'Dead Hidden',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SlayStupidity',
    creator: '@SlayStupidity',
    title: 'Dead Hidden — Biblical Masculinity, KJV Bible Study & Spiritual Warfare',
    description:
      'Biblical masculinity resources for Christian men. KJV Bible study, marriage, spiritual warfare. 50+ guides by Adam Johnsson.',
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
