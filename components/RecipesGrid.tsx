'use client';

import { useRouter } from 'next/navigation';

export default function RecipesGrid() {
  const router = useRouter();

  const recipes = [
    { name: 'Arroz con Pollo', image: 'arroz-pollo.jpg', fallback: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80' },
    { name: 'Pernil', image: 'pernil.jpg', fallback: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80' },
    { name: 'Camarones', image: 'camarones.jpg', fallback: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80' },
    { name: 'Mofongo', image: 'mofongo.jpg', fallback: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
    { name: 'Pollo Guisado', image: 'pollo-guisado.jpg', fallback: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80' },
    { name: 'Bistec Encebollado', image: 'bistec.jpg', fallback: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80' },
  ];

  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container-custom px-4">
        {/* Título */}
        <h2 className="text-5xl md:text-7xl font-semibold text-center text-white mb-16">
          Recetas que saben
          <br />
          a casa.
        </h2>

        {/* Grid 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              onClick={() => router.push('/recetas')}
              className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={`/images/recipes/${recipe.image}`}
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = recipe.fallback;
                }}
              />
              {/* Overlay con nombre */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-semibold text-white">{recipe.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
