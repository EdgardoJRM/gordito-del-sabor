'use client';

import { ShoppingCart, Star } from 'lucide-react';

export default function AmazonSection() {
  const products = [
    {
      name: 'Sartén de Hierro Fundido',
      description: 'Perfecta para cocinar como el Gordito',
      price: '$45.99',
      rating: 4.8,
      reviews: 2500,
      image: '🍳',
    },
    {
      name: 'Juego de Cuchillos Premium',
      description: 'Cuchillos profesionales para tu cocina',
      price: '$89.99',
      rating: 4.9,
      reviews: 1800,
      image: '🔪',
    },
    {
      name: 'Tabla de Corte de Madera',
      description: 'Tabla de corte resistente y duradera',
      price: '$34.99',
      rating: 4.7,
      reviews: 1200,
      image: '🪵',
    },
    {
      name: 'Olla de Presión Rápida',
      description: 'Cocina más rápido, sabor igual',
      price: '$79.99',
      rating: 4.8,
      reviews: 3100,
      image: '🍲',
    },
  ];

  return (
    <section className="section-spacing bg-black border-t border-gray-900">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block">
            <span className="inline-block px-4 py-2 bg-[#FF9900]/20 text-[#FF9900] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
              🛒 Tienda del Gordito
            </span>
          </div>
          <h2 className="heading-section text-white">
            Cocina como el Gordito
          </h2>
          <p className="body-text text-xl md:text-2xl max-w-3xl mx-auto text-[#A1A1A6]">
            Los utensilios y herramientas que usa el Gordito en su cocina. Compra en Amazon con nuestros links afiliados.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#FF9900]/50 hover:bg-white/10 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="text-6xl mb-4 text-center">{product.image}</div>

              {/* Product Name */}
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#FF9900] transition-colors">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-[#A1A1A6] text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-[#FF9900] text-[#FF9900]' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#6E6E73]">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-[#FF9900] font-bold text-xl">{product.price}</p>
              </div>

              {/* CTA Button */}
              <a
                href={`https://amazon.com/s?k=${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105"
              >
                <ShoppingCart size={18} />
                Ver en Amazon
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-[#A1A1A6] mb-6">
            ¿No encuentras lo que buscas? Explora más productos en Amazon
          </p>
          <a
            href="https://amazon.com/s?k=cocina+profesional"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105"
          >
            <ShoppingCart size={20} />
            Explorar más en Amazon
          </a>
        </div>
      </div>
    </section>
  );
}
