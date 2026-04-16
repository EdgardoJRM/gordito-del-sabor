'use client';

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
        {/* Título */}
        <h2 className="heading-section text-center text-[#1A1412] mb-20">
          Recetas que saben
          <br />
          a casa.
        </h2>

        {/* Grid 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECIPES.map((recipe, index) => (
            <div
              key={index}
              onClick={() => router.push('/recetas')}
              className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group shadow-md"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay con nombre */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/90 via-[#1A1412]/25 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-[#FAF8F5]">{recipe.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
