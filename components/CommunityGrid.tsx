'use client';

export default function CommunityGrid() {
  const communityPhotos = [
    { image: 'community-1.jpg', fallback: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80' },
    { image: 'community-2.jpg', fallback: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80' },
    { image: 'community-3.jpg', fallback: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
    { image: 'community-4.jpg', fallback: 'https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?w=600&q=80' },
    { image: 'community-5.jpg', fallback: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80' },
    { image: 'community-6.jpg', fallback: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80' },
  ];

  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container-custom px-4">
        {/* Título */}
        <h2 className="text-5xl md:text-7xl font-semibold text-center text-white mb-16">
          La comunidad
          <br />
          del sabor.
        </h2>

        {/* Grid estilo Instagram */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {communityPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={`/images/community/${photo.image}`}
                alt={`Comunidad ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = photo.fallback;
                }}
              />
              {/* Overlay sutil al hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
