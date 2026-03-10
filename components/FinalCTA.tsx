'use client';

import { useRouter } from 'next/navigation';

export default function FinalCTA() {
  const router = useRouter();

  return (
    <section className="relative section-spacing flex items-center justify-center bg-black">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/final-cta.jpg"
          alt="Comida en mesa"
          className="w-full h-full object-cover opacity-40"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      {/* Contenido */}
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Headline */}
          <h2 className="heading-section text-white">
            Listo para cocinar?
          </h2>

          {/* CTA */}
          <div className="pt-8">
            <button
              onClick={() => router.push('/recetas')}
              className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
            >
              Explorar recetas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
