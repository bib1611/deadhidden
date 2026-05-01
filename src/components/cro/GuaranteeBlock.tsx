import { BookOpen } from 'lucide-react';

export default function GuaranteeBlock() {
  return (
    <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-sm bg-ink border border-steel p-8 md:p-12">
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: 'radial-gradient(ellipse at center, rgba(217,79,0,0.3) 0%, transparent 70%)' }}
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 rounded-full bg-flame/10 px-4 py-2">
          <BookOpen className="h-5 w-5 text-flame" />
          <span className="text-xs font-bold uppercase tracking-wider text-flame">KJV ONLY. NO COMPROMISE.</span>
        </div>

        <h3 className="mt-6 text-2xl md:text-3xl font-bold uppercase text-flame">
          Every resource is built squarely on the King James Bible.
        </h3>

        <p className="mt-4 max-w-[560px] text-lg text-smoke">
          No modern translations. No watered-down doctrine. Just the preserved Word of God.
        </p>
      </div>
    </div>
  );
}
