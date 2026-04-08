'use client';

import { useState, useEffect } from 'react';
import { track } from '@vercel/analytics';

interface ShareButtonsProps {
  url: string;
  title: string;
  slug?: string;
  description?: string;
  /** When true, shows as floating UI (desktop sidebar / mobile bottom bar). */
  floating?: boolean;
}

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-green-500">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

export function ShareButtons({ url, title, slug, description, floating = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(!floating);
  const [isMobile, setIsMobile] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
    window.addEventListener('resize', checkMobile);

    if (floating) {
      const handleScroll = () => {
        setVisible(window.scrollY > 300);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => {
        window.removeEventListener('resize', checkMobile);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [floating]);

  const trackShare = (method: string) => {
    if (slug) {
      track('article_share', { method, article: slug });
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    trackShare('copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
      trackShare('native');
    } catch {
      // user cancelled
    }
  };

  const handleXShare = () => {
    trackShare('twitter');
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer,width=550,height=420'
    );
  };

  const handleFacebookShare = () => {
    trackShare('facebook');
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer,width=550,height=420'
    );
  };

  // Inline mode (used by store pages, etc.)
  if (!floating) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description || title);

    return (
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-xs text-muted uppercase tracking-widest mb-3 font-oswald">
          SHARE THIS WITH SOMEONE WHO NEEDS IT
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on X" className="flex items-center justify-center w-10 h-10 bg-card border border-border text-muted hover:text-foreground hover:border-blood transition-colors">
            <XIcon />
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on Facebook" className="flex items-center justify-center w-10 h-10 bg-card border border-border text-muted hover:text-foreground hover:border-blood transition-colors">
            <FacebookIcon />
          </a>
          <a href={`mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share via Email" className="flex items-center justify-center w-10 h-10 bg-card border border-border text-muted hover:text-foreground hover:border-blood transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <button onClick={handleCopy} title="Copy link" className="flex items-center justify-center w-10 h-10 bg-card border border-border text-muted hover:text-foreground hover:border-blood transition-colors">
            <CopyIcon copied={copied} />
          </button>
        </div>
      </div>
    );
  }

  // Floating mode
  if (!visible) return null;

  const btnClass =
    'flex items-center justify-center w-9 h-9 text-[#777] hover:text-[#e8e0d0] hover:bg-[#8b0000]/20 transition-colors rounded';

  // Mobile: fixed bottom bar
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#222] px-4 py-2 flex items-center justify-center gap-1">
        {canNativeShare && (
          <button onClick={handleNativeShare} className={btnClass} title="Share">
            <ShareIcon />
            <span className="ml-1.5 text-[11px] uppercase tracking-wider text-[#777]">Share</span>
          </button>
        )}
        <button onClick={handleCopy} className={btnClass} title="Copy link">
          <CopyIcon copied={copied} />
        </button>
        <button onClick={handleXShare} className={btnClass} title="Share on X">
          <XIcon />
        </button>
        <button onClick={handleFacebookShare} className={btnClass} title="Share on Facebook">
          <FacebookIcon />
        </button>
      </div>
    );
  }

  // Desktop: floating left sidebar
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 bg-[#111]/90 backdrop-blur-sm border border-[#222] rounded p-1.5">
      <button onClick={handleCopy} className={btnClass} title="Copy link">
        <CopyIcon copied={copied} />
      </button>
      <button onClick={handleXShare} className={btnClass} title="Share on X">
        <XIcon />
      </button>
      <button onClick={handleFacebookShare} className={btnClass} title="Share on Facebook">
        <FacebookIcon />
      </button>
    </div>
  );
}
