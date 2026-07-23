import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Gift, Shield } from 'lucide-react';
import VideoCard from '@/components/ui/VideoCard';
import SectionHeader from '@/components/ui/SectionHeader';
import PricingCard from '@/components/ui/PricingCard';
import FAQAccordion from '@/components/ui/FAQAccordion';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Button from '@/components/ui/Button';
import { offers, checkoutHref } from '@/lib/offers';
import { testimonials } from '@/lib/testimonials';
import { faqCategories } from '@/lib/faqs';

export const metadata: Metadata = {
  title: 'Las 20 Recetas Favoritas del Sabor | El Gordito del Sabor',
  description:
    'Consigue el libro digital con las recetas favoritas del Gordito: pasos claros, ingredientes accesibles y sabor boricua de verdad.',
};

const VALUE_STACK = [
  { label: '20 recetas favoritas paso a paso', value: '$47' },
  { label: 'Fotos reales (no stock genérico)', value: '$29' },
  { label: 'PDF para celular, tablet o imprimir', value: '$15' },
  { label: 'Tips prácticos del Gordito', value: '$19' },
];

const PREVIEW = [
  { file: 'Biftec Encebollado a Mi Estilo.jpeg', label: 'Biftec encebollado' },
  { file: 'Pork Belly.jpeg', label: 'Pork belly' },
  { file: 'Ensalada de Coditos.jpeg', label: 'Ensalada de coditos' },
  { file: 'Coquito de cafe.jpeg', label: 'Coquito de café' },
  { file: 'arroz-chino-ai.jpg', label: 'Arroz chino' },
  { file: 'mongolian beef.jpeg', label: 'Mongolian beef' },
];

function img(file: string) {
  return `/Imagenes20recetas/${encodeURIComponent(file)}`;
}

const libroFaqs =
  faqCategories
    .find((c) => c.id === 'libro')
    ?.items.map((it, i) => ({ id: `lib-${i}`, question: it.q, answer: it.a })) ?? [];

export default function Las20RecetasFavoritasPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="border-b border-[#E8E0D8] bg-[#F2EDE6] py-8">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <p className="label-eyebrow text-[#6B5B4E] mb-3">Libro / ebook</p>
          <h1 className="heading-section text-[#1A1412] max-w-4xl mb-4">
            Las 20 Recetas Favoritas del Sabor, en un solo libro
          </h1>
          <p className="body-text text-xl max-w-2xl">
            Delicias boricuas probadas en comunidad. Pasos claros, ingredientes de verdad y ese toque casero que nos
            identifica.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5]">
        <div className="container-custom max-w-4xl mx-auto space-y-10">
          <VideoCard
            title="Mira el mensaje del Gordito (VSL)"
            subtitle="Placeholder: cuando tengas el video, reemplaza el poster o enlaza a YouTube/Vimeo."
            posterSrc={img('Perinal al caldero al estilo boricua.jpeg')}
            posterAlt="Video — Las 20 recetas favoritas"
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={checkoutHref('libro')}>Quiero mi libro ahora</Button>
            <Button href="/recetario" variant="secondary">
              Prefiero el PDF gratis primero
            </Button>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#1A1412] border-t border-[#2D2220]">
        <div className="container-custom max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FAF8F5]">¿Te pasa esto en la cocina?</h2>
          <ul className="text-left space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            {[
              'Guardas recetas en redes y después no las encuentras.',
              'Compras cosas raras que solo usas una vez.',
              'Quieres sabor de casa sin complicarte con pasos confusos.',
            ].map((line) => (
              <li key={line} className="flex gap-3 text-[#FAF8F5] body-text">
                <span className="text-[#E8D4BC] font-bold shrink-0">·</span>
                {line}
              </li>
            ))}
          </ul>
          <p className="body-text text-lg text-[#C4B8AE]">
            Este libro es lo contrario: 20 favoritas, ordenadas, con el estilo directo del Gordito.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-10 space-y-3">
            <Gift className="mx-auto text-[#C4472B]" size={40} aria-hidden />
            <h2 className="heading-section text-[#1A1412] text-3xl md:text-4xl">Stack de valor</h2>
            <p className="body-text text-lg">Un solo libro. Todo junto.</p>
          </div>
          <div className="rounded-2xl border border-[#E8E0D8] bg-[#FAF8F5] divide-y divide-[#E8E0D8] overflow-hidden">
            {VALUE_STACK.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-6 px-6 py-4">
                <p className="font-bold text-[#1A1412]">{row.label}</p>
                <p className="text-[#9C8B80] line-through">{row.value}</p>
              </div>
            ))}
            <div className="px-6 py-6 bg-[#1A1412] text-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-bold text-lg">Inversión hoy</p>
              <p className="text-3xl font-bold">{offers.libro.priceLabel}</p>
            </div>
          </div>
          <p className="text-center text-sm text-[#6B5B4E] mt-4">
            Precio anclado: ajusta en <code className="rounded bg-white px-1">lib/offers.ts</code>.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom">
          <SectionHeader
            title="Adelanto de lo que cocinas"
            subtitle="Fotos reales del recetario. Esto es lo que tú vas a preparar."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {PREVIEW.map(({ file, label }) => (
              <article
                key={file}
                className="group relative overflow-hidden rounded-2xl border border-[#E8E0D8] bg-[#F2EDE6] shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={img(file)}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width:640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/85 via-transparent to-transparent" />
                  <p className="absolute bottom-0 left-0 right-0 p-4 text-[#FAF8F5] font-bold">{label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-lg mx-auto">
          <PricingCard offer={offers.libro} />
        </div>
        <div className="container-custom max-w-2xl mx-auto text-center mt-12 space-y-4">
          <h3 className="text-2xl font-bold text-[#1A1412]">Bundle sugerido</h3>
          <p className="body-text">
            Libro + Delantal El Gordito: lleva la narrativa completa.{' '}
            <Link href="/delantal" className="text-[#C4472B] font-bold hover:underline">
              Ver Delantal El Gordito
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl mx-auto">
          <SectionHeader title="Testimonios" subtitle="Ejemplos — reemplaza por reales." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#1A1412] border-t border-[#2D2220]">
        <div className="container-custom max-w-2xl mx-auto text-center space-y-6">
          <Shield className="mx-auto text-[#E8D4BC]" size={44} aria-hidden />
          <h2 className="heading-section text-[#FAF8F5] text-3xl md:text-4xl">Garantía simple</h2>
          <p className="body-text text-[#C4B8AE] text-lg">
            Si tu compra está ligada a una pasarela con política de reembolso, respétala ahí. Nosotros queremos que
            cocines feliz: si algo falla con el archivo o el acceso, escríbenos a {''}
            <a href="mailto:info@gorditodelsabor.com" className="text-[#E8D4BC] underline">
              soporte
            </a>{' '}
            y lo arreglamos.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl mx-auto">
          <SectionHeader title="Preguntas frecuentes" />
          <FAQAccordion items={libroFaqs} />
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8] text-center">
        <div className="container-custom max-w-2xl mx-auto space-y-6">
          <h2 className="heading-section text-[#1A1412] text-3xl md:text-4xl">Oferta especial — consíguelo hoy</h2>
          <p className="body-text text-lg">
            Si ya estás aquí, probablemente te gusta cocinar rico. Llévate el libro y mete sazón de verdad en tu rutina.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={checkoutHref('libro')}>Sí, quiero mi libro ahora</Button>
            <Button href="/preguntas" variant="secondary">
              Tengo una duda
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
