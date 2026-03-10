import type { Metadata } from 'next';
import { recipes } from '@/lib/recipes-data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';

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

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-1 text-amber-900 mb-4">Receta no encontrada</h1>
          <p className="text-gray-600">Lo sentimos, no pudimos encontrar esta receta.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="container-custom">
          <Link href="/recetas" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver a recetas
          </Link>
        </div>
      </section>

      {/* Recipe Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title and Meta */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-block px-4 py-2 bg-amber-100 rounded-full">
                    <span className="font-poppins text-amber-900 font-semibold">{recipe.category}</span>
                  </div>
                  <FavoriteButton
                    recipeId={recipe.id}
                    recipeTitle={recipe.title}
                    recipeCategory={recipe.category}
                    recipeDescription={recipe.description}
                  />
                </div>
                <h1 className="heading-1 font-playfair text-amber-900 mb-4 text-5xl font-bold">
                  {recipe.title}
                </h1>
                <p className="font-lora text-xl text-gray-600 mb-6 leading-relaxed">
                  {recipe.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 py-6 border-y border-gray-200">
                  <div className="flex items-center gap-2">
                    <Clock className="text-amber-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Tiempo</p>
                      <p className="font-semibold text-gray-900">{recipe.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-amber-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Porciones</p>
                      <p className="font-semibold text-gray-900">{recipe.servings}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="text-amber-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Dificultad</p>
                      <p className="font-semibold text-gray-900">{recipe.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mb-12 h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                <span className="text-9xl">🍳</span>
              </div>

              {/* Ingredients */}
              <div className="mb-12">
                <h2 className="heading-3 font-montserrat text-amber-900 mb-6 text-3xl font-bold">Ingredientes</h2>
                <div className="bg-amber-50 rounded-xl p-8">
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1 w-5 h-5 text-amber-600 rounded" />
                        <span className="font-lora text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-12">
                <h2 className="heading-3 font-montserrat text-amber-900 mb-6 text-3xl font-bold">Preparación</h2>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-600 text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="font-lora text-gray-600">{instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {recipe.notes && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-12">
                  <h3 className="font-poppins font-semibold text-blue-900 mb-3">💡 Notas Especiales</h3>
                  <p className="font-lora text-blue-800">{recipe.notes}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 sticky top-20">
                <h3 className="font-montserrat text-xl font-bold text-amber-900 mb-6">Información Rápida</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="font-poppins text-sm text-gray-600 font-medium mb-2">Categoría</p>
                    <p className="font-lora text-gray-900">{recipe.category}</p>
                  </div>
                  
                  <div>
                    <p className="font-poppins text-sm text-gray-600 font-medium mb-2">Dificultad</p>
                    <p className="font-lora text-gray-900">{recipe.difficulty}</p>
                  </div>
                  
                  <div>
                    <p className="font-poppins text-sm text-gray-600 font-medium mb-2">Tiempo de Preparación</p>
                    <p className="font-lora text-gray-900">{recipe.time}</p>
                  </div>
                  
                  <div>
                    <p className="font-poppins text-sm text-gray-600 font-medium mb-2">Porciones</p>
                    <p className="font-lora text-gray-900">{recipe.servings}</p>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all">
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
