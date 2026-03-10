'use client';

import { useRouter } from 'next/navigation';

export default function GorditoSection() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
          {/* Texto primero en mobile, imagen en desktop */}
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-5xl md:text-7xl font-semibold leading-tight text-white">
              El Gordito
              <br />
              del Sabor
            </h2>
            <p className="text-xl md:text-2xl text-[#A1A1A6] leading-relaxed">
              Más de 160,000 personas siguen sus recetas para aprender a cocinar con verdadero sazón boricua.
            </p>
            <button
              onClick={() => router.push('/recetas')}
              className="inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105 text-lg"
            >
              Ver recetas
            </button>
          </div>

          {/* Imagen grande */}
          <div className="relative h-[600px] rounded-3xl overflow-hidden order-1 lg:order-2">
            <img
              src="/images/gordito-profile.jpg"
              alt="El Gordito del Sabor"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
