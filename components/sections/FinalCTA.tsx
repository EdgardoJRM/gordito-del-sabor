'use client';

import { useRouter } from 'next/navigation';

export default function FinalCTA() {
  const router = useRouter();

  return (
    <section className="relative section-spacing flex items-center justify-center bg-[#1A1412]">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1600&q=80"
          alt="Comida en mesa"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/70 to-[#1A1412]/40" />
      </div>

      {/* Contenido */}
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Headline */}
          <h2 className="heading-section text-[#FAF8F5]">
            ¿Listo para cocinar?
          </h2>

          {/* CTA */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push('/recetas')}
              className="btn-text inline-block bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
            >
              Ver recetas
            </button>
            <button
              onClick={() => router.push('/tienda')}
              className="btn-text inline-block border-2 border-[#FAF8F5] text-[#FAF8F5] py-5 px-12 rounded-full hover:bg-[#FAF8F5] hover:text-[#1A1412] transition-all transform hover:scale-105"
            >
              Diseñar delantal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
