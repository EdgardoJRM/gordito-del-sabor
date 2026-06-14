import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  dark?: boolean;
};

export default function FeatureCard({ icon: Icon, title, children, dark }: FeatureCardProps) {
  const card = dark
    ? 'bg-white/5 border-white/10 text-[#FAF8F5]'
    : 'bg-[#FAF8F5] border-[#E8E0D8] text-[#1A1412]';
  const body = dark ? 'text-[#C4B8AE]' : 'text-[#6B5B4E]';

  return (
    <div className={`rounded-2xl md:rounded-3xl border p-8 shadow-sm ${card}`}>
      <div className="mb-5 inline-flex rounded-2xl bg-[#C4472B]/12 p-3 text-[#C4472B]">
        <Icon size={24} strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className={`body-text text-base ${body}`}>{children}</p>
    </div>
  );
}
