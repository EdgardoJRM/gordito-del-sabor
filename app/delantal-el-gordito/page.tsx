import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import PapaProductGallery from '@/components/papa-event/PapaProductGallery';
import PapaProductBuyBox from '@/components/papa-event/PapaProductBuyBox';
import PapaProductAccordion, {
  PapaProductFaqAccordion,
} from '@/components/papa-event/PapaProductAccordion';
import {
  getShopPriceFromLabel,
  getShopPriceSubtitle,
  papaProductName,
  papaShopProduct,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${papaProductName} | El Gordito del Sabor`,
  description: papaShopProduct.description,
  openGraph: {
    title: `${papaProductName} — El Gordito del Sabor`,
    description: papaShopProduct.description,
    type: 'website',
    locale: 'es_PR',
  },
};

function BuyBoxFallback() {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border border-[#E8E0D8] p-6">
      <div className="h-12 bg-[#E8E0D8] rounded-md" />
      <div className="h-12 bg-[#E8E0D8] rounded-md" />
      <div className="h-14 bg-[#E8E0D8] rounded-md" />
    </div>
  );
}

export default function DelantalElGorditoPage() {
  return (
    <main id="papa-hero" className="min-h-screen bg-white pb-24 md:pb-12">
      <div className="container-custom py-8 md:py-12 lg:py-16">
        <nav className="text-sm text-[#6B5B4E] mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1A1412] hover:underline">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1412]">{papaProductName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
          <PapaProductGallery theme="light" />

          <div className="lg:sticky lg:top-36 lg:self-start space-y-6">
            <div>
              <p className="text-sm text-[#6B5B4E] mb-1">{papaShopProduct.vendor}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1412] tracking-tight mb-2">
                {papaProductName}
              </h1>
              <p className="text-sm text-[#6B5B4E] mb-4">{papaShopProduct.tagline}</p>
              <p className="text-2xl font-semibold text-[#1A1412]">{getShopPriceFromLabel()}</p>
              <p className="text-sm text-[#6B5B4E] mt-1">{getShopPriceSubtitle()}</p>
            </div>

            <p className="text-[#6B5B4E] leading-relaxed">{papaShopProduct.description}</p>

            <Suspense fallback={<BuyBoxFallback />}>
              <PapaProductBuyBox />
            </Suspense>

            <PapaProductAccordion />
          </div>
        </div>
      </div>

      <section className="border-t border-[#E8E0D8] bg-[#FAF8F5]">
        <div className="container-custom max-w-3xl py-12 md:py-16">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-[#1A1412] mb-8 text-center">
            Cómo funciona
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {papaShopProduct.steps.map((step) => (
              <li key={step.step} className="text-sm">
                <span className="font-semibold text-[#1A1412]">
                  {step.step}. {step.title}
                </span>
                <p className="text-[#6B5B4E] mt-1 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-[#E8E0D8]">
        <div className="container-custom max-w-2xl py-12 md:py-16">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-[#1A1412] mb-6">
            Preguntas frecuentes
          </h2>
          <PapaProductFaqAccordion />
          <p className="text-sm text-[#6B5B4E] mt-8 text-center">
            <a
              href={siteConfig.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1412] underline"
            >
              WhatsApp
            </a>
            {' · '}
            <a href={`mailto:${siteConfig.email}`} className="text-[#1A1412] underline">
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
