'use client';

import { useRouter } from 'next/navigation';

export default function GorditoSection() {
  const router = useRouter();

  return (
    <section className="section-spacing flex items-center justify-center bg-[#F2EDE6]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto primero en mobile, imagen en desktop */}
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="heading-section text-[#1A1412]">
              El Gordito
              <br />
              del Sabor
            </h2>
            <p className="body-text text-xl md:text-2xl">
              Más de 160,000 personas siguen sus recetas para aprender a cocinar con verdadero sazón boricua.
            </p>
            <button
              onClick={() => router.push('/recetas')}
              className="btn-text inline-block bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 px-10 rounded-full transition-all transform hover:scale-105"
            >
              Ver recetas
            </button>
          </div>

          {/* Imagen grande */}
          <div className="relative h-[600px] rounded-3xl overflow-hidden order-1 lg:order-2 shadow-lg border border-[#E8E0D8]">
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
