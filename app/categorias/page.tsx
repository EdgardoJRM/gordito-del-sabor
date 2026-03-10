import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Categorías | El Gordito del Sabor',
  description: 'Explora nuestras recetas organizadas por categoría.',
};

const categories = [
  {
    id: 'comida-criolla',
    name: 'Comida Criolla',
    emoji: '🍲',
    count: 25,
    description: 'Recetas tradicionales puertorriqueñas',
    recipes: ['Mofongo', 'Arroz con Gandules', 'Tostones', 'Pasteles'],
  },
  {
    id: 'carnes',
    name: 'Carnes',
    emoji: '🥩',
    count: 18,
    description: 'Preparaciones con carne de res, cerdo y pollo',
    recipes: ['Pernil Asado', 'Carne Guisada', 'Pollo Frito', 'Chuletas'],
  },
  {
    id: 'marisco',
    name: 'Marisco',
    emoji: '🦞',
    count: 15,
    description: 'Deliciosos platos con pescado y mariscos',
    recipes: ['Ceviche', 'Mofongo de Camarones', 'Pescado Frito', 'Langosta'],
  },
  {
    id: 'air-fryer',
    name: 'Air Fryer',
    emoji: '🍟',
    count: 12,
    description: 'Recetas saludables en freidora de aire',
    recipes: ['Tostones Air Fryer', 'Pollo Air Fryer', 'Papas Fritas', 'Alcapurrias'],
  },
  {
    id: 'gluten-free',
    name: 'Sin Gluten',
    emoji: '🌾',
    count: 10,
    description: 'Opciones deliciosas sin gluten',
    recipes: ['Mofongo Sin Gluten', 'Arroz con Pollo', 'Ensaladas', 'Postres'],
  },
  {
    id: 'postres',
    name: 'Postres',
    emoji: '🍰',
    count: 20,
    description: 'Dulces y postres irresistibles',
    recipes: ['Flan', 'Tembleque', 'Arroz con Leche', 'Buñuelos'],
  },
];

export default async function CategoriesPage() {
  // Categorías completamente públicas para SEO
  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-black border-b border-gray-900 py-8">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#A1A1A6] hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-white mb-6">Categorías de Recetas</h1>
          <p className="body-text text-xl max-w-3xl">
            Explora nuestras recetas organizadas por tipo
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categorias/${category.id}`}
                className="group"
              >
                <div className="bg-[#1C1C1E] border border-gray-900 rounded-3xl p-8 hover:border-gray-800 transition-all hover:scale-105 h-full flex flex-col">
                  <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {category.name}
                  </h3>
                  <p className="body-text text-sm mb-6 flex-grow">
                    {category.description}
                  </p>
                  <div className="mb-6">
                    <div className="inline-block px-4 py-2 bg-gray-900 text-[#A1A1A6] rounded-full text-sm font-bold">
                      {category.count} recetas
                    </div>
                  </div>
                  <div className="border-t border-gray-900 pt-6">
                    <p className="text-xs text-[#6E6E73] mb-3 uppercase tracking-wide font-bold">Recetas populares:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.recipes.map((recipe) => (
                        <span
                          key={recipe}
                          className="text-xs bg-black border border-gray-900 text-[#A1A1A6] px-3 py-1 rounded-full"
                        >
                          {recipe}
                        </span>
                      ))}
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
