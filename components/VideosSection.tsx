'use client';

import { useRouter } from 'next/navigation';

export default function VideosSection() {
  const router = useRouter();

  const videos = [
    { title: 'Mofongo tradicional', thumbnail: 'video-1.jpg', fallback: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80' },
    { title: 'Arroz con gandules', thumbnail: 'video-2.jpg', fallback: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80' },
    { title: 'Tostones perfectos', thumbnail: 'video-3.jpg', fallback: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80' },
  ];

  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container-custom px-4">
        {/* Título */}
        <h2 className="text-5xl md:text-7xl font-semibold text-center text-white mb-16">
          Aprende a cocinar
          <br />
          con sabor.
        </h2>

        {/* Grid de videos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => router.push('/recetas')}
              className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={`/images/videos/${video.thumbnail}`}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = video.fallback;
                }}
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-l-[20px] border-l-black border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                </div>
              </div>
              {/* Título */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-xl font-semibold text-white">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
