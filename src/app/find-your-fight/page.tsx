import type { Metadata } from 'next';
import QuizFunnel from '@/components/cro/QuizFunnel';

export const metadata: Metadata = {
  title: 'Find Your Fight — 60-Second Battle Plan Quiz | Dead Hidden',
  description:
    'Take the 60-second quiz. Get matched with the KJV Bible study, marriage manual, or spiritual warfare guide that fits your battle. Free.',
  alternates: { canonical: 'https://deadhidden.org/find-your-fight' },
  openGraph: {
    title: 'Find Your Fight — 60-Second Quiz',
    description: '5 questions. Instant result. The weapon that fits your battle.',
    url: 'https://deadhidden.org/find-your-fight',
    type: 'website',
  },
};

export default function FindYourFightPage() {
  return <QuizFunnel />;
}
