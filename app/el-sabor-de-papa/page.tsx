import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import PapaCheckoutSection from '@/components/papa-event/PapaCheckoutSection';
import PapaSocialProofCard from '@/components/papa-event/PapaSocialProofCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import PapaOrderCta from '@/components/papa-event/PapaOrderCta';
import {
  papaEvent,
  papaFaqs,
  papaGuarantees,
  papaHero,
  papaProblem,
  papaSolution,
  papaSteps,
  papaSocialProof,
  papaTeamPhotos,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'El Sabor de Papá | Delantal personalizado | El Gordito del Sabor',
  description:
    'Regala un legado, no solo un delantal. Edición limitada: 100 unidades con bordado personalizado, recogida garantizada en Área Metro y pago seguro con Stripe.',
  openGraph: {
    title: 'El Sabor de Papá — Regala un legado',
    description: 'Solo 100 unidades. Bordado a mano. Recogida garantizada antes del Domingo.',
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

export default function ElSaborDePapaPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* 1. HERO */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-[#1A1412]">
        <Image
          src={papaTeamPhotos.hero}
          alt="El Gordito del Sabor — El Sabor de Papá"
          fill
          priority
          className="object-cover object-center opacity-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/65 to-[#1A1412]/30" />
        <div className="relative container-custom pb-14 md:pb-20 pt-28 w-full min-w-0">
          <p className="comfort-eyebrow text-[#E8D4BC] mb-4">{papaHero.eyebrow}</p>
          <h1 className="heading-hero text-[#FAF8F5] max-w-3xl mb-6 break-words">
            {papaHero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-[#E8D4BC] max-w-2xl mb-8 leading-relaxed">
            {papaHero.subheadline}
          </p>
          <PapaOrderCta size="lg" className="shadow-xl w-full sm:w-auto animate-pulse" />
          <p className="mt-6 text-lg text-[#C4B8AE]">{papaEvent.socialProof}</p>
        </div>
      </section>

      {/* 2. PROBLEMA */}
      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="heading-section-comfort text-[#1A1412] mb-6">{papaProblem.title}</h2>
              <div className="space-y-3 text-xl text-[#6B5B4E] leading-relaxed mb-6">
                {papaProblem.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="text-xl font-bold text-[#1A1412] leading-relaxed">{papaProblem.closing}</p>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#E8E0D8]">
              <Image
                src={papaTeamPhotos.problem}
                alt="Papá en la cocina — El Gordito del Sabor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUCIÓN */}
      <section className="section-spacing-comfort bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#E8E0D8] order-2 lg:order-1">
              <Image
                src={papaTeamPhotos.solution}
                alt="Delantal personalizado El Sabor de Papá"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="heading-section-comfort text-[#1A1412] mb-4">{papaSolution.title}</h2>
              <p className="text-xl text-[#6B5B4E] mb-8 leading-relaxed">{papaSolution.subtitle}</p>
              <ul className="space-y-4 mb-8">
                {papaSolution.bullets.map((line) => (
                  <li key={line} className="flex gap-3 text-lg text-[#1A1412]">
                    <Check className="shrink-0 text-[#C4472B] mt-1" size={22} aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-bold text-[#6B5B4E] leading-relaxed italic">
                {papaSolution.closing}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRUEBA SOCIAL */}
      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-5xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-4">
            Una comunidad que confía en nuestro sabor
          </h2>
          <p className="text-center text-lg text-[#6B5B4E] mb-10 max-w-2xl mx-auto">
            No inventamos números. Esto es lo que mueven nuestras redes cada mes — gente real
            cocinando con El Gordito del Sabor.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {papaSocialProof.map((item) => (
              <PapaSocialProofCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-10 relative aspect-[4/5] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#E8E0D8] mb-8">
            <Image
              src={papaTeamPhotos.trust}
              alt="El Gordito del Sabor con su delantal bordado"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 90vw, 448px"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-lg font-bold text-[#1A1412]">
            <span className="rounded-full border-2 border-[#E8E0D8] bg-white px-5 py-3">
              Hecho en Puerto Rico 🇵🇷
            </span>
            <span className="rounded-full border-2 border-[#E8E0D8] bg-white px-5 py-3">
              Recogida garantizada antes del domingo
            </span>
            <span className="rounded-full border-2 border-[#E8E0D8] bg-white px-5 py-3">
              Pago seguro con Stripe
            </span>
          </div>
        </div>
      </section>

      {/* 5–7. OFERTAS */}
      <Suspense fallback={<CheckoutFallback />}>
        <PapaCheckoutSection />
      </Suspense>

      {/* 8. PASO A PASO */}
      <section className="section-spacing-comfort bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-10">Así funciona</h2>
          <ol className="space-y-5">
            {papaSteps.map((step) => (
              <li
                key={step.step}
                className="flex gap-5 rounded-2xl border-2 border-[#E8E0D8] bg-white p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C4472B] text-white text-xl font-bold">
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

      {/* 9. URGENCIA */}
      <section className="section-spacing-comfort bg-[#C4472B] text-center text-white">
        <div className="container-custom max-w-2xl space-y-6">
          <p className="comfort-eyebrow text-[#FFE8E0]">⏰ Tiempo limitado</p>
          <h2 className="heading-section-comfort text-white">
            El Día de los Padres es el domingo
          </h2>
          <p className="text-xl text-[#FFE8E0] leading-relaxed">
            Si quieres <strong>garantía 100%</strong>, elige recogida en {papaEvent.pickupLocation}.
            <br />
            Viernes 20 o Sábado 21 — tú eliges la hora.
          </p>
          <p className="text-lg text-[#FFE8E0]/90">
            Si eliges correo, corres el riesgo de que llegue tarde.
          </p>
          <PapaOrderCta variant="dark" size="lg" className="bg-[#1A1412] border-[#1A1412]" />
        </div>
      </section>

      {/* 10. GARANTÍA */}
      <section className="section-spacing-comfort bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="heading-section-comfort text-[#1A1412] mb-8">Calidad y confianza</h2>
          <p className="text-xl text-[#6B5B4E] mb-8 leading-relaxed">
            Cada delantal se borda a mano con cuidado. Si eliges recogida en Área Metro, te garantizamos
            tenerlo listo antes del Domingo.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            {papaGuarantees.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-[#E8E0D8] bg-white p-4 text-lg text-[#1A1412]"
              >
                <Check className="shrink-0 text-[#C4472B] mt-0.5" size={22} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. ÚLTIMA LLAMADA */}
      <section className="section-spacing-comfort bg-[#1A1412] text-center">
        <div className="container-custom max-w-2xl space-y-6">
          <h2 className="heading-section-comfort text-[#FAF8F5]">Última llamada</h2>
          <p className="text-xl text-[#E8D4BC] leading-relaxed">
            Papá se merece esto. Tú sabes que es el regalo perfecto.
            <br />
            No dejes que se agoten.
          </p>
          <PapaOrderCta size="lg" className="w-full sm:w-auto shadow-xl">
            Asegura tu delantal — desde $49.99
          </PapaOrderCta>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-8">
            Preguntas frecuentes
          </h2>
          <FAQAccordion
            items={papaFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
          />
          <p className="text-center text-[#6B5B4E] mt-8 text-lg">
            ¿Más dudas? Escríbenos a{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-[#C4472B] underline font-bold">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
