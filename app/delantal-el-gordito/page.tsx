import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import PapaCheckoutSection from '@/components/papa-event/PapaCheckoutSection';
import PapaCtaWithMicro from '@/components/papa-event/PapaCtaWithMicro';
import PapaEarlyUrgency from '@/components/papa-event/PapaEarlyUrgency';
import PapaSocialProofCard from '@/components/papa-event/PapaSocialProofCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import {
  papaBeforeAfter,
  papaBigPromise,
  papaBio,
  papaCallout,
  papaClose,
  papaCommunityWall,
  papaCtaMicro,
  papaDisclaimers,
  papaEnemy,
  papaEvent,
  papaFaqs,
  papaFounderLetter,
  papaFuturePacing,
  papaGuaranteeSection,
  papaGuarantees,
  papaHero,
  papaLossHeadline,
  papaMechanism,
  papaPrinciples,
  papaProductName,
  papaProductSlug,
  papaQualification,
  papaSocialProof,
  papaSocialProofEarly,
  papaSteps,
  papaTeamPhotos,
  papaUniversality,
  papaValueStacks,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${papaProductName} | El Gordito del Sabor`,
  description:
    'Delantal personalizado con bordado a mano — el regalo con nombre que no se olvida. Hecho en Puerto Rico. Desde $49.99.',
  openGraph: {
    title: `${papaProductName} — El Gordito del Sabor`,
    description:
      'Regala un delantal con el nombre bordado a mano. Unidades limitadas en Puerto Rico.',
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

function ProseSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`section-spacing-comfort ${className}`}>
      <div className="container-custom max-w-3xl">{children}</div>
    </section>
  );
}

export default function DelantalElGorditoPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Hero — Secciones 1 y 2 */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-[#1A1412]">
        <Image
          src={papaTeamPhotos.hero}
          alt={`El Gordito del Sabor — ${papaProductName}`}
          fill
          priority
          className="object-cover object-center opacity-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/60 to-[#1A1412]/30" />
        <div className="relative container-custom pb-16 md:pb-24 pt-28 w-full max-w-4xl">
          <p className="text-sm md:text-base text-[#E8D4BC]/90 leading-relaxed mb-6 border-l-2 border-[#C4472B] pl-4">
            {papaCallout.text}
          </p>
          <p className="comfort-eyebrow text-[#E8D4BC] mb-4">{papaHero.eyebrow}</p>
          <h1 className="heading-hero text-[#FAF8F5] max-w-3xl mb-8">{papaHero.headline}</h1>
          <div className="space-y-4 text-lg md:text-xl text-[#E8D4BC]/95 leading-relaxed mb-8 max-w-2xl">
            {papaLossHeadline.paragraphs.slice(0, 4).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-bold text-[#FAF8F5] mb-8">{papaHero.priceFrom}</p>
          <PapaCtaWithMicro size="lg" className="shadow-xl" microTone="light">
            {papaHero.cta}
          </PapaCtaWithMicro>
        </div>
      </section>

      {/* Resto sección 2 */}
      <ProseSection className="bg-[#FAF8F5]">
        <div className="space-y-5 text-lg text-[#6B5B4E] leading-relaxed">
          {papaLossHeadline.paragraphs.slice(4).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-10">
          <PapaCtaWithMicro size="lg" className="shadow-lg">
            Asegura el tuyo ahora desde $49.99
          </PapaCtaWithMicro>
        </div>
      </ProseSection>

      {/* Sección 3 */}
      <PapaEarlyUrgency />

      {/* Sección 4 */}
      <ProseSection className="bg-[#FAF8F5]">
        <p className="comfort-eyebrow text-[#6B5B4E] mb-3">{papaSocialProofEarly.eyebrow}</p>
        <h2 className="heading-section-comfort text-[#1A1412] mb-8">{papaSocialProofEarly.title}</h2>
        <div className="space-y-5 text-lg text-[#6B5B4E] leading-relaxed">
          {papaSocialProofEarly.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </ProseSection>

      {/* Sección 5 */}
      <ProseSection className="bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <h2 className="heading-section-comfort text-[#1A1412] mb-8">{papaBigPromise.title}</h2>
        <div className="space-y-5 text-lg text-[#6B5B4E] leading-relaxed">
          {papaBigPromise.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </ProseSection>

      {/* Sección 6 */}
      <ProseSection className="bg-[#FAF8F5]">
        <h2 className="heading-section-comfort text-[#1A1412] mb-6">{papaEnemy.title}</h2>
        <p className="text-lg text-[#6B5B4E] leading-relaxed mb-6">{papaEnemy.intro}</p>
        <ul className="space-y-2 mb-8">
          {papaEnemy.examples.map((item) => (
            <li key={item} className="flex gap-3 text-lg text-[#6B5B4E]">
              <span className="text-[#C4472B]">—</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold text-[#1A1412] mb-6">{papaEnemy.marketLine}</p>
        <p className="text-lg text-[#6B5B4E] mb-4">Y el resultado es siempre el mismo:</p>
        <ul className="space-y-2 mb-8">
          {papaEnemy.outcomes.map((item) => (
            <li key={item} className="flex gap-3 text-lg text-[#6B5B4E]">
              <span className="text-[#C4472B]">—</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="space-y-5 text-lg text-[#6B5B4E] leading-relaxed">
          {papaEnemy.closing.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </ProseSection>

      {/* Sección 7 */}
      <ProseSection className="bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <h2 className="heading-section-comfort text-[#1A1412] mb-6">{papaUniversality.title}</h2>
        <p className="text-lg text-[#6B5B4E] leading-relaxed mb-8">{papaUniversality.intro}</p>
        <p className="font-bold text-[#1A1412] text-lg mb-4">{papaUniversality.subtitle}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {papaUniversality.occasions.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-[#E8E0D8] bg-white p-4 text-[#6B5B4E]"
            >
              <Check className="shrink-0 text-[#C4472B] mt-0.5" size={18} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-[#1A1412]">{papaUniversality.closing}</p>
      </ProseSection>

      {/* Sección 8 */}
      <ProseSection className="bg-[#FAF8F5]">
        <h2 className="heading-section-comfort text-[#1A1412] mb-8">{papaQualification.title}</h2>
        <ul className="space-y-4 mb-10">
          {papaQualification.forYou.map((item) => (
            <li key={item} className="flex gap-4 text-lg text-[#6B5B4E]">
              <Check className="shrink-0 text-[#C4472B] mt-1" size={22} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold text-[#1A1412] mb-8">{papaQualification.forYouClosing}</p>
        <h3 className="text-xl font-bold text-[#1A1412] mb-4">{papaQualification.notForYouTitle}</h3>
        <ul className="space-y-4 mb-10">
          {papaQualification.notForYou.map((item) => (
            <li key={item} className="flex gap-4 text-lg text-[#6B5B4E]">
              <X className="shrink-0 text-[#9C8B80] mt-1" size={22} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <PapaCtaWithMicro size="lg" className="shadow-lg" micro={papaQualification.micro}>
          {papaQualification.cta}
        </PapaCtaWithMicro>
      </ProseSection>

      {/* Sección 9 */}
      <ProseSection className="bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <h2 className="heading-section-comfort text-[#1A1412] mb-10">{papaPrinciples.title}</h2>
        <div className="space-y-10">
          {papaPrinciples.items.map((principle) => (
            <article key={principle.title} className="rounded-2xl border border-[#E8E0D8] bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#1A1412] mb-4">{principle.title}</h3>
              <div className="space-y-4 text-lg text-[#6B5B4E] leading-relaxed">
                {principle.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <PapaCtaWithMicro size="lg" className="shadow-lg" micro={papaPrinciples.micro}>
            {papaPrinciples.cta}
          </PapaCtaWithMicro>
        </div>
      </ProseSection>

      {/* Sección 10 — Carta del fundador */}
      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#E8E0D8] lg:sticky lg:top-24">
              <Image
                src={papaTeamPhotos.trust}
                alt="Ariel de Valle — El Gordito del Sabor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="comfort-eyebrow text-[#6B5B4E] mb-2">Carta del fundador</p>
              <p className="text-lg text-[#1A1412] font-bold mb-1">De: {papaFounderLetter.from}</p>
              <p className="text-[#6B5B4E] mb-8">Desde: {papaFounderLetter.location}</p>
              <div className="space-y-5 text-lg text-[#6B5B4E] leading-relaxed mb-10">
                {papaFounderLetter.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="text-xl font-bold text-[#1A1412]">{papaFounderLetter.signature}</p>
              <p className="text-[#6B5B4E] mb-10">{papaFounderLetter.signatureTitle}</p>

              <h3 className="text-xl font-bold text-[#1A1412] mb-6">
                {papaFounderLetter.inlineFaqsTitle}
              </h3>
              <dl className="space-y-5">
                {papaFounderLetter.inlineFaqs.map((faq) => (
                  <div key={faq.q} className="border-t border-[#E8E0D8] pt-5">
                    <dt className="font-bold text-[#1A1412] mb-1">{faq.q}</dt>
                    <dd className="text-[#6B5B4E]">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 11 */}
      <ProseSection className="bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <h2 className="heading-section-comfort text-[#1A1412] mb-10">{papaMechanism.title}</h2>
        <div className="space-y-8">
          {papaMechanism.pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-2xl border border-[#E8E0D8] bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#1A1412] mb-4">{pillar.title}</h3>
              <div className="space-y-4 text-lg text-[#6B5B4E] leading-relaxed">
                {pillar.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </ProseSection>

      {/* Sección 12 */}
      <ProseSection className="bg-[#FAF8F5]">
        <h2 className="heading-section-comfort text-[#1A1412] mb-8">{papaFuturePacing.title}</h2>
        <div className="space-y-5 text-lg text-[#6B5B4E] leading-relaxed mb-10">
          {papaFuturePacing.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <PapaCtaWithMicro size="lg" className="shadow-lg" micro={papaFuturePacing.micro}>
          {papaFuturePacing.cta}
        </PapaCtaWithMicro>
      </ProseSection>

      {/* Sección 13 */}
      <ProseSection className="bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <h2 className="heading-section-comfort text-[#1A1412] text-center mb-12">
          Así funciona, paso a paso
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
                <h3 className="text-xl font-bold text-[#1A1412] mb-2">{step.title}</h3>
                <p className="body-text text-lg leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </ProseSection>

      {/* Sección 14 */}
      <ProseSection className="bg-[#FAF8F5]">
        <h2 className="heading-section-comfort text-[#1A1412] text-center mb-12">
          {papaBeforeAfter.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[#E8E0D8] bg-white p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#9C8B80] mb-6">{papaBeforeAfter.beforeTitle}</h3>
            <ul className="space-y-4">
              {papaBeforeAfter.before.map((item) => (
                <li key={item} className="flex gap-3 text-[#6B5B4E]">
                  <X className="shrink-0 text-[#9C8B80] mt-1" size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-[#C4472B] bg-white p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#C4472B] mb-6">{papaBeforeAfter.afterTitle}</h3>
            <ul className="space-y-4">
              {papaBeforeAfter.after.map((item) => (
                <li key={item} className="flex gap-3 text-[#1A1412]">
                  <Check className="shrink-0 text-[#C4472B] mt-1" size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ProseSection>

      {/* Sección 15 */}
      <section className="section-spacing-comfort bg-[#1A1412]">
        <div className="container-custom max-w-6xl">
          <h2 className="heading-section-comfort text-[#FAF8F5] text-center mb-4">
            {papaCommunityWall.title}
          </h2>
          <p className="text-xl text-[#E8D4BC] text-center mb-12">{papaCommunityWall.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {papaSocialProof.map((item) => (
              <PapaSocialProofCard key={item.id} item={item} />
            ))}
          </div>
          <div className="space-y-5 text-lg text-[#E8D4BC]/90 leading-relaxed max-w-3xl mx-auto text-center">
            {papaCommunityWall.stats.map((stat) => (
              <p key={stat}>{stat}</p>
            ))}
            {papaCommunityWall.closing.map((p) => (
              <p key={p} className="font-medium text-[#FAF8F5]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 16 — Value stack + checkout */}
      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-section-comfort text-[#1A1412] text-center mb-4">
            Lo que recibes en cada oferta
          </h2>
          <p className="text-lg text-[#6B5B4E] text-center mb-12">
            Unidades limitadas. Bordado a mano. Sin reposición garantizada.
          </p>
          <div className="space-y-8 mb-12">
            {papaValueStacks.map((stack) => (
              <article
                key={stack.id}
                className="rounded-2xl border border-[#E8E0D8] bg-white p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-[#1A1412]">
                    {stack.title} — {stack.price}
                  </h3>
                  <span className="text-sm text-[#6B5B4E]">
                    Valor total: {stack.totalValue}
                  </span>
                </div>
                <ul className="space-y-3 my-6">
                  {stack.items.map((item) => (
                    <li key={item.label} className="flex justify-between gap-4 text-[#6B5B4E]">
                      <span className="flex gap-2">
                        <Check className="shrink-0 text-[#C4472B] mt-0.5" size={18} aria-hidden />
                        {item.label}
                      </span>
                      <span className="shrink-0 font-medium text-[#1A1412]">{item.value}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-bold text-[#C4472B]">{stack.closing}</p>
              </article>
            ))}
          </div>
          <PapaCtaWithMicro
            size="lg"
            className="shadow-lg mb-12"
            micro={papaCtaMicro.valueStack}
            href={`${papaProductSlug}#ordenar`}
          >
            Asegura el tuyo ahora
          </PapaCtaWithMicro>
        </div>
      </section>

      <Suspense fallback={<CheckoutFallback />}>
        <PapaCheckoutSection />
      </Suspense>

      {/* Sección 17 */}
      <ProseSection className="bg-[#F2EDE6] border-y border-[#E8E0D8]">
        <h2 className="heading-section-comfort text-[#1A1412] text-center mb-4">
          {papaGuaranteeSection.title}
        </h2>
        <p className="text-lg text-[#6B5B4E] mb-4 leading-relaxed text-center">
          {papaGuaranteeSection.intro}
        </p>
        <p className="text-lg text-[#6B5B4E] mb-4 leading-relaxed text-center">
          {papaGuaranteeSection.body}
        </p>
        <p className="text-lg text-[#6B5B4E] mb-10 leading-relaxed text-center">
          {papaGuaranteeSection.delivery}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
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
      </ProseSection>

      {/* Sección 18 */}
      <ProseSection className="bg-[#FAF8F5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#E8E0D8]">
            <Image
              src={papaTeamPhotos.solution}
              alt={papaProductName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="heading-section-comfort text-[#1A1412] mb-6">{papaBio.title}</h2>
            <div className="space-y-5 text-lg text-[#6B5B4E] leading-relaxed">
              {papaBio.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </ProseSection>

      {/* Sección 19 — Cierre + FAQ + disclaimers */}
      <section className="section-spacing-comfort bg-[#1A1412] text-center">
        <div className="container-custom max-w-2xl space-y-6 mb-16">
          <h2 className="heading-section-comfort text-[#FAF8F5]">{papaClose.title}</h2>
          <p className="text-xl text-[#E8D4BC] leading-relaxed">{papaClose.subtitle}</p>
          <p className="text-2xl font-bold text-[#FAF8F5]">{papaClose.priceFrom}</p>
          <PapaCtaWithMicro
            size="lg"
            href={`${papaProductSlug}#ordenar`}
            microTone="light"
            micro={papaClose.micro}
          >
            {papaClose.cta}
          </PapaCtaWithMicro>
        </div>
      </section>

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

      <section className="py-12 bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#9C8B80] mb-4 text-center">
            Avisos
          </h2>
          <ul className="space-y-3 text-sm text-[#6B5B4E] leading-relaxed">
            {papaDisclaimers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-center text-[#6B5B4E] mt-8 text-sm">
            Hecho en Puerto Rico con amor. Sazón boricua de verdad.
            <br />
            El Gordito del Sabor — {siteConfig.email}
          </p>
          <p className="text-center mt-6">
            <Link href="/recetas" className="text-[#C4472B] font-bold underline hover:text-[#A8381F]">
              Explora nuestras recetas
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
