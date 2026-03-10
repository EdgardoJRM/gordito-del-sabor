import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

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
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-1 text-amber-900 mb-4">Acceso Requerido</h1>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver las categorías</p>
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

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="heading-1 text-amber-900 mb-4">Categorías de Recetas</h1>
          <p className="subheading text-gray-600">
            Explora nuestras recetas organizadas por tipo
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categorias/${category.id}`}
                className="group"
              >
                <div className="card-hover bg-white border-2 border-amber-100 rounded-2xl p-8 hover:border-amber-400 h-full flex flex-col">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-amber-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {category.description}
                  </p>
                  <div className="mb-4">
                    <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                      {category.count} recetas
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500 mb-2">Recetas populares:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.recipes.map((recipe) => (
                        <span
                          key={recipe}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
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
