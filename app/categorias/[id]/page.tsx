import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Categoría | El Gordito del Sabor',
  description: 'Explora recetas de esta categoría.',
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
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="bg-[#FAF8F5] border-b border-[#E8E0D8] py-12">
        <div className="container-custom">
          <Link href="/categorias" className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-6 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver a categorías</span>
          </Link>
          <h1 className="heading-section text-[#1A1412] mb-4 text-4xl md:text-5xl">Comida Criolla</h1>
          <p className="body-text text-xl max-w-2xl">
            Recetas tradicionales puertorriqueñas que honran nuestras raíces
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recetas/${recipe.id}`}
                className="group"
              >
                <div className="bg-[#FAF8F5] border border-[#E8E0D8] rounded-2xl overflow-hidden h-full flex flex-col transition-all hover:border-[#C4472B]/30 hover:shadow-md">
                  <div className="relative h-48 bg-gradient-to-br from-[#F2EDE6] via-[#FAF8F5] to-[#E8E0D8] flex items-center justify-center border-b border-[#E8E0D8] group-hover:from-[#E8E0D8] group-hover:to-[#F2EDE6] transition-colors">
                    <span className="text-5xl" aria-hidden>
                      {recipe.emoji}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#1A1412] mb-2 group-hover:text-[#C4472B] transition">
                      {recipe.title}
                    </h3>

                    <p className="body-text text-sm mb-4 flex-grow">
                      {recipe.description}
                    </p>

                    <div className="flex gap-4 text-sm text-[#6B5B4E] border-t border-[#E8E0D8] pt-4">
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
