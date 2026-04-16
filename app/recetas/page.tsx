import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';
import { recipes } from '@/lib/recipes-data';

export const metadata: Metadata = {
  title: 'Todas las Recetas | El Gordito del Sabor',
  description: 'Explora nuestra colección completa de recetas puertorriqueñas auténticas.',
};

export default function RecipesPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <section className="section-spacing bg-[#FAF8F5] border-b border-[#E8E0D8]">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-[#1A1412] mb-6">Todas las Recetas</h1>
          <p className="body-text text-xl max-w-3xl">
            Explora nuestra colección completa de recetas auténticas puertorriqueñas
          </p>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="section-spacing bg-[#F2EDE6]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recetas/${recipe.id}`}
                className="group"
              >
                <div className="bg-[#FAF8F5] rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:scale-105 border border-[#E8E0D8] hover:border-[#C4472B]/30 shadow-sm relative">
                  {/* Premium Badge */}
                  {recipe.isPremium && (
                    <div className="absolute top-4 right-4 z-10 bg-[#C4472B] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                      <span>🔒</span> Exclusiva
                    </div>
                  )}

                  {/* Image placeholder */}
                  <div className="h-56 bg-gradient-to-br from-[#F2EDE6] to-[#E8E0D8] flex items-center justify-center group-hover:from-[#E8E0D8] group-hover:to-[#F2EDE6] transition-colors">
                    <span className="text-7xl">🍳</span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="inline-block px-3 py-1 bg-[#F2EDE6] text-[#6B5B4E] text-xs font-bold rounded-full uppercase tracking-wide border border-[#E8E0D8]">
                        {recipe.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#1A1412] mb-3 group-hover:text-[#C4472B] transition">
                      {recipe.title}
                    </h3>

                    <p className="body-text text-sm mb-6 flex-grow">
                      {recipe.description}
                    </p>

                    {/* Meta info */}
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
