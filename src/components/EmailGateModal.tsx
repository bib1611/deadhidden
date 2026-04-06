'use client';

import { useState, useEffect, useCallback } from 'react';
import { track } from '@vercel/analytics';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';

interface EmailGateModalProps {
  productName: string;
  productSlug: string;
  onClose: () => void;
}

export function EmailGateModal({ productName, productSlug, onClose }: EmailGateModalProps) {
  const [unlocked, setUnlocked] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Escape to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-[#0a0a0a] border border-[#8b0000] p-8 text-center animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#555] hover:text-[#e8e0d0] transition-colors text-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          &#10005;
        </button>

        {unlocked ? (
          <>
            <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-6" />
            <h3
              className="text-2xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              IT&apos;S YOURS.
            </h3>
            <p className="text-sm text-[#888] mb-6">
              Your copy of <em className="text-[#e8e0d0] not-italic">{productName}</em> is ready.
            </p>
            <a
              href={`/store/${productSlug}/download`}
              className="inline-block bg-[#8b0000] text-[#e8e0d0] px-8 py-4 uppercase tracking-[0.15em] font-bold hover:bg-[#a50000] transition-colors min-h-[44px]"
              style={{ fontFamily: 'var(--font-heading)' }}
              onClick={() => track('email_gate', { action: 'download_clicked', product: productSlug })}
            >
              DOWNLOAD PDF
            </a>
            <p className="text-xs text-[#555] mt-4">
              Bookmark the download page to access it anytime.
            </p>
          </>
        ) : (
          <>
            <div className="h-1 bg-[#8b0000] w-12 mx-auto mb-6" />
            <div className="bg-[#1a3a1a] text-[#4ade80] text-xs px-3 py-1 inline-block mb-4 uppercase font-bold tracking-[0.08em]" style={{ fontFamily: 'var(--font-heading)' }}>
              FREE DOWNLOAD
            </div>
            <h3
              className="text-2xl md:text-3xl uppercase tracking-[0.08em] text-[#e8e0d0] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              GET {productName.toUpperCase()}
            </h3>
            <p className="text-sm text-[#888] mb-6 leading-relaxed">
              Enter your email and we&apos;ll unlock your free download instantly.
            </p>

            <EmailCaptureForm
              variant="popup"
              source="email_gate"
              leadMagnet={productSlug}
              buttonText="UNLOCK FREE DOWNLOAD"
              successMessage={`${productName} is ready for download.`}
              onSuccess={() => {
                setUnlocked(true);
                track('email_gate', { action: 'submitted', product: productSlug });
              }}
            />

            <p className="text-xs text-[#555] mt-4">
              No spam. No selling your data. Just the free PDF.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
