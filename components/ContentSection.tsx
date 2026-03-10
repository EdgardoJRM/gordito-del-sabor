'use client';

import { useRouter } from 'next/navigation';

export default function ContentSection() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center space-y-12 px-4">
          {/* Headline */}
          <h2 className="text-5xl md:text-7xl lg:text-[80px] font-semibold leading-tight text-white mb-12">
            Aprende a cocinar
            <br />
            con sabor.
          </h2>

          {/* Copy - 3 items */}
          <div className="text-2xl md:text-4xl text-white font-light leading-relaxed space-y-6">
            <p>Recetas fáciles.</p>
            <p>Trucos de cocina.</p>
            <p>Sazón boricua.</p>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <button
              onClick={() => router.push('/recetas')}
              className="inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105 text-lg"
            >
              Ver recetas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
