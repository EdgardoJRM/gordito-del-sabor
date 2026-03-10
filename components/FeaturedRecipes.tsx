import Link from 'next/link';
import { Clock, Users, ChefHat } from 'lucide-react';
import { recipes } from '@/lib/recipes-data';

// Seleccionar las primeras 4 recetas como destacadas
const featuredRecipes = recipes.slice(0, 4);

export default function FeaturedRecipes() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-950">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="heading-2 font-montserrat text-white mb-4 text-5xl font-bold">
            Recetas
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Destacadas
            </span>
          </h2>
          <p className="font-lora subheading text-gray-400 max-w-2xl mx-auto text-lg">
            Descubre nuestras recetas más populares y aprende a prepararlas paso a paso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recetas/${recipe.id}`}
              className="group"
            >
              <div className="card-hover bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden h-full flex flex-col hover:border-amber-600 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-600/20">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-amber-900/30 to-orange-900/30 flex items-center justify-center group-hover:from-amber-800/40 group-hover:to-orange-800/40 transition-colors">
                  <span className="text-6xl">🍳</span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <span className="font-poppins inline-block px-3 py-1 bg-amber-600/20 text-amber-400 text-xs font-semibold rounded-full border border-amber-600/30">
                      {recipe.category}
                    </span>
                  </div>

                  <h3 className="font-montserrat text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition">
                    {recipe.title}
                  </h3>

                  <p className="font-lora text-gray-400 text-sm mb-4 flex-grow">
                    {recipe.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex gap-4 text-sm text-gray-500 border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-amber-500" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-amber-500" />
                      <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat size={16} className="text-amber-500" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/recetas"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 px-10 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Ver Todas las Recetas
          </Link>
        </div>
      </div>
    </section>
  );
}
