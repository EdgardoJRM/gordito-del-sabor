'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const RECIPES = [
  {
    name: 'Arroz con Pollo',
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
  },
  {
    name: 'Pernil',
    image:
      'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80',
  },
  {
    name: 'Camarones',
    image:
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80',
  },
  {
    name: 'Mofongo',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  },
  {
    name: 'Pollo Guisado',
    image:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
  },
  {
    name: 'Bistec Encebollado',
    image:
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
  },
];

export default function RecipesGrid() {
  const router = useRouter();

  return (
    <section className="section-spacing bg-[#FAF8F5]">
      <div className="container-custom">
        <h2 className="heading-section text-center text-[#1A1412] mb-20">
          Recetas que saben
          <br />
          a casa.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECIPES.map((recipe, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => router.push('/recetas')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') router.push('/recetas');
              }}
              className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group shadow-md"
            >
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/90 via-[#1A1412]/25 to-transparent flex items-end p-6 pointer-events-none">
                <h3 className="text-2xl font-bold text-[#FAF8F5]">{recipe.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
