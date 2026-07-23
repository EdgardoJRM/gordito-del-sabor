import type { Metadata } from 'next';
import Image from 'next/image';
import { recipes } from '@/lib/recipes-data';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import FavoriteButton from '@/components/recipe/FavoriteButton';
import ShareRecipeButton from '@/components/recipe/ShareRecipeButton';
import AuthGate from '@/components/auth/AuthGate';
import RecipePromoBanner from '@/components/ebook/RecipePromoBanner';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Receta | El Gordito del Sabor',
  description: 'Aprende a preparar esta receta paso a paso, con ingredientes claros.',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="heading-section-comfort text-[#1A1412]">Receta no encontrada</h1>
          <p className="body-text text-lg">No encontramos esta receta.</p>
          <Button href="/recetas" size="lg">
            Ver todas las recetas
          </Button>
        </div>
      </main>
    );
  }

  if (recipe.isPremium && !session) {
    return <AuthGate />;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="bg-[#F2EDE6] hairline-b py-6">
        <div className="container-custom">
          <Link
            href="/recetas"
            className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] transition-colors nav-text"
          >
            <ArrowLeft size={22} />
            Volver a recetas
          </Link>
        </div>
      </section>

      <section className="section-spacing-comfort bg-[#FAF8F5]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="mb-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="inline-block px-4 py-2 bg-[#F2EDE6] rounded-full border border-border-subtle text-[#6B5B4E] font-bold text-base">
                    {recipe.category}
                  </span>
                  <div className="flex items-center gap-3">
                    {recipe.isPremium && (
                      <span className="bg-[#C4472B] text-white px-4 py-1.5 rounded-full text-sm font-bold">
                        Exclusiva
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
                <h1 className="heading-section-comfort text-[#1A1412] mb-4">{recipe.title}</h1>
                <p className="body-text text-xl leading-relaxed">{recipe.description}</p>

                <div className="flex flex-wrap gap-8 py-8 border-y-2 border-[#E8E0D8] mt-8">
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#C4472B]" size={26} aria-hidden />
                    <div>
                      <p className="text-base text-[#6B5B4E] mb-0.5">Tiempo</p>
                      <p className="text-lg font-bold text-[#1A1412]">{recipe.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-[#C4472B]" size={26} aria-hidden />
                    <div>
                      <p className="text-base text-[#6B5B4E] mb-0.5">Porciones</p>
                      <p className="text-lg font-bold text-[#1A1412]">{recipe.servings}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ChefHat className="text-[#C4472B]" size={26} aria-hidden />
                    <div>
                      <p className="text-base text-[#6B5B4E] mb-0.5">Dificultad</p>
                      <p className="text-lg font-bold text-[#1A1412]">{recipe.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mb-12 h-72 md:h-96 rounded-lg overflow-hidden border border-border-subtle bg-[#F2EDE6]">
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                    unoptimized={recipe.image.startsWith('http')}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-[#C4472B]/50">
                      El Gordito del Sabor
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#1A1412] mb-6">Ingredientes</h2>
                <div className="bg-white rounded-lg p-6 md:p-8 border border-border-subtle">
                  <ul className="space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          className="mt-1.5 w-6 h-6 text-[#C4472B] border border-border-subtle rounded focus:ring-[#C4472B]"
                          aria-label={`Marcar: ${ingredient}`}
                        />
                        <span className="body-text text-lg">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-[#1A1412] mb-6">Preparación</h2>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-5">
                      <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#C4472B] text-white font-bold text-xl">
                        {index + 1}
                      </div>
                      <p className="body-text text-lg pt-2">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {recipe.notes && (
                <div className="bg-[#FFF8F5] border border-border-subtle border-l-4 border-l-[#C4472B] p-6 md:p-8 rounded-lg mb-10">
                  <h3 className="font-bold text-[#1A1412] text-xl mb-3">Notas del Gordito</h3>
                  <p className="body-text text-lg">{recipe.notes}</p>
                </div>
              )}

              <RecipePromoBanner />
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="bg-white rounded-lg p-6 md:p-8 border border-border-subtle">
                  <h3 className="text-xl font-bold text-[#1A1412] mb-6">Resumen</h3>
                  <dl className="space-y-5 text-lg">
                    <div>
                      <dt className="text-[#6B5B4E] mb-1">Categoría</dt>
                      <dd className="font-bold text-[#1A1412]">{recipe.category}</dd>
                    </div>
                    <div>
                      <dt className="text-[#6B5B4E] mb-1">Dificultad</dt>
                      <dd className="font-bold text-[#1A1412]">{recipe.difficulty}</dd>
                    </div>
                    <div>
                      <dt className="text-[#6B5B4E] mb-1">Tiempo</dt>
                      <dd className="font-bold text-[#1A1412]">{recipe.time}</dd>
                    </div>
                    <div>
                      <dt className="text-[#6B5B4E] mb-1">Porciones</dt>
                      <dd className="font-bold text-[#1A1412]">{recipe.servings}</dd>
                    </div>
                  </dl>
                  <div className="mt-8">
                    <ShareRecipeButton title={recipe.title} recipePath={`/recetas/${recipe.id}`} />
                  </div>
                </div>

                <div className="bg-[#1A1412] rounded-lg p-6 md:p-8 text-center">
                  <h3 className="text-xl font-bold text-[#FAF8F5] mb-3">Delantal El Gordito</h3>
                  <p className="text-[#C4B8AE] text-lg mb-6 leading-relaxed">
                    Bordado personalizado — edición limitada.
                  </p>
                  <Button href="/delantal-el-gordito" size="lg" className="w-full">
                    Ver Delantal El Gordito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
