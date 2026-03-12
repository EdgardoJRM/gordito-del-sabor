'use client';

import { ShoppingCart, Check } from 'lucide-react';

export default function AmazonSection() {
  return (
    <section className="section-spacing bg-black border-t border-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className="heading-section text-white">
              Cocina como
              <br />
              el Gordito
            </h2>
            <p className="body-text text-xl md:text-2xl max-w-xl">
              Descubre los utensilios y herramientas que usa el Gordito en su cocina. Todos disponibles en Amazon.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#FF9900] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Productos personalmente seleccionados</p>
              </div>
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#FF9900] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Envío rápido con Amazon Prime</p>
              </div>
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#FF9900] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Mejores precios garantizados</p>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="https://www.amazon.com/shop/el.gordito.del.sabor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#FF9900]/90 text-black py-4 px-12 rounded-full transition-all transform hover:scale-105 font-bold"
              >
                <ShoppingCart size={20} />
                Ir a la Tienda
              </a>
            </div>
          </div>

          {/* Visual Block */}
          <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden bg-[#1C1C1E] border border-gray-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/10" />
            <div className="relative z-10 text-center px-8">
              <p className="text-sm tracking-[0.3em] uppercase text-[#A1A1A6] mb-4">
                Tienda Oficial
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Utensilios
                <br />
                de Calidad
              </h3>
              <p className="body-text text-sm md:text-base max-w-md mx-auto mb-6">
                Sartenes, cuchillos, ollas y herramientas profesionales para tu cocina.
              </p>
              <p className="text-xs text-[#6E6E73]">
                Todos los productos están verificados y recomendados por el Gordito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
