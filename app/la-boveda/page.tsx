import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import PricingCard from '@/components/ui/PricingCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Button from '@/components/ui/Button';
import { offers, checkoutHref } from '@/lib/offers';
import { faqCategories } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'La Bóveda del Sabor | Recetas y videos de El Gordito',
  description:
    'Accede a recetas organizadas, videos paso a paso, listas de compra y contenido premium de El Gordito del Sabor.',
};

const bovedaFaqs = faqCategories
  .find((c) => c.id === 'boveda')
  ?.items.map((it, i) => ({ id: `bv-${i}`, question: it.q, answer: it.a })) ?? [];

export default function LaBovedaPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="bg-[#1A1412] text-[#FAF8F5] py-16 md:py-24 border-b border-[#2D2220]">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#C4B8AE] hover:text-[#FAF8F5] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <p className="label-eyebrow text-[#E8D4BC] mb-4">Producto digital</p>
          <h1 className="heading-section text-[#FAF8F5] max-w-3xl mb-6">
            La Bóveda del Sabor
          </h1>
          <p className="subheadline text-[#D4C9BC] max-w-2xl font-normal">
            Recetas, videos, listas de compra y contenido premium en un solo lugar. Menos ruido, más sazón en tu mesa.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="#planes">Ver planes</Button>
            <Button href="/delantal" variant="ghost">
              Ir al delantal
            </Button>
          </div>
        </div>
      </section>

      <section className="section-spacing hairline-t">
        <div className="container-custom max-w-3xl mx-auto text-center space-y-6">
          <h2 className="heading-section text-[#1A1412] text-3xl md:text-4xl">Qué hay dentro</h2>
          <p className="body-text text-lg">
            Recetas exclusivas y en crecimiento, videos cuando conectes la plataforma, listas de compra por receta, y
            contenido que no depende del algoritmo del día.
          </p>
        </div>
      </section>

      <section id="planes" className="section-spacing bg-[#F2EDE6] hairline-t scroll-mt-24">
        <div className="container-custom">
          <SectionHeader
            title="Planes"
            subtitle="Precios orientativos para validar. Ajusta en `lib/offers.ts` y conecta checkout cuando esté listo."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard offer={offers.bovedaDigital} />
            <PricingCard offer={offers.bovedaFundador} />
            <PricingCard offer={offers.club} />
          </div>
          <p className="text-center mt-12 body-text max-w-2xl mx-auto">
            Bundle recomendado: Edición Fundadores en{' '}
            <Link href="/delantal#edicion-fundadores" className="text-[#C4472B] font-bold hover:underline">
              /delantal
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#1A1412] border-t border-[#2D2220]">
        <div className="container-custom max-w-3xl mx-auto">
          <h2 className="heading-section text-[#FAF8F5] text-center mb-10 text-3xl md:text-4xl">
            Preguntas sobre La Bóveda
          </h2>
          <FAQAccordion items={bovedaFaqs} dark />
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] hairline-t text-center">
        <div className="container-custom max-w-2xl mx-auto space-y-6">
          <h2 className="heading-section text-[#1A1412] text-3xl md:text-4xl">Acceso fundador</h2>
          <p className="body-text text-lg">
            Entra temprano, cocina con guía y ayuda a moldear lo que viene para la comunidad.
          </p>
          <Button href={checkoutHref('boveda')}>
            {offers.bovedaFundador.ctaLabel}
          </Button>
        </div>
      </section>
    </main>
  );
}
