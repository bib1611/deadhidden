import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Watch — Dead Hidden Video Archive',
  description:
    'Watch Dead Hidden videos on Bible defense, end times prophecy, and biblical truth. Featured playlists and curated content from the Dead Hidden YouTube channel.',
  openGraph: {
    title: 'Watch — Dead Hidden Video Archive',
    description:
      'Bible defense, end times prophecy, and biblical truth. Videos from the Dead Hidden YouTube channel.',
    url: 'https://deadhidden.org/watch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watch — Dead Hidden Video Archive',
    description:
      'Bible defense, end times prophecy, and biblical truth from Dead Hidden.',
  },
  alternates: {
    canonical: 'https://deadhidden.org/watch',
  },
};

const FEATURED_VIDEO = {
  id: 'eu8pXtSXbvg',
  title: 'The Mark of the Beast Is Already Here (Elon\'s X & The Vatican)',
  description:
    'The mark of the beast isn\'t coming. It\'s already being built — and the infrastructure is hiding in plain sight. Elon\'s X, the Vatican, and a system most Christians are sleepwalking into.',
  views: '1.5K',
  date: 'Mar 28, 2026',
};

const PLAYLISTS = [
  {
    id: 'PLiHaOYX3u49EhXzIEdx0fVbgBa8OEtFrH',
    title: "WHAT'S THE BIG DEAL ABOUT THE KJV?",
    description:
      'The definitive series on why the King James Bible is the preserved Word of God in English — and why every modern translation is a counterfeit. 9 episodes.',
    videoCount: 9,
    firstVideoId: 'uf1C7sEIlLI',
  },
  {
    id: 'PLiHaOYX3u49EkJQC9pIRxF6sqKNJoq6rp',
    title: 'ANTICHRIST AND THE ENDTIMES',
    description:
      'The mystery Babylon system, the true meaning of 666, the dark secret of the Sphinx, and the mark that\'s already being built. Eyes open.',
    videoCount: 5,
    firstVideoId: 'Y5-NBHLgi7g',
  },
];

export default function WatchPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            VIDEO ARCHIVE
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl uppercase font-bold text-[#e8e0d0] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            WATCH
          </h1>
          <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl">
            Featured videos and curated playlists from the Dead Hidden YouTube channel.
            Biblical truth on camera. No filter. No compromise.
          </p>
        </div>
      </div>

      {/* Featured Video */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-[#222]">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-8 font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            FEATURED
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Video Embed */}
            <div className="lg:col-span-3">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${FEATURED_VIDEO.id}?rel=0`}
                  title={FEATURED_VIDEO.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Video Info */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h2
                className="text-2xl md:text-3xl uppercase font-bold text-[#e8e0d0] mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {FEATURED_VIDEO.title}
              </h2>
              <p className="text-sm text-[#888] leading-relaxed mb-4">
                {FEATURED_VIDEO.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#555]">
                <span>{FEATURED_VIDEO.views} views</span>
                <span>•</span>
                <span>{FEATURED_VIDEO.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playlists */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs tracking-[0.3em] text-[#8b0000] uppercase mb-12 font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            PLAYLISTS
          </p>

          <div className="space-y-16">
            {PLAYLISTS.map((playlist) => (
              <div key={playlist.id} className="border border-[#222] bg-[#111] p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Playlist Embed */}
                  <div className="lg:col-span-3">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/videoseries?list=${playlist.id}&rel=0`}
                        title={playlist.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Playlist Info */}
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <h3
                      className="text-xl md:text-2xl uppercase font-bold text-[#e8e0d0] mb-4 leading-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {playlist.title}
                    </h3>
                    <p className="text-sm text-[#888] leading-relaxed mb-4">
                      {playlist.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-[#555]">
                        {playlist.videoCount} VIDEOS
                      </span>
                      <a
                        href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-[0.15em] uppercase text-[#8b0000] hover:text-[#e8e0d0] transition-colors font-bold"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        VIEW ON YOUTUBE →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[#222] bg-[#111]">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl uppercase font-bold text-[#e8e0d0] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            SUBSCRIBE TO THE CHANNEL
          </h2>
          <p className="text-[#888] mb-8">
            New videos drop without warning. Subscribe so you don't miss what the algorithm tries to bury.
          </p>
          <a
            href="https://www.youtube.com/@DeadHidden-k5y?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8b0000] text-[#e8e0d0] px-8 py-3.5 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            SUBSCRIBE ON YOUTUBE
          </a>
        </div>
      </section>
    </main>
  );
}
