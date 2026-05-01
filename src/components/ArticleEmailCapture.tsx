'use client';

import { EmailCaptureForm } from '@/components/EmailCaptureForm';

export function ArticleEmailCapture() {
  return (
    <div className="my-10 bg-[#111] border border-[#222] p-6">
      <div className="text-center mb-4">
        <p
          className="text-[10px] tracking-[0.2em] uppercase text-[#8b0000] font-bold mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          FREE RESOURCES
        </p>
        <p
          className="text-lg uppercase tracking-[0.08em] text-[#e8e0d0] font-bold mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          GET THE FULL ARMORY &mdash; FREE.
        </p>
        <p className="text-sm text-[#888]">
          Free biblical resources. Straight to your inbox.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <EmailCaptureForm
          variant="inline"
          source="article_inline"
          buttonText="GET THE SIGNAL"
          successMessage="Check your inbox. The signal is on its way."
          placeholder="Your email"
        />
      </div>

      <p className="text-xs text-[#555] mt-3 text-center">
        No spam. No selling your data.
      </p>
    </div>
  );
}
