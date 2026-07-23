import type { Testimonial } from '@/lib/testimonials';

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="surface-inset rounded-lg p-8 h-full flex flex-col">
      <blockquote className="body-text text-warm-dark flex-1 italic">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 pt-6 hairline-t border-border-subtle">
        <p className="font-bold text-warm-dark">{t.name}</p>
        <p className="text-sm text-earth">{t.role}</p>
        {t.isReal === false && (
          <p className="text-xs text-earth-light mt-2">Ejemplo — sustituir con testimonio real.</p>
        )}
      </figcaption>
    </figure>
  );
}
