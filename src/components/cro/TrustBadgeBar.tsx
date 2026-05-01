import { Download, Shield, Lock, BookOpen, Users, Clock } from 'lucide-react';

const badges = [
  { icon: Download, label: 'Instant Download' },
  { icon: BookOpen, label: 'KJV Only' },
  { icon: Lock, label: 'SSL Secure' },
  { icon: Shield, label: '83+ Resources' },
  { icon: Users, label: '131K+ Readers' },
  { icon: Clock, label: '24 Years Married' },
];

export default function TrustBadgeBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
      {badges.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <div key={badge.label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-ash" strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-wider text-ash">{badge.label}</span>
            {i < badges.length - 1 && (
              <span className="ml-6 hidden h-4 w-px bg-steel md:inline-block" />
            )}
          </div>
        );
      })}
    </div>
  );
}
