import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';
import { recipes } from '@/lib/recipes-data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Todas las Recetas | El Gordito del Sabor',
  description: 'Explora nuestra colección completa de recetas puertorriqueñas auténticas.',
};

export default async function RecipesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="heading-section text-white">Acceso Requerido</h1>
          <p className="body-text text-xl">Debes iniciar sesión para ver las recetas</p>
          <Link
            href="/auth/login"
            className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 px-10 rounded-full transition-all transform hover:scale-105"
          >
            Iniciar Sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="section-spacing bg-black border-b border-gray-900">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#A1A1A6] hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-white mb-6">Todas las Recetas</h1>
          <p className="body-text text-xl max-w-3xl">
            Explora nuestra colección completa de recetas auténticas puertorriqueñas
          </p>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recetas/${recipe.id}`}
                className="group"
              >
                <div className="bg-[#1C1C1E] rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:scale-105 border border-gray-900 hover:border-gray-800">
                  {/* Image placeholder */}
                  <div className="h-56 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center group-hover:from-gray-800 group-hover:to-gray-900 transition-colors">
                    <span className="text-7xl">🍳</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-900 text-[#A1A1A6] text-xs font-bold rounded-full uppercase tracking-wide">
                        {recipe.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF3B30] transition">
                      {recipe.title}
                    </h3>

                    <p className="body-text text-sm mb-6 flex-grow">
                      {recipe.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex gap-4 text-sm text-[#6E6E73] border-t border-gray-900 pt-4">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{recipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat size={16} />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
