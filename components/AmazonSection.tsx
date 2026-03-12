'use client';

import { ShoppingCart, Star } from 'lucide-react';

export default function AmazonSection() {
  const categories = [
    {
      name: 'Utensilios de Cocina',
      description: 'Sartenes, ollas y herramientas esenciales',
      icon: '🍳',
      link: 'https://www.amazon.com/shop/el.gordito.del.sabor',
    },
    {
      name: 'Electrodomésticos',
      description: 'Equipos modernos para tu cocina',
      icon: '⚡',
      link: 'https://www.amazon.com/shop/el.gordito.del.sabor',
    },
    {
      name: 'Cuchillos de Cocina',
      description: 'Cuchillos profesionales y de calidad',
      icon: '🔪',
      link: 'https://www.amazon.com/shop/el.gordito.del.sabor',
    },
    {
      name: 'Herramientas Especiales',
      description: 'Para pizza, cocción y más',
      icon: '🛠️',
      link: 'https://www.amazon.com/shop/el.gordito.del.sabor',
    },
  ];

  return (
    <section className="section-spacing bg-black border-t border-gray-900">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="inline-block px-4 py-2 bg-[#FF9900]/20 text-[#FF9900] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              🛒 Tienda Oficial del Gordito
            </span>
          </div>
          <h2 className="heading-section text-white">
            Cocina como el Gordito
          </h2>
          <p className="body-text text-xl md:text-2xl max-w-3xl mx-auto text-[#A1A1A6]">
            Descubre los utensilios y herramientas que usa el Gordito en su cocina. Todos disponibles en Amazon con nuestras recomendaciones personales.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 border border-white/10 rounded-xl p-8 hover:border-[#FF9900]/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              {/* Category Icon */}
              <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                {category.icon}
              </div>

              {/* Category Name */}
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#FF9900] transition-colors text-center">
                {category.name}
              </h3>

              {/* Description */}
              <p className="text-[#A1A1A6] text-sm mb-6 text-center">
                {category.description}
              </p>

              {/* CTA Button */}
              <div className="flex items-center justify-center gap-2 bg-[#FF9900] group-hover:bg-[#FF9900]/90 text-black font-bold py-3 px-4 rounded-lg transition-all transform group-hover:scale-105">
                <ShoppingCart size={18} />
                <span>Ver Productos</span>
              </div>
            </a>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-white font-bold mb-2">Productos Verificados</h3>
              <p className="text-[#A1A1A6] text-sm">
                Todos los productos están personalmente seleccionados por el Gordito
              </p>
            </div>

            {/* Column 2 */}
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-white font-bold mb-2">Envío Rápido</h3>
              <p className="text-[#A1A1A6] text-sm">
                Disfruta de envío rápido con Amazon Prime
              </p>
            </div>

            {/* Column 3 */}
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-white font-bold mb-2">Mejores Precios</h3>
              <p className="text-[#A1A1A6] text-sm">
                Encuentra las mejores ofertas en Amazon
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-[#A1A1A6] mb-6 text-lg">
            Visita la tienda oficial del Gordito en Amazon
          </p>
          <a
            href="https://www.amazon.com/shop/el.gordito.del.sabor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105"
          >
            <ShoppingCart size={20} />
            Ir a la Tienda del Gordito
          </a>
        </div>
      </div>
    </section>
  );
}
