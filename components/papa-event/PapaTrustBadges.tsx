import { MapPin, ShieldCheck, CreditCard, Package } from 'lucide-react';
import { papaTrustBadges } from '@/lib/papa-event';

const iconMap = {
  quality: ShieldCheck,
  stripe: CreditCard,
  pr: MapPin,
  delivery: Package,
} as const;

type PapaTrustBadgesProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export default function PapaTrustBadges({ variant = 'light', className = '' }: PapaTrustBadgesProps) {
  const isDark = variant === 'dark';

  return (
    <ul
      className={`grid grid-cols-2 lg:grid-cols-4 gap-3 ${className}`}
      aria-label="Garantías y confianza"
    >
      {papaTrustBadges.map((badge) => {
        const Icon = iconMap[badge.id as keyof typeof iconMap] ?? ShieldCheck;
        return (
          <li
            key={badge.id}
            className={`flex items-start gap-3 rounded-xl border p-4 ${
              isDark
                ? 'border-white/10 bg-white/5 text-[#FAF8F5]'
                : 'border-[#E8E0D8] bg-white text-[#1A1412]'
            }`}
          >
            <Icon
              className={`shrink-0 mt-0.5 ${isDark ? 'text-[#E8D4BC]' : 'text-[#C4472B]'}`}
              size={22}
              aria-hidden
            />
            <div>
              <p className="font-bold text-sm leading-tight">{badge.label}</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#C4B8AE]' : 'text-[#6B5B4E]'}`}>
                {badge.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
