'use client';

import { useRouter } from 'next/navigation';

export default function FinalCTA() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center space-y-12 px-4">
          {/* Headline */}
          <h2 className="text-5xl md:text-7xl lg:text-[80px] font-semibold leading-tight text-white">
            Listo para cocinar
            <br />
            con sabor.
          </h2>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <button
              onClick={() => router.push('/recetas')}
              className="inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white font-semibold py-5 px-12 rounded-full transition-all transform hover:scale-105 text-lg"
            >
              Explorar recetas
            </button>
            <button
              onClick={() => router.push('/tienda')}
              className="inline-block border-2 border-white text-white font-semibold py-5 px-12 rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105 text-lg"
            >
              Diseñar delantal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
