import Link from 'next/link';

interface SuccessPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const { slug } = await params;
  const { session_id } = await searchParams;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success Heading */}
        <h1 className="font-bold text-5xl md:text-6xl tracking-tighter leading-tight uppercase mb-6" style={{ fontFamily: "var(--font-oswald)" }}>
          PURCHASE COMPLETE
        </h1>

        {/* Divider */}
        <div className="h-1 bg-gradient-to-r from-blood to-blood-bright mb-8 mx-auto w-16"></div>

        {/* Confirmation Message */}
        <p className="text-lg md:text-xl mb-6 leading-relaxed text-foreground">
          Your PDF has been sent to your email.
        </p>

        {/* Instruction Text */}
        <p className="text-base md:text-lg text-muted mb-12">
          Check your inbox (and spam folder) for your download link.
        </p>

        {/* Back to Store Link */}
        <Link
          href="/store"
          className="inline-flex items-center justify-center px-8 py-4 bg-blood text-foreground hover:bg-blood-bright font-bold tracking-wide transition-colors rounded-sm text-lg"
        >
          BACK TO STORE
        </Link>

        {/* Session ID for debugging (optional, hidden) */}
        {session_id && (
          <p className="text-xs text-muted mt-12 font-mono">
            Session ID: {session_id}
          </p>
        )}
      </div>
    </div>
  );
}
