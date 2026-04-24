'use client';

import { useState, useRef, useEffect } from 'react';
import { trackConversion } from '@/lib/conversion-events';

const STREAM_URL = 'https://c13.radioboss.fm:8639/stream';

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check sessionStorage on mount — must read browser API in effect.
  useEffect(() => {
    try {
      if (sessionStorage.getItem('dh_radio_dismissed') === '1') {
        const frame = requestAnimationFrame(() => setIsDismissed(true));
        return () => cancelAnimationFrame(frame);
      }
    } catch {
      // sessionStorage not available
    }
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    audio.addEventListener('playing', () => {
      setIsPlaying(true);
      setIsLoading(false);
      trackConversion('radio_play', { station: 'ffbr' });
    });

    audio.addEventListener('pause', () => {
      setIsPlaying(false);
      setIsLoading(false);
    });

    audio.addEventListener('waiting', () => {
      setIsLoading(true);
    });

    audio.addEventListener('error', () => {
      setIsPlaying(false);
      setIsLoading(false);
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      trackConversion('radio_pause', { station: 'ffbr' });
      audio.pause();
      audio.src = '';
    } else {
      trackConversion('radio_play_clicked', { station: 'ffbr' });
      setIsLoading(true);
      audio.src = STREAM_URL;
      audio.load();
      audio.play().catch(() => {
        setIsLoading(false);
      });
    }
  };

  const handleDismiss = () => {
    trackConversion('radio_dismissed', { station: 'ffbr', was_playing: isPlaying });
    setIsDismissed(true);
    if (isPlaying) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    }
    try {
      sessionStorage.setItem('dh_radio_dismissed', '1');
    } catch {
      // sessionStorage not available
    }
  };

  if (isDismissed) return null;

  return (
    <>
      {/* Mobile: Collapsed floating button (below md) */}
      {!isMobileExpanded && (
        <div className="fixed bottom-4 left-4 z-[60] md:hidden flex items-center gap-2">
          <button
            onClick={() => {
              setIsMobileExpanded(true);
            }}
            className="w-10 h-10 flex items-center justify-center bg-[#8b0000] hover:bg-[#a50000] transition-colors rounded-full shadow-lg"
            aria-label="Open Bible Radio"
          >
            {isPlaying ? (
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[2px] bg-[#e8e0d0] animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                <span className="w-[2px] bg-[#e8e0d0] animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                <span className="w-[2px] bg-[#e8e0d0] animate-pulse" style={{ height: '40%', animationDelay: '300ms' }} />
              </div>
            ) : (
              <svg className="w-4 h-4 text-[#e8e0d0] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>
          <button
            onClick={handleDismiss}
            className="w-6 h-6 flex items-center justify-center bg-[#0a0a0a] border border-[#333] rounded-full text-[#555] hover:text-[#e8e0d0] hover:border-[#8b0000] transition-colors text-xs"
            aria-label="Dismiss radio"
          >
            ✕
          </button>
        </div>
      )}

      {/* Mobile: Expanded bar (below md) */}
      {isMobileExpanded && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden">
          <div className="bg-[#0a0a0a] border-t border-[#8b0000]/40 px-4 py-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-9 h-9 flex items-center justify-center bg-[#8b0000] hover:bg-[#a50000] transition-colors flex-shrink-0"
                  aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
                >
                  {isLoading ? (
                    <svg className="w-4 h-4 text-[#e8e0d0] animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
                    </svg>
                  ) : isPlaying ? (
                    <svg className="w-4 h-4 text-[#e8e0d0]" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-[#e8e0d0] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  )}
                </button>

                <span
                  className="text-xs uppercase tracking-[0.1em] text-[#888]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isPlaying ? 'FFBR — LIVE' : 'FFBR'}
                </span>

                {isPlaying && (
                  <div className="flex items-end gap-[2px] h-3">
                    <span className="w-[3px] bg-[#8b0000] animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                    <span className="w-[3px] bg-[#8b0000] animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                    <span className="w-[3px] bg-[#8b0000] animate-pulse" style={{ height: '40%', animationDelay: '300ms' }} />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMobileExpanded(false)}
                  className="text-xs text-[#555] hover:text-[#e8e0d0] transition-colors"
                  aria-label="Collapse radio"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-xs text-[#555] hover:text-[#e8e0d0] transition-colors"
                  aria-label="Dismiss radio"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop: Full bar (md and above) */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] hidden md:block">
        {/* Expanded info panel */}
        {isExpanded && (
          <div className="bg-[#111] border-t border-[#222] px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-[#e8e0d0] text-sm font-bold uppercase tracking-[0.08em]"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  Final Fight Bible Radio
                </p>
                <p className="text-[#777] text-xs mt-1">
                  24/7 KJV Bible preaching, teaching & gospel music
                </p>
              </div>
              <a
                href="https://finalfightbibleradio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#8b0000] hover:text-[#e8e0d0] uppercase tracking-[0.1em] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                VISIT FFBR →
              </a>
            </div>
          </div>
        )}

        {/* Player bar */}
        <div className="bg-[#0a0a0a] border-t border-[#8b0000]/40 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Play button + label */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-9 h-9 flex items-center justify-center bg-[#8b0000] hover:bg-[#a50000] transition-colors rounded-sm flex-shrink-0"
                aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
              >
                {isLoading ? (
                  <svg className="w-4 h-4 text-[#e8e0d0] animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
                  </svg>
                ) : isPlaying ? (
                  <svg className="w-4 h-4 text-[#e8e0d0]" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-[#e8e0d0] ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 group"
              >
                {/* Animated bars when playing */}
                {isPlaying && (
                  <div className="flex items-end gap-[2px] h-3">
                    <span className="w-[3px] bg-[#8b0000] animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                    <span className="w-[3px] bg-[#8b0000] animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                    <span className="w-[3px] bg-[#8b0000] animate-pulse" style={{ height: '40%', animationDelay: '300ms' }} />
                    <span className="w-[3px] bg-[#8b0000] animate-pulse" style={{ height: '80%', animationDelay: '450ms' }} />
                  </div>
                )}

                <span
                  className="text-xs uppercase tracking-[0.1em] text-[#888] group-hover:text-[#e8e0d0] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isPlaying ? 'FINAL FIGHT BIBLE RADIO — LIVE' : 'FINAL FIGHT BIBLE RADIO'}
                </span>
              </button>
            </div>

            {/* Right: 24/7 badge + dismiss */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#777]">
                24/7 KJV PREACHING & MUSIC
              </span>
              {isPlaying && (
                <span className="w-2 h-2 bg-[#8b0000] rounded-full animate-pulse" />
              )}
              <button
                onClick={handleDismiss}
                className="text-[#555] hover:text-[#e8e0d0] transition-colors text-xs ml-2"
                aria-label="Dismiss radio"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
