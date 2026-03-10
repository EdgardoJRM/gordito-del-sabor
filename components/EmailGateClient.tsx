'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, ChefHat, Share2 } from 'lucide-react';
import EmailGate from '@/components/EmailGate';
import FavoriteButton from '@/components/FavoriteButton';

interface EmailGateClientProps {
  recipe: {
    id: string;
    title: string;
    category: string;
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
    time: string;
    servings: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    notes?: string;
  };
}

export default function EmailGateClient({ recipe }: EmailGateClientProps) {
  const [isGateOpen, setIsGateOpen] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const handleEmailSubmit = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
    setIsGateOpen(false);
  };

  // Validar que recipe existe
  if (!recipe) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-1 text-amber-900 mb-4">Receta no encontrada</h1>
          <p className="text-gray-600">Lo sentimos, no pudimos cargar esta receta.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <EmailGate
        isOpen={isGateOpen}
        onSubmit={handleEmailSubmit}
        recipeName={recipe.title}
      />

      {!isGateOpen && (
        <>
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
                        <span className="text-amber-900 font-semibold">{recipe.category}</span>
                      </div>
                      <FavoriteButton
                        recipeId={recipe.id}
                        recipeTitle={recipe.title}
                        recipeCategory={recipe.category}
                        recipeDescription={recipe.description}
                      />
                    </div>
                    <h1 className="heading-1 text-amber-900 mb-4">{recipe.title}</h1>
                    <p className="text-xl text-gray-600 mb-6">
                      {recipe.description}
                    </p>

                    {/* User Info */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-amber-900">
                        <span className="font-semibold">Acceso confirmado para:</span> {userName} ({userEmail})
                      </p>
                    </div>

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
                    <h2 className="heading-3 text-amber-900 mb-6">Ingredientes</h2>
                    <div className="bg-amber-50 rounded-xl p-8">
                      <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <input type="checkbox" className="mt-1 w-5 h-5 text-amber-600 rounded" />
                            <span className="text-gray-700">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mb-12">
                    <h2 className="heading-3 text-amber-900 mb-6">Preparación</h2>
                    <div className="space-y-6">
                      {recipe.instructions.map((instruction, index) => (
                        <div key={index} className="flex gap-6">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-600 text-white font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <p className="text-gray-600">{instruction}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {recipe.notes && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-12">
                      <h3 className="font-semibold text-blue-900 mb-3">💡 Notas Especiales</h3>
                      <p className="text-blue-800">{recipe.notes}</p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  {/* Share */}
                  <div className="bg-amber-50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Compartir</h3>
                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                        <Share2 size={18} />
                        <span className="text-sm">Compartir</span>
                      </button>
                    </div>
                  </div>

                  {/* Related Recipes */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recetas Relacionadas</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Tostones', emoji: '🍌' },
                        { title: 'Arroz con Gandules', emoji: '🍚' },
                        { title: 'Alcapurrias', emoji: '🥟' },
                      ].map((recipe) => (
                        <Link
                          key={recipe.title}
                          href="#"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition"
                        >
                          <span className="text-2xl">{recipe.emoji}</span>
                          <span className="text-sm font-medium text-gray-700 hover:text-amber-600">
                            {recipe.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
