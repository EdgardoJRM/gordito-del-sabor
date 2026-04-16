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
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#E8E0D8] py-8">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-[#1A1412] mb-6">Categorías de Recetas</h1>
          <p className="body-text text-xl max-w-3xl">
            Explora nuestras recetas organizadas por tipo
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-spacing bg-[#F2EDE6]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categorias/${category.id}`}
                className="group"
              >
                <div className="bg-[#FAF8F5] border border-[#E8E0D8] rounded-3xl p-8 hover:border-[#C4472B]/30 transition-all hover:scale-[1.02] h-full flex flex-col shadow-sm">
                  <div className="text-7xl mb-6 group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <h3 className="text-3xl font-bold text-[#1A1412] mb-3">
                    {category.name}
                  </h3>
                  <p className="body-text text-sm mb-6 flex-grow">
                    {category.description}
                  </p>
                  <div className="mb-6">
                    <div className="inline-block px-4 py-2 bg-[#F2EDE6] text-[#6B5B4E] rounded-full text-sm font-bold border border-[#E8E0D8]">
                      {category.count} recetas
                    </div>
                  </div>
                  <div className="border-t border-[#E8E0D8] pt-6">
                    <p className="text-xs text-[#9C8B80] mb-3 uppercase tracking-wide font-bold">Recetas populares:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.recipes.map((recipe) => (
                        <span
                          key={recipe}
                          className="text-xs bg-white border border-[#E8E0D8] text-[#6B5B4E] px-3 py-1 rounded-full"
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
