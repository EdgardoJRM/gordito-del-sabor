'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export default function EbookSection() {
  const router = useRouter();

  return (
    <section id="ebook-section" className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-8">
            <h2 className="heading-section text-[#1A1412]">
              Las 20 Recetas
              <br />
              Favoritas del Sabor
            </h2>
            <p className="body-text text-xl md:text-2xl max-w-xl">
              Descarga gratis el recetario con 20 de las recetas favoritas del Gordito.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#C4472B] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Recetas fáciles de preparar</p>
              </div>
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#C4472B] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Ingredientes simples</p>
              </div>
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#C4472B] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Sabor boricua auténtico</p>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={() => router.push('/recetario')}
                className="btn-text inline-block bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 px-12 rounded-full transition-all transform hover:scale-105"
              >
                Descargar Gratis
              </button>
            </div>
          </div>

          {/* Visual block */}
          <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#E8E0D8] flex items-center justify-center shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C4472B]/5 via-transparent to-[#B8860B]/5" />
            <div className="relative z-10 text-center px-8">
              <p className="text-sm tracking-[0.3em] uppercase text-[#6B5B4E] mb-4">
                Recetario digital
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-[#1A1412] mb-4">
                20 Recetas
                <br />
                que saben a casa
              </h3>
              <p className="body-text text-sm md:text-base max-w-md mx-auto mb-6">
                Formato PDF, fácil de leer en tu celular, tablet o computadora.
              </p>
              <p className="text-xs text-[#9C8B80]">
                Descarga gratis. Ideal para empezar el viaje antes de diseñar tu delantal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
