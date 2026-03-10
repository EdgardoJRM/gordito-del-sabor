import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />

      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-amber-100 rounded-full">
              <span className="font-poppins text-amber-900 font-semibold text-sm">🍽️ Recetas Auténticas</span>
            </div>
            
            <h1 className="heading-1 font-playfair text-amber-900 mb-6 text-5xl font-bold">
              Sabor Puertorriqueño en Cada Plato
            </h1>
            
            <p className="font-lora subheading mb-8 text-gray-700 text-lg leading-relaxed">
              Descubre recetas auténticas puertorriqueñas, desde comida criolla tradicional hasta platos gourmet. Aprende a cocinar con pasión, sabor y las técnicas de El Gordito del Sabor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/recetas" className="btn-primary font-poppins font-bold inline-flex items-center justify-center gap-2">
                Explorar Recetas
                <ArrowRight size={20} />
              </Link>
              <Link href="/tienda" className="btn-secondary font-poppins font-bold inline-flex items-center justify-center gap-2">
                Tienda de Delantales
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-amber-200">
              <div>
                <p className="font-montserrat text-3xl font-bold text-amber-600">150+</p>
                <p className="font-poppins text-gray-600 text-sm font-medium">Recetas</p>
              </div>
              <div>
                <p className="font-montserrat text-3xl font-bold text-amber-600">50K+</p>
                <p className="font-poppins text-gray-600 text-sm font-medium">Seguidores</p>
              </div>
              <div>
                <p className="font-montserrat text-3xl font-bold text-amber-600">10+</p>
                <p className="font-poppins text-gray-600 text-sm font-medium">Años</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-96 lg:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🍲</div>
                <p className="text-2xl font-playfair text-amber-900">Comida con Corazón</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
