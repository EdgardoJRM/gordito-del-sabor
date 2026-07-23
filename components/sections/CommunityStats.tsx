import { siteConfig } from '@/lib/site-config';

export default function CommunityStats({ dark }: { dark?: boolean }) {
  const items = [
    { label: 'Instagram', value: siteConfig.stats.instagram },
    { label: 'Facebook', value: siteConfig.stats.facebook },
    { label: 'TikTok', value: siteConfig.stats.tiktok },
  ];

  const card = dark
    ? 'bg-white/5 border-white/10 text-[#FAF8F5]'
    : 'bg-[#FAF8F5] border-[#E8E0D8] text-[#1A1412]';
  const sub = dark ? 'text-[#C4B8AE]' : 'text-[#6B5B4E]';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {items.map((row) => (
        <div key={row.label} className={`rounded-lg border p-8 text-center ${card}`}>
          <p className={`text-sm font-bold uppercase tracking-wider ${sub}`}>{row.label}</p>
          <p className="mt-3 text-4xl md:text-5xl font-bold">{row.value}</p>
          <p className={`mt-2 text-sm ${sub}`}>Comunidad real, sazón real</p>
        </div>
      ))}
    </div>
  );
}
