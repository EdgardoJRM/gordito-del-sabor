import type { Testimonial } from '@/lib/testimonials';

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="rounded-2xl border border-[#E8E0D8] bg-[#FAF8F5] p-8 shadow-sm h-full flex flex-col">
      <blockquote className="body-text text-[#1A1412] flex-1 italic">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 pt-6 border-t border-[#E8E0D8]">
        <p className="font-bold text-[#1A1412]">{t.name}</p>
        <p className="text-sm text-[#6B5B4E]">{t.role}</p>
        {t.isReal === false && (
          <p className="text-xs text-[#9C8B80] mt-2">Ejemplo — sustituir con testimonio real.</p>
        )}
      </figcaption>
    </figure>
  );
}
