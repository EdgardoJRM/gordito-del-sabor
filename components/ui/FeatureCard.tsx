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
    ? 'bg-white/5 text-warm'
    : 'surface-inset text-warm-dark';
  const body = dark ? 'text-[#C4B8AE]' : 'text-earth';

  return (
    <div className={`rounded-lg p-8 ${card}`}>
      <div className="mb-5 inline-flex rounded-md bg-accent/10 p-3 text-accent">
        <Icon size={24} strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className={`body-text text-base ${body}`}>{children}</p>
    </div>
  );
}
