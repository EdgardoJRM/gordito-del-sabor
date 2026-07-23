import Image from 'next/image';
import { Play } from 'lucide-react';

type VideoCardProps = {
  title: string;
  subtitle?: string;
  posterSrc: string;
  posterAlt: string;
  /** Si no hay video aún, el botón puede ser ancla o deshabilitado visualmente */
  href?: string;
};

export default function VideoCard({ title, subtitle, posterSrc, posterAlt, href }: VideoCardProps) {
  const inner = (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/90 via-[#1A1412]/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
          <Play className="ml-1" size={28} fill="currentColor" aria-hidden />
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8D4BC] mb-2">
          Video
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-[#FAF8F5]">{title}</h3>
        {subtitle && <p className="mt-2 text-sm text-[#C4B8AE] max-w-xl">{subtitle}</p>}
      </div>
    </>
  );

  return (
    <div className="relative overflow-hidden rounded-lg shadow-media aspect-video w-full max-w-4xl mx-auto">
      <Image src={posterSrc} alt={posterAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 896px" />
      {href ? (
        <a href={href} className="absolute inset-0 group" aria-label={`Reproducir: ${title}`}>
          {inner}
        </a>
      ) : (
        <div className="absolute inset-0 cursor-default">{inner}</div>
      )}
    </div>
  );
}
