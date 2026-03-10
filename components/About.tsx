import { Award, Users, Heart, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-950">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="heading-2 font-montserrat text-white mb-6 text-5xl font-bold">
              Sobre
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Ariel Leonardo
              </span>
            </h2>

            <p className="font-lora text-gray-300 text-lg mb-6 leading-relaxed">
              Soy <span className="font-bold text-amber-400">Ariel Leonardo Del Valle Matos</span>, amante apasionado de la cocina y orgulloso representante de la gastronomía latina. Con más de 10 años de experiencia, he dedicado mi vida a perfeccionar recetas auténticas puertorriqueñas.
            </p>

            <p className="font-lora text-gray-400 text-lg mb-8 leading-relaxed">
              Mi misión es llevar a tu hogar el deleite de la comida latina, haciendo que cada platillo sea una experiencia inolvidable. Creo que la comida es más que nutrición, es una forma de conectar con nuestra cultura y compartir momentos especiales con nuestras familias.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-600/20 border border-amber-600/30">
                    <Award className="text-amber-400" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-white">Recetas Auténticas</h3>
                  <p className="font-lora text-gray-400 text-sm">Tradición puertorriqueña</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-600/20 border border-amber-600/30">
                    <Users className="text-amber-400" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-white">Comunidad</h3>
                  <p className="font-lora text-gray-400 text-sm">Únete a nuestra familia</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-600/20 border border-amber-600/30">
                    <Heart className="text-amber-400" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-white">Con Pasión</h3>
                  <p className="font-lora text-gray-400 text-sm">Hecho con amor</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-600/20 border border-amber-600/30">
                    <Zap className="text-amber-400" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-white">Inspiración</h3>
                  <p className="font-lora text-gray-400 text-sm">Sé un chef en casa</p>
                </div>
              </div>
            </div>

            <Link href="/sobre-nosotros" className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105">
              Conocer más sobre mí
              <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Image */}
          <div className="relative w-full h-96 lg:h-full">
            <Image
              src="/images/ariel.webp"
              alt="Ariel Leonardo Del Valle Matos - El Gordito del Sabor"
              fill
              className="object-cover rounded-3xl border border-gray-800"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
