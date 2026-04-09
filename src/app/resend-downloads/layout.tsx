import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Your Downloads | Dead Hidden',
  description:
    'Lost your download? Enter the email you used to purchase and we\'ll resend your files immediately.',
  robots: { index: false, follow: false },
};

export default function ResendDownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
