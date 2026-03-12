'use client';

export default function ProductLifestyle() {
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
          <div className="inline-block">
            <span className="inline-block px-4 py-2 bg-[#FF3B30]/20 text-[#FF3B30] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              Próximamente
            </span>
          </div>
          <h2 className="heading-section text-white">
            El delantal
            <br />
            del sabor.
          </h2>
          <p className="body-text text-xl md:text-2xl max-w-3xl mx-auto">
            Diseñado para los que cocinan con respeto.
          </p>
          <p className="body-text text-lg text-[#A1A1A6] max-w-2xl mx-auto">
            Descarga el recetario mientras esperamos el lanzamiento.
          </p>
        </div>

        {/* Grid de fotos lifestyle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {lifestylePhotos.map((photo, index) => (
            <div
              key={index}
              className="relative h-[500px] rounded-2xl overflow-hidden group"
            >
              <img
                src={`/images/lifestyle/${photo.image}`}
                alt={`Lifestyle ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                onError={(e) => {
                  e.currentTarget.src = photo.fallback;
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Próximamente</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => {
              const element = document.getElementById('ebook-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
          >
            Descargar Recetario
          </button>
        </div>
      </div>
    </section>
  );
}
