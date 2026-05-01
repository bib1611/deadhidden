import Link from 'next/link';
import { Check, X } from 'lucide-react';

const rows = [
  { feature: 'Translation', competitor: 'Mix of versions', ours: 'KJV Only', win: true },
  { feature: 'Hard verses', competitor: 'Skipped or softened', ours: 'Confronted head-on', win: true },
  { feature: 'Format', competitor: 'Physical books, slow shipping', ours: 'Instant PDF download', win: true },
  { feature: 'Quantity', competitor: '1-2 studies per purchase', ours: '83+ resources, one price', win: true },
  { feature: 'Updates', competitor: 'Buy new editions', ours: 'All future additions free', win: true },
  { feature: 'Guarantee', competitor: '7-14 days', ours: '30 days, no questions', win: true },
  { feature: 'Price', competitor: '$15-40 per book', ours: '$297 for 83+ (was $365)', win: true, isPrice: true },
];

export default function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-sm border border-steel bg-charcoal">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-steel">
              <th className="p-4 text-left text-sm font-semibold uppercase text-bone md:p-6">Feature</th>
              <th className="p-4 text-left text-sm font-semibold uppercase text-ash md:p-6">Typical Bible Study</th>
              <th className="border-l-2 border-l-crimson bg-[#1a0a0a] p-4 text-left text-sm font-semibold uppercase text-bone md:p-6">
                Dead Hidden Vault
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-steel/50 last:border-b-0">
                <td className="p-4 text-base font-medium text-bone md:p-6">{row.feature}</td>
                <td className="p-4 text-base text-smoke md:p-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error/20">
                      <X size={12} className="text-error" />
                    </span>
                    {row.competitor}
                  </div>
                </td>
                <td className="border-l-2 border-l-crimson bg-[#1a0a0a] p-4 text-base font-medium text-parchment md:p-6">
                  <div className="flex items-center gap-2">
                    {row.isPrice ? (
                      <span className="text-xl font-mono font-bold text-flame">{row.ours}</span>
                    ) : (
                      <>
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss/20">
                          <Check size={12} className="text-moss" />
                        </span>
                        <strong>{row.ours}</strong>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-4 md:p-6" />
              <td className="p-4 md:p-6" />
              <td className="border-l-2 border-l-crimson bg-[#1a0a0a] p-4 md:p-6">
                <Link
                  href="/store/the-vault"
                  className="inline-flex items-center justify-center rounded-sm bg-flame px-6 py-3 text-sm font-semibold uppercase tracking-wider text-parchment transition-all duration-200 hover:translate-y-[-2px] hover:bg-[#F05A00] hover:shadow-[0_8px_24px_rgba(217,79,0,0.4)]"
                >
                  LOCK IN VAULT ACCESS &rarr;
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
