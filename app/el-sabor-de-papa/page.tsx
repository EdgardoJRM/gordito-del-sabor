import type { Metadata } from 'next';
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

export default function ElSaborDePapaPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <PapaStickyBar />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-[#1A1412]">
        <Image
          src="/images/social/source-gordito-pavo-oficial.jpg"
          alt="El Gordito del Sabor — edición Día de los Padres"
          fill
          priority
          className="object-cover object-center opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/55 to-[#1A1412]/20" />
        <div className="relative container-custom pb-16 md:pb-24 pt-32 w-full">
          <span className="inline-block rounded-full bg-[#C4472B] px-4 py-1.5 text-xs md:text-sm font-bold uppercase tracking-wider text-white mb-6">
            Edición ultra-limitada: solo {papaEvent.totalAprons} unidades
          </span>
          <h1 className="heading-hero text-[#FAF8F5] max-w-4xl mb-6">
            Regala un legado: el delantal personalizado de El Gordito del Sabor
          </h1>
          <p className="subheadline text-[#E8D4BC] max-w-2xl mb-8">
            Este Día de los Padres, ponle su nombre al regalo más sabroso de Puerto Rico. Stock en
            mano — sin preventa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button href="#ordenar" variant="primary" className="shadow-xl">
              Personalizar mi delantal ahora
            </Button>
          </div>
          <p className="text-sm text-[#C4B8AE]">{papaEvent.socialProof}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing bg-[#FAF8F5]">
        <div className="container-custom">
          <h2 className="heading-section text-[#1A1412] text-center text-3xl md:text-4xl mb-12">
            ¿Por qué este delantal?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {papaBenefits.map((item) => {
              const Icon = benefitIcons[item.icon];
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#E8E0D8] bg-[#F2EDE6] p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C4472B]/10 text-[#C4472B]">
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="font-bold text-[#1A1412] mb-2">{item.title}</h3>
                  <p className="body-text text-sm">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PapaCheckoutSection />

      {/* Steps */}
      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-section text-[#1A1412] text-center text-3xl md:text-4xl mb-12">
            Así de fácil es ordenar
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {papaSteps.map((step) => (
              <li
                key={step.step}
                className="flex gap-4 rounded-2xl border border-[#E8E0D8] bg-white p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C4472B] text-white font-bold">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-bold text-[#1A1412] mb-1">{step.title}</h3>
                  <p className="body-text text-sm">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-section text-[#1A1412] text-center text-3xl md:text-4xl mb-10">
            Lo que dice la familia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-xl mx-auto">
            {papaTestimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                t={{ id: t.id, quote: t.quote, name: t.author, role: t.location, isReal: false }}
              />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[#6B5B4E]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8E0D8] bg-[#FAF8F5] px-4 py-2 font-bold">
              Hecho en Puerto Rico
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E8E0D8] bg-[#FAF8F5] px-4 py-2 font-bold">
              Pago seguro con Stripe
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-[#1A1412]">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section text-[#FAF8F5] text-center text-3xl md:text-4xl mb-10">
            Preguntas frecuentes
          </h2>
          <FAQAccordion
            items={papaFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
            dark
          />
          <p className="text-center text-[#C4B8AE] mt-8 body-text">
            ¿Más dudas? Escríbenos a{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-[#E8D4BC] underline">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing bg-[#C4472B] text-center">
        <div className="container-custom max-w-2xl space-y-6">
          <h2 className="heading-section text-white text-3xl md:text-4xl">
            Una vez se agoten los 100, no habrá más
          </h2>
          <p className="text-[#FFE8E0] text-lg">
            No dejes a papá con las manos vacías este domingo. Esto es bello — y se acaba.
          </p>
          <Button href="#ordenar" variant="dark" className="bg-[#1A1412] border-[#1A1412]">
            Personalizar mi delantal ahora
          </Button>
        </div>
      </section>
    </main>
  );
}
