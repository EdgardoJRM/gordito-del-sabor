import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  emoji: string;
  count: number;
  description: string;
}

const categories: Category[] = [
  {
    id: 'comida-criolla',
    name: 'Comida Criolla',
    emoji: '🍲',
    count: 25,
    description: 'Recetas tradicionales puertorriqueñas',
  },
  {
    id: 'carnes',
    name: 'Carnes',
    emoji: '🥩',
    count: 18,
    description: 'Preparaciones con carne de res, cerdo y pollo',
  },
  {
    id: 'marisco',
    name: 'Marisco',
    emoji: '🦞',
    count: 15,
    description: 'Deliciosos platos con pescado y mariscos',
  },
  {
    id: 'air-fryer',
    name: 'Air Fryer',
    emoji: '🍟',
    count: 12,
    description: 'Recetas saludables en freidora de aire',
  },
  {
    id: 'gluten-free',
    name: 'Sin Gluten',
    emoji: '🌾',
    count: 10,
    description: 'Opciones deliciosas sin gluten',
  },
  {
    id: 'postres',
    name: 'Postres',
    emoji: '🍰',
    count: 20,
    description: 'Dulces y postres irresistibles',
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-black">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="heading-2 font-montserrat text-white mb-4 text-5xl font-bold">
            Explora por
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Categorías
            </span>
          </h2>
          <p className="font-lora subheading text-gray-400 max-w-2xl mx-auto text-lg">
            Encuentra recetas según tus preferencias y necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categorias/${category.id}`}
              className="group"
            >
              <div className="card-hover bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-amber-600 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-600/20 h-full">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.emoji}
                </div>
                <h3 className="font-montserrat text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition">
                  {category.name}
                </h3>
                <p className="font-lora text-gray-400 text-sm mb-4">
                  {category.description}
                </p>
                <div className="inline-block px-4 py-2 bg-amber-600/20 text-amber-400 rounded-full text-sm font-semibold border border-amber-600/30">
                  {category.count} recetas
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
