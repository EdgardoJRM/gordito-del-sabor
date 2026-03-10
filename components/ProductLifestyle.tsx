'use client';

import { useRouter } from 'next/navigation';

export default function ProductLifestyle() {
  const router = useRouter();

  const lifestylePhotos = [
    { image: 'apron-cooking.jpg', fallback: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80' },
    { image: 'apron-food.jpg', fallback: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80' },
    { image: 'apron-detail.jpg', fallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
  ];

  return (
    <section className="section-spacing bg-black">
      <div className="container-custom">
        {/* Texto */}
        <div className="text-center mb-20 space-y-8">
          <h2 className="heading-section text-white">
            El delantal
            <br />
            del sabor.
          </h2>
          <p className="body-text text-xl md:text-2xl max-w-3xl mx-auto">
            Diseñado para los que cocinan con respeto.
          </p>
        </div>

        {/* Grid de fotos lifestyle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {lifestylePhotos.map((photo, index) => (
            <div
              key={index}
              className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => router.push('/tienda')}
            >
              <img
                src={`/images/lifestyle/${photo.image}`}
                alt={`Lifestyle ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = photo.fallback;
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => router.push('/tienda')}
            className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
          >
            Diseñar mi delantal
          </button>
        </div>
      </div>
    </section>
  );
}
