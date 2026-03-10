'use client';

import { useRouter } from 'next/navigation';

export default function ProductSection() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center space-y-12 px-4">
          {/* Headline */}
          <h2 className="text-5xl md:text-7xl lg:text-[80px] font-semibold leading-tight text-white">
            El delantal del sabor.
          </h2>

          {/* Copy */}
          <div className="text-xl md:text-2xl text-[#A1A1A6] leading-relaxed space-y-8 max-w-4xl mx-auto">
            <p>
              Diseñado para los que cocinan con respeto.
            </p>
            <p>
              Personaliza el tuyo y cocina con estilo.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <button
              onClick={() => router.push('/tienda')}
              className="inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105 text-lg"
            >
              Diseñar mi delantal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
