import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import {
  papaHero,
  papaHomeHero,
  papaHighlights,
  papaProductName,
  papaProductSlug,
  papaTeamPhotos,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';

export function ComfortHomeHero() {
  return (
    <section
      id="site-hero"
      className="relative -mt-[4.5rem] pt-[4.5rem] min-h-[92svh] flex items-center bg-[#1A1412] overflow-hidden"
    >
      <Image
        src={papaTeamPhotos.hero}
        alt="El Gordito del Sabor"
        fill
        priority
        className="object-cover object-center opacity-65"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1412]/92 via-[#1A1412]/75 to-[#1A1412]/40" />
      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="comfort-eyebrow text-[#E8D4BC] mb-5">{papaHomeHero.eyebrow}</p>
          <h1 className="heading-hero text-[#FAF8F5] mb-6">{papaHomeHero.headline}</h1>
          <p className="text-xl md:text-2xl text-[#E8D4BC] leading-relaxed mb-10 max-w-xl">
            {papaHomeHero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={papaHomeHero.ctaPrimaryHref} size="lg" className="shadow-xl w-full sm:w-auto">
              {papaHomeHero.ctaPrimary}
            </Button>
            <Button href={papaHomeHero.ctaSecondaryHref} variant="ghost" size="lg" className="w-full sm:w-auto">
              {papaHomeHero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComfortHomeProduct() {
  return (
    <section className="section-spacing-comfort bg-[#FAF8F5]">
      <div className="container-custom max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#E8E0D8] order-2 lg:order-1">
            <Image
              src={papaTeamPhotos.solution}
              alt={papaProductName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="comfort-eyebrow text-[#C4472B] mb-3">{papaHero.eyebrow}</p>
            <h2 className="heading-section-comfort text-[#1A1412] mb-5">{papaProductName}</h2>
            <p className="text-xl text-[#6B5B4E] leading-relaxed mb-8">{papaHero.subheadline}</p>
            <ul className="space-y-4 mb-10">
              {papaHighlights.slice(0, 3).map((item) => (
                <li key={item.title} className="text-lg text-[#1A1412]">
                  <span className="font-bold">{item.title}.</span>{' '}
                  <span className="text-[#6B5B4E]">{item.text}</span>
                </li>
              ))}
            </ul>
            <Button href={`${papaProductSlug}#ordenar`} size="lg">
              {papaHero.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComfortHomeRecetas() {
  return (
    <section className="section-spacing-comfort bg-[#F2EDE6] border-y border-[#E8E0D8]">
      <div className="container-custom max-w-3xl text-center">
        <h2 className="heading-section-comfort text-[#1A1412] mb-5">Recetas que saben a casa</h2>
        <p className="text-xl text-[#6B5B4E] leading-relaxed mb-10">
          Sazón boricua, paso a paso. Explora el archivo de recetas y cocina con nosotros.
        </p>
        <Button href="/recetas" variant="secondary" size="lg">
          Ver recetas
        </Button>
      </div>
    </section>
  );
}

export function ComfortHomeTrust() {
  return (
    <section className="section-spacing-comfort bg-[#1A1412] text-center">
      <div className="container-custom max-w-2xl space-y-8">
        <h2 className="heading-section-comfort text-[#FAF8F5]">¿Preguntas?</h2>
        <p className="text-xl text-[#C4B8AE] leading-relaxed">
          Estamos en redes y por email. Te respondemos con claridad antes de que ordenes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={`mailto:${siteConfig.email}`} size="lg">
            Escribir por email
          </Button>
          <Button href="/preguntas" variant="ghost" size="lg">
            Preguntas frecuentes
          </Button>
        </div>
        <p className="text-base text-[#9C8B80]">
          Síguenos en{' '}
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8D4BC] underline hover:text-white"
          >
            Instagram
          </a>
        </p>
      </div>
    </section>
  );
}

/** @deprecated Use ComfortHomeProduct — kept for imports during transition */
export const ComfortHomeWhy = ComfortHomeProduct;
export const ComfortHomeHow = ComfortHomeRecetas;
