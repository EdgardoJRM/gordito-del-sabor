'use client';

import { useRouter } from 'next/navigation';

export default function EbookSection() {
  const router = useRouter();

  return (
    <section className="section-spacing bg-black border-t border-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-8">
            <h2 className="heading-section text-white">
              Las 20 Recetas
              <br />
              Favoritas del Sabor
            </h2>
            <p className="body-text text-xl md:text-2xl max-w-xl">
              Descarga el recetario con 20 de las recetas favoritas del Gordito. Perfecto para empezar a cocinar con sazón de verdad.
            </p>
            <div>
              <button
                onClick={() => router.push('/contacto?lead=ebook')}
                className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 px-12 rounded-full transition-all transform hover:scale-105"
              >
                Descargar recetario
              </button>
            </div>
          </div>

          {/* Visual block */}
          <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden bg-[#1C1C1E] border border-gray-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/10" />
            <div className="relative z-10 text-center px-8">
              <p className="text-sm tracking-[0.3em] uppercase text-[#A1A1A6] mb-4">
                Recetario digital
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                20 Recetas
                <br />
                que saben a casa
              </h3>
              <p className="body-text text-sm md:text-base max-w-md mx-auto mb-6">
                Formato PDF, fácil de leer en tu celular, tablet o computadora.
              </p>
              <p className="text-xs text-[#6E6E73]">
                Descarga gratis. Ideal para empezar el viaje antes de diseñar tu delantal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

