'use client';

import Image from 'next/image';

const LIFESTYLE_PHOTOS = [
  {
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    alt: 'Cocina con delantal',
  },
  {
    image:
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80',
    alt: 'Comida en mesa',
  },
  {
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    alt: 'Detalle de cocina',
  },
];

export default function ProductLifestyle() {
  return (
    <section className="section-spacing bg-[#FAF8F5]">
      <div className="container-custom">
        <div className="text-center mb-20 space-y-8">
          <div className="inline-block">
            <span className="inline-block px-4 py-2 bg-[#C4472B]/15 text-[#C4472B] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              Próximamente
            </span>
          </div>
          <h2 className="heading-section text-[#1A1412]">
            El delantal
            <br />
            del sabor.
          </h2>
          <p className="body-text text-xl md:text-2xl max-w-3xl mx-auto">
            Diseñado para los que cocinan con respeto.
          </p>
          <p className="body-text text-lg text-[#6B5B4E] max-w-2xl mx-auto">
            Descarga el recetario mientras esperamos el lanzamiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {LIFESTYLE_PHOTOS.map((photo, index) => (
            <div
              key={index}
              className="relative h-[500px] rounded-2xl overflow-hidden group border border-[#E8E0D8] shadow-sm"
            >
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90"
              />
              <div className="absolute inset-0 bg-[#1A1412]/35 flex items-center justify-center pointer-events-none">
                <span className="text-[#FAF8F5] font-bold text-lg">Próximamente</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              const element = document.getElementById('ebook-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-text inline-block bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
          >
            Descargar Recetario
          </button>
        </div>
      </div>
    </section>
  );
}
