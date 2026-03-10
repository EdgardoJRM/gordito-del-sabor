import type { Metadata } from 'next';
import { recipes } from '@/lib/recipes-data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';
import AuthGate from '@/components/AuthGate';

export const metadata: Metadata = {
  title: 'Receta | El Gordito del Sabor',
  description: 'Aprende a preparar esta deliciosa receta paso a paso.',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="heading-section text-white">Receta no encontrada</h1>
          <p className="body-text">Lo sentimos, no pudimos encontrar esta receta.</p>
          <Link href="/recetas" className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 px-10 rounded-full transition-all transform hover:scale-105">
            Ver todas las recetas
          </Link>
        </div>
      </main>
    );
  }

  // Si la receta es premium y no hay sesión, mostrar AuthGate
  if (recipe.isPremium && !session) {
    return <AuthGate />;
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-black border-b border-gray-900 py-8">
        <div className="container-custom">
          <Link href="/recetas" className="inline-flex items-center gap-2 text-[#A1A1A6] hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver a recetas</span>
          </Link>
        </div>
      </section>

      {/* Recipe Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title and Meta */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-block px-4 py-2 bg-gray-900 rounded-full">
                    <span className="text-[#A1A1A6] font-bold text-sm uppercase tracking-wide">{recipe.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {recipe.isPremium && (
                      <span className="bg-[#FF3B30] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                        <span>🔒</span> Exclusiva
                      </span>
                    )}
                    <FavoriteButton
                      recipeId={recipe.id}
                      recipeTitle={recipe.title}
                      recipeCategory={recipe.category}
                      recipeDescription={recipe.description}
                    />
                  </div>
                </div>
                <h1 className="heading-section text-white mb-6">
                  {recipe.title}
                </h1>
                <p className="body-text text-xl leading-relaxed">
                  {recipe.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-8 py-8 border-y border-gray-900 mt-8">
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#FF3B30]" size={24} />
                    <div>
                      <p className="text-sm text-[#6E6E73] mb-1">Tiempo</p>
                      <p className="font-bold text-white">{recipe.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-[#FF3B30]" size={24} />
                    <div>
                      <p className="text-sm text-[#6E6E73] mb-1">Porciones</p>
                      <p className="font-bold text-white">{recipe.servings}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ChefHat className="text-[#FF3B30]" size={24} />
                    <div>
                      <p className="text-sm text-[#6E6E73] mb-1">Dificultad</p>
                      <p className="font-bold text-white">{recipe.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mb-16 h-96 bg-gradient-to-br from-gray-900 to-black rounded-3xl flex items-center justify-center border border-gray-900">
                <span className="text-9xl">🍳</span>
              </div>

              {/* Ingredients */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-white mb-8">Ingredientes</h2>
                <div className="bg-[#1C1C1E] rounded-3xl p-8 border border-gray-900">
                  <ul className="space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <input type="checkbox" className="mt-1 w-5 h-5 text-[#FF3B30] bg-gray-800 border-gray-700 rounded focus:ring-[#FF3B30]" />
                        <span className="body-text">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-white mb-8">Preparación</h2>
                <div className="space-y-8">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#FF3B30] text-white font-bold text-lg">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow pt-2">
                        <p className="body-text">{instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {recipe.notes && (
                <div className="bg-[#1C1C1E] border-l-4 border-[#FF3B30] p-8 rounded-2xl mb-12">
                  <h3 className="font-bold text-white text-xl mb-4">💡 Notas Especiales</h3>
                  <p className="body-text">{recipe.notes}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#1C1C1E] rounded-3xl p-8 sticky top-24 border border-gray-900">
                <h3 className="text-2xl font-bold text-white mb-8">Información Rápida</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-[#6E6E73] font-bold mb-2 uppercase tracking-wide">Categoría</p>
                    <p className="text-white">{recipe.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#6E6E73] font-bold mb-2 uppercase tracking-wide">Dificultad</p>
                    <p className="text-white">{recipe.difficulty}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#6E6E73] font-bold mb-2 uppercase tracking-wide">Tiempo de Preparación</p>
                    <p className="text-white">{recipe.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#6E6E73] font-bold mb-2 uppercase tracking-wide">Porciones</p>
                    <p className="text-white">{recipe.servings}</p>
                  </div>
                </div>

                <button className="btn-text w-full mt-8 bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 rounded-full transition-all transform hover:scale-105">
                  Compartir Receta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
