import Link from 'next/link';

type PapaSocialProofItem = {
  id: string;
  platform: string;
  stat: string;
  description: string;
  href: string;
};

export default function PapaSocialProofCard({ item }: { item: PapaSocialProofItem }) {
  return (
    <article className="rounded-2xl border border-[#E8E0D8] bg-[#FAF8F5] p-8 shadow-sm h-full flex flex-col">
      <p className="text-4xl md:text-5xl font-bold text-[#C4472B] mb-2">{item.stat}</p>
      <p className="text-xl font-bold text-[#1A1412] mb-3">{item.platform}</p>
      <p className="body-text text-[#6B5B4E] flex-1">{item.description}</p>
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-[#C4472B] font-bold underline underline-offset-2 hover:text-[#A8381F] transition-colors"
      >
        Ver en {item.platform} →
      </Link>
    </article>
  );
}
