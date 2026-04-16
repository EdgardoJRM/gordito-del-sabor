import type { Metadata } from 'next';
import { recipes } from '@/lib/recipes-data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import FavoriteButton from '@/components/recipe/FavoriteButton';
import AuthGate from '@/components/auth/AuthGate';
import RecipePromoBanner from '@/components/ebook/RecipePromoBanner';

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
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="heading-section text-[#1A1412]">Receta no encontrada</h1>
          <p className="body-text">Lo sentimos, no pudimos encontrar esta receta.</p>
          <Link href="/recetas" className="btn-text inline-block bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 px-10 rounded-full transition-all transform hover:scale-105">
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
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#E8E0D8] py-8">
        <div className="container-custom">
          <Link href="/recetas" className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver a recetas</span>
          </Link>
        </div>
      </section>

      {/* Recipe Content */}
      <section className="section-spacing bg-[#F2EDE6]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title and Meta */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-block px-4 py-2 bg-[#FAF8F5] rounded-full border border-[#E8E0D8]">
                    <span className="text-[#6B5B4E] font-bold text-sm uppercase tracking-wide">{recipe.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {recipe.isPremium && (
                      <span className="bg-[#C4472B] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
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
                <h1 className="heading-section text-[#1A1412] mb-6">
                  {recipe.title}
                </h1>
                <p className="body-text text-xl leading-relaxed">
                  {recipe.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-8 py-8 border-y border-[#E8E0D8] mt-8">
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#C4472B]" size={24} />
                    <div>
                      <p className="text-sm text-[#9C8B80] mb-1">Tiempo</p>
                      <p className="font-bold text-[#1A1412]">{recipe.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-[#C4472B]" size={24} />
                    <div>
                      <p className="text-sm text-[#9C8B80] mb-1">Porciones</p>
                      <p className="font-bold text-[#1A1412]">{recipe.servings}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ChefHat className="text-[#C4472B]" size={24} />
                    <div>
                      <p className="text-sm text-[#9C8B80] mb-1">Dificultad</p>
                      <p className="font-bold text-[#1A1412]">{recipe.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mb-16 h-96 bg-gradient-to-br from-[#F2EDE6] to-[#E8E0D8] rounded-3xl flex items-center justify-center border border-[#E8E0D8]">
                <span className="text-9xl">🍳</span>
              </div>

              {/* Ingredients */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-[#1A1412] mb-8">Ingredientes</h2>
                <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8E0D8] shadow-sm">
                  <ul className="space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <input type="checkbox" className="mt-1 w-5 h-5 text-[#C4472B] bg-white border-[#E8E0D8] rounded focus:ring-[#C4472B]" />
                        <span className="body-text">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-16">
                <h2 className="text-4xl font-bold text-[#1A1412] mb-8">Preparación</h2>
                <div className="space-y-8">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#C4472B] text-white font-bold text-lg">
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
                <div className="bg-[#FAF8F5] border border-[#E8E0D8] border-l-4 border-l-[#C4472B] p-8 rounded-2xl mb-12 shadow-sm">
                  <h3 className="font-bold text-[#1A1412] text-xl mb-4">💡 Notas Especiales</h3>
                  <p className="body-text">{recipe.notes}</p>
                </div>
              )}

              {/* Ebook Promotion Banner */}
              <RecipePromoBanner />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#FAF8F5] rounded-3xl p-8 sticky top-24 border border-[#E8E0D8] shadow-sm">
                <h3 className="text-2xl font-bold text-[#1A1412] mb-8">Información Rápida</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-[#9C8B80] font-bold mb-2 uppercase tracking-wide">Categoría</p>
                    <p className="text-[#1A1412]">{recipe.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#9C8B80] font-bold mb-2 uppercase tracking-wide">Dificultad</p>
                    <p className="text-[#1A1412]">{recipe.difficulty}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#9C8B80] font-bold mb-2 uppercase tracking-wide">Tiempo de Preparación</p>
                    <p className="text-[#1A1412]">{recipe.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#9C8B80] font-bold mb-2 uppercase tracking-wide">Porciones</p>
                    <p className="text-[#1A1412]">{recipe.servings}</p>
                  </div>
                </div>

                <button className="btn-text w-full mt-8 bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 rounded-full transition-all transform hover:scale-105">
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
