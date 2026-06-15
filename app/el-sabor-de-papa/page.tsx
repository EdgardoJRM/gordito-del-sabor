import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import { Heart, Pencil, Shield, Clock } from 'lucide-react';
import PapaStickyBar from '@/components/papa-event/PapaStickyBar';
import PapaCheckoutSection from '@/components/papa-event/PapaCheckoutSection';
import FAQAccordion from '@/components/ui/FAQAccordion';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Button from '@/components/ui/Button';
import {
  papaBenefits,
  papaEvent,
  papaFaqs,
  papaSteps,
  papaTestimonials,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'El Sabor de Papá | Delantal personalizado | El Gordito del Sabor',
  description:
    'Edición ultra-limitada: 100 delantales personalizados para el Día de los Padres. Bordado con nombre, recetario digital y pago seguro con Stripe.',
  openGraph: {
    title: 'El Sabor de Papá — Delantal personalizado',
    description: 'Regala un legado. Solo 100 unidades. Ordena hoy.',
    type: 'website',
    locale: 'es_PR',
  },
};

const benefitIcons = {
  pencil: Pencil,
  shield: Shield,
  heart: Heart,
  clock: Clock,
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
      <PapaStickyBar />

      <section className="relative min-h-[75vh] flex items-end overflow-hidden bg-[#1A1412]">
        <Image
          src="/images/social/source-gordito-pavo-oficial.jpg"
          alt="El Gordito del Sabor — edición Día de los Padres"
          fill
          priority
          className="object-cover object-center opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/60 to-[#1A1412]/25" />
        <div className="relative container-custom pb-14 md:pb-20 pt-28 w-full min-w-0">
          <p className="comfort-eyebrow text-[#E8D4BC] mb-4">
            Solo {papaEvent.totalAprons} unidades · Día de los Padres
          </p>
          <h1 className="heading-hero text-[#FAF8F5] max-w-3xl mb-6 break-words">
            El delantal personalizado que papá va a usar con orgullo
          </h1>
          <p className="text-xl md:text-2xl text-[#E8D4BC] max-w-2xl mb-8 leading-relaxed">
            Ponle su nombre al regalo más sabroso de Puerto Rico. Stock en mano, sin preventa.
          </p>
          <Button href="#ordenar" size="lg" className="shadow-xl w-full sm:w-auto">
            Personalizar mi delantal
          </Button>
          <p className="mt-6 text-lg text-[#C4B8AE]">{papaEvent.socialProof}</p>
        </div>
      </section>

      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-10">
            ¿Por qué este delantal?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {papaBenefits.map((item) => {
              const Icon = benefitIcons[item.icon];
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border-2 border-[#E8E0D8] bg-white p-6 flex gap-4"
                >
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#C4472B]/10 text-[#C4472B]">
                    <Icon size={26} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1412] mb-2">{item.title}</h3>
                    <p className="body-text text-lg">{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Suspense fallback={<CheckoutFallback />}>
        <PapaCheckoutSection />
      </Suspense>

      <section className="section-spacing-comfort bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-10">
            Así de fácil es ordenar
          </h2>
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

      <section className="section-spacing-comfort bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-8">
            Lo que dice la familia
          </h2>
          {papaTestimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              t={{ id: t.id, quote: t.quote, name: t.author, role: t.location, isReal: false }}
            />
          ))}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-lg font-bold text-[#1A1412]">
            <span className="rounded-full border-2 border-[#E8E0D8] bg-white px-5 py-3">
              Hecho en Puerto Rico
            </span>
            <span className="rounded-full border-2 border-[#E8E0D8] bg-white px-5 py-3">
              Pago seguro
            </span>
          </div>
        </div>
      </section>

      <section className="section-spacing-comfort bg-[#1A1412]">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section-comfort text-[#FAF8F5] text-center mb-8">
            Preguntas frecuentes
          </h2>
          <FAQAccordion
            items={papaFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
            dark
          />
          <p className="text-center text-[#C4B8AE] mt-8 text-lg">
            ¿Más dudas? Escríbenos a{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-[#E8D4BC] underline font-bold">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>

      <section className="section-spacing-comfort bg-[#C4472B] text-center">
        <div className="container-custom max-w-2xl space-y-6">
          <h2 className="heading-section-comfort text-white">
            Cuando se agoten los 100, no habrá más
          </h2>
          <p className="text-xl text-[#FFE8E0] leading-relaxed">
            No dejes a papá con las manos vacías este domingo. Esto es bello — y se acaba.
          </p>
          <Button href="#ordenar" variant="dark" size="lg" className="bg-[#1A1412] border-[#1A1412]">
            Personalizar mi delantal ahora
          </Button>
        </div>
      </section>
    </main>
  );
}
