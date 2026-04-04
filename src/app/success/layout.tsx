import { Suspense } from 'react';

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] flex items-center justify-center">
          <div className="animate-pulse text-center">
            <h1
              className="text-3xl md:text-5xl uppercase tracking-[0.08em] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              LOADING...
            </h1>
            <div className="h-1 bg-[#8b0000] w-16 mx-auto" />
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
