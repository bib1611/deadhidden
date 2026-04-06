'use client';

import { EmailCaptureForm } from '@/components/EmailCaptureForm';

export function HomepageEmailForm() {
  return (
    <div className="w-full max-w-md mx-auto">
      <EmailCaptureForm
        variant="inline"
        source="homepage_signal"
        buttonText="JOIN THE LIST"
        successMessage="Check your email. The signal is on its way."
        placeholder="Your email"
      />
    </div>
  );
}
