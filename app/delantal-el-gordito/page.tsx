import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import PapaCheckoutSection from '@/components/papa-event/PapaCheckoutSection';
import PapaOrderCta from '@/components/papa-event/PapaOrderCta';
import FAQAccordion from '@/components/ui/FAQAccordion';
import {
  papaClose,
  papaEmbroideryExamples,
  papaEvent,
  papaFaqs,
  papaGuaranteeSection,
  papaGuarantees,
  papaHero,
  papaHighlights,
  papaProductName,
  papaProductSlug,
  papaSteps,
  papaStory,
  papaTeamPhotos,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${papaProductName} | El Gordito del Sabor`,
  description:
    'Delantal personalizado con bordado a mano hecho en Puerto Rico. Tela premium, tu nombre en la pechera.',
  openGraph: {
    title: `${papaProductName} — El Gordito del Sabor`,
    description: 'Bordado a mano. Hecho en Puerto Rico.',
    type: 'website',
    locale: 'es_PR',
  },
};

function CheckoutFallback() {
  return (
    <section className="section-spacing-comfort bg-[#F2EDE6] border-t border-[#E8E0D8]">
      <div className="container-custom text-center py-12">
        <p className="body-text text-lg">Cargando formulario de orden…</p>
      </div>
    </section>
  );
}

export default function DelantalElGorditoPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden bg-[#1A1412]">
        <Image
          src={papaTeamPhotos.hero}
          alt={`El Gordito del Sabor — ${papaProductName}`}
          fill
          priority
          className="object-cover object-center opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/55 to-transparent" />
        <div className="relative container-custom pb-16 md:pb-24 pt-28 w-full">
          <p className="comfort-eyebrow text-[#E8D4BC] mb-4">{papaHero.eyebrow}</p>
          <h1 className="heading-hero text-[#FAF8F5] max-w-3xl mb-6">{papaHero.headline}</h1>
          <p className="text-xl md:text-2xl text-[#E8D4BC] max-w-xl mb-10 leading-relaxed">
            {papaHero.subheadline}
          </p>
          <PapaOrderCta size="lg" className="shadow-xl" />
        </div>
      </section>

      {/* Detalles */}
      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#E8E0D8]">
              <Image
                src={papaTeamPhotos.solution}
                alt={papaProductName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="heading-section-comfort text-[#1A1412] mb-6">{papaStory.title}</h2>
              <div className="space-y-5 text-lg text-[#6B5B4E] leading-relaxed mb-10">
                {papaStory.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="space-y-5">
                {papaHighlights.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <Check className="shrink-0 text-[#C4472B] mt-1" size={22} aria-hidden />
                    <div>
                      <p className="font-bold text-[#1A1412] text-lg">{item.title}</p>
                      <p className="text-[#6B5B4E]">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bordado */}
      <section className="section-spacing-comfort bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="heading-section-comfort text-[#1A1412] mb-4">Ideas para tu bordado</h2>
          <p className="text-lg text-[#6B5B4E] mb-8">
            Máximo {papaEvent.maxEmbroideryChars} caracteres. Nombres, apodos o frases cortas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {papaEmbroideryExamples.map((example) => (
              <span
                key={example}
                className="rounded-full border border-[#E8E0D8] bg-white px-5 py-2.5 text-lg font-bold text-[#1A1412]"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout */}
      <Suspense fallback={<CheckoutFallback />}>
        <PapaCheckoutSection />
      </Suspense>

      {/* Cómo funciona */}
      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-12">
            Cómo funciona
          </h2>
          <ol className="space-y-5">
            {papaSteps.map((step) => (
              <li
                key={step.step}
                className="flex gap-5 rounded-2xl border border-[#E8E0D8] bg-white p-6 md:p-8"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1A1412] text-white text-lg font-bold">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1412] mb-1">{step.title}</h3>
                  <p className="body-text text-lg">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Garantía */}
      <section className="section-spacing-comfort bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="heading-section-comfort text-[#1A1412] mb-4">{papaGuaranteeSection.title}</h2>
          <p className="text-lg text-[#6B5B4E] mb-4 leading-relaxed">{papaGuaranteeSection.intro}</p>
          <p className="text-lg text-[#6B5B4E] mb-10 leading-relaxed">{papaGuaranteeSection.body}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto">
            {papaGuarantees.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-[#E8E0D8] bg-white p-4 text-[#1A1412]"
              >
                <Check className="shrink-0 text-[#C4472B] mt-0.5" size={20} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-8">
            Preguntas frecuentes
          </h2>
          <FAQAccordion
            items={papaFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
          />
          <p className="text-center text-[#6B5B4E] mt-8 text-lg">
            ¿Más dudas?{' '}
            <a
              href={siteConfig.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C4472B] font-bold underline"
            >
              Escríbenos en WhatsApp
            </a>
            {' · '}
            <a href={`mailto:${siteConfig.email}`} className="text-[#C4472B] font-bold underline">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>

      {/* Cierre */}
      <section className="section-spacing-comfort bg-[#1A1412] text-center">
        <div className="container-custom max-w-2xl space-y-6">
          <h2 className="heading-section-comfort text-[#FAF8F5]">{papaClose.title}</h2>
          <p className="text-xl text-[#E8D4BC] leading-relaxed">{papaClose.subtitle}</p>
          <PapaOrderCta size="lg" href={`${papaProductSlug}#ordenar`}>
            {papaClose.cta}
          </PapaOrderCta>
          <p className="text-base text-[#9C8B80] pt-4">
            <Link href="/recetas" className="text-[#E8D4BC] underline hover:text-white">
              Explora nuestras recetas
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
