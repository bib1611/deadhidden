import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dead Hidden',
  description: 'The things they buried. The documents they don\'t want you to read.',
  metadataBase: new URL('https://deadhidden.org'),
  openGraph: {
    title: 'Dead Hidden',
    description: 'The things they buried. The documents they don\'t want you to read.',
    url: 'https://deadhidden.org',
    siteName: 'Dead Hidden',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dead Hidden',
    description: 'The things they buried. The documents they don\'t want you to read.',
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
      </body>
    </html>
  );
}
