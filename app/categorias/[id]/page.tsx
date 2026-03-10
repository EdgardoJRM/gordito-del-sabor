import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Comida Criolla | El Gordito del Sabor',
  description: 'Explora nuestras deliciosas recetas de comida criolla puertorriqueña.',
};

interface Recipe {
  id: string;
  title: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  time: string;
  servings: string;
  emoji: string;
  description: string;
}

const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Mofongo Tradicional',
    difficulty: 'Fácil',
    time: '20 min',
    servings: '4',
    emoji: '🍌',
    description: 'El clásico puertorriqueño con plátanos verdes, ajo y chicharrón.',
  },
  {
    id: '2',
    title: 'Arroz con Gandules',
    difficulty: 'Medio',
    time: '45 min',
    servings: '6',
    emoji: '🍚',
    description: 'Receta tradicional con gandules frescos y sofrito casero.',
  },
  {
    id: '3',
    title: 'Tostones',
    difficulty: 'Fácil',
    time: '15 min',
    servings: '4',
    emoji: '🍌',
    description: 'Plátanos verdes fritos crujientes, acompañamiento perfecto.',
  },
  {
    id: '4',
    title: 'Pasteles',
    difficulty: 'Difícil',
    time: '120 min',
    servings: '12',
    emoji: '🥟',
    description: 'Envueltos de plátano y yuca rellenos de carne molida.',
  },
];

export default function CategoryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="container-custom">
          <Link href="/categorias" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver a categorías
          </Link>
          <h1 className="heading-1 text-amber-900 mb-4">Comida Criolla</h1>
          <p className="subheading text-gray-600">
            Recetas tradicionales puertorriqueñas que honran nuestras raíces
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
                    <span className="text-6xl">{recipe.emoji}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
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
