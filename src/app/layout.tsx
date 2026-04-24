import type { Metadata, Viewport } from 'next';
import { Oswald, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RadioPlayer } from '@/components/RadioPlayer';
import { SmartNudge } from '@/components/SmartNudge';
import { CheckoutRecovery } from '@/components/CheckoutRecovery';
import { TwoStepPopup } from '@/components/TwoStepPopup';
import { MobileSlideIn } from '@/components/MobileSlideIn';
import { DesktopExitIntent } from '@/components/DesktopExitIntent';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
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
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://deadhidden.org'),
  title: {
    default: 'Dead Hidden Ministries — Bible Study, Biblical Truth & Spiritual Warfare',
    template: '%s | Dead Hidden Ministries',
  },
  description:
    'Dead Hidden offers 50+ KJV-only Bible study resources for marriage, parenting, biblical masculinity, and spiritual warfare. Start 30 days free.',
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
      'Dead Hidden offers 50+ KJV-only Bible study resources for marriage, parenting, biblical masculinity, and spiritual warfare. Start 30 days free.',
    url: 'https://deadhidden.org',
    siteName: 'Dead Hidden Ministries',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/api/og?title=BIBLICAL+TRUTH+THEY+TRIED+TO+BURY.&subtitle=deadhidden.org',
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
      'Dead Hidden offers 50+ KJV-only Bible study resources for marriage, parenting, biblical masculinity, and spiritual warfare. Start 30 days free.',
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
        <TwoStepPopup />
        <MobileSlideIn />
        <DesktopExitIntent />
        <SmartNudge />
        <CheckoutRecovery />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
