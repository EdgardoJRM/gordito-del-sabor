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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-1 text-amber-900 mb-4">Acceso Requerido</h1>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver las recetas</p>
          <Link
            href="/auth/login"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
          >
            Iniciar Sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="heading-1 text-amber-900 mb-4">Todas las Recetas</h1>
          <p className="subheading text-gray-600">
            Explora nuestra colección completa de recetas auténticas puertorriqueñas
          </p>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recetas/${recipe.id}`}
                className="group"
              >
                <div className="card-hover bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                    <span className="text-6xl">🍳</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                        {recipe.category}
                      </span>
                    </div>

                    <h3 className="font-playfair text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-700 transition">
                      {recipe.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {recipe.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex gap-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
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
