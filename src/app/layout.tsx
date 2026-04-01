import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://deadhidden.org'),
  title: {
    default: 'Dead Hidden — Biblical Truth They Can\'t Bury',
    template: '%s | Dead Hidden',
  },
  description:
    'Biblical masculinity, marriage, spiritual warfare, and KJV Bible study. 50+ guides and resources for Christian men. By Adam Johnsson.',
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
    title: 'Dead Hidden — Biblical Truth They Can\'t Bury',
    description:
      'Biblical masculinity, marriage, spiritual warfare, and KJV Bible study. 50+ guides and resources for Christian men.',
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
    title: 'Dead Hidden — Biblical Truth They Can\'t Bury',
    description:
      'Biblical masculinity, marriage, spiritual warfare, and KJV Bible study. 50+ guides for Christian men.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-heading: "Oswald", sans-serif;
            --font-body: "Inter", sans-serif;
          }
        `}</style>
      </head>
      <body className="bg-background text-foreground font-inter">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
