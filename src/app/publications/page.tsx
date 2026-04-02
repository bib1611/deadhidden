import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Publications | Dead Hidden',
  description:
    'Three Substack publications reaching 70,000+ subscribers with unfiltered biblical truth, biblical masculinity, biblical womanhood, and spiritual warfare.',
};

const publications = [
  {
    name: 'DEAD HIDDEN SUBSTACK',
    description:
      'Raw, unfiltered testimony. Spiritual warfare. Documents you won\'t find anywhere else. The publication for those who\'ve seen the cracks and refuse to go back to sleep.',
    url: 'https://open.substack.com/pub/deadhidden?r=2t2o3r',
  },
  {
    name: 'THE BIBLICAL MAN SUBSTACK',
    description:
      'Biblical masculinity, marriage, headship, and faith. The content that gets shared in group chats and whispered about in church lobbies. By Adam Johnsson.',
    url: 'https://open.substack.com/pub/thebiblicalman?r=2t2o3r',
  },
  {
    name: 'BIBLICAL WOMANHOOD SUBSTACK',
    description:
      'Biblical womanhood, motherhood, marriage, and femininity. Equipping women to embrace God\'s design in a world that\'s lost its way. By Christie Johnsson.',
    url: 'https://open.substack.com/pub/biblicalwomanhood?r=2t2o3r',
  },
  {
    name: 'YOUTUBE',
    description:
      'Video content. Livestreams. The spoken version of what the written word can\'t always carry.',
    url: 'https://www.youtube.com/@thebiblicalman',
  },
  {
    name: 'X / TWITTER',
    description:
      'Daily. Unfiltered. 70,000+ followers. The front line of the information war.',
    url: 'https://x.com/SlayStupidity',
  },
];

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            THE SIGNAL
          </div>
          <h1
            className="text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            PUBLICATIONS
          </h1>
          <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl">
            Five platforms. One mission. 70,000+ people reading unfiltered truth about marriage,
            masculinity, womanhood, spiritual warfare, and the preservation of God's Word.
          </p>
        </div>
      </div>

      {/* Publications Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub) => (
            <a
              key={pub.name}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#222] bg-[#111] p-8 hover:border-[#8b0000] transition-colors group"
            >
              <h2
                className="text-xl md:text-2xl uppercase font-bold text-[#e8e0d0] mb-4 group-hover:text-[#8b0000] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {pub.name}
              </h2>
              <p className="text-sm md:text-base text-[#888] leading-relaxed mb-6">
                {pub.description}
              </p>
              <div className="text-xs tracking-[0.15em] uppercase text-[#8b0000] font-semibold group-hover:text-[#e8e0d0] transition-colors">
                FOLLOW →
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
