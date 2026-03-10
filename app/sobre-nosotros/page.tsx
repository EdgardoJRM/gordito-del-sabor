import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | El Gordito del Sabor',
  description: 'Conoce la historia de Ariel Leonardo Del Valle Matos y su pasión por la cocina puertorriqueña.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="heading-1 text-amber-900 mb-4">Sobre Nosotros</h1>
          <p className="subheading text-gray-600">
            Conoce la historia de Ariel Leonardo Del Valle Matos y su pasión por la gastronomía latina
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="heading-2 text-amber-900 mb-6">¡Bienvenidos a El Gordito del Sabor!</h2>
              <p className="text-gray-700 text-lg mb-4">
                Soy <span className="font-bold text-amber-900">Ariel Leonardo Del Valle Matos</span>, amante apasionado de la cocina y orgulloso representante de la gastronomía latina, especialmente de la deliciosa cocina boricua de mi Puerto Rico querido.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                En "El Gordito del Sabor", comparto mi amor por la cocina a través de recetas auténticas y llenas de sabores vibrantes. Mi misión es llevar a tu hogar el deleite de la comida latina, haciendo que cada platillo sea una experiencia inolvidable para ti y tus seres queridos.
              </p>
              <p className="text-gray-700 text-lg">
                Desde mi fogón hasta tu pantalla, te invito a explorar el mundo de la gastronomía conmigo. Aquí encontrarás recetas detalladas, vídeos cautivadores y la pasión que pongo en cada plato.
              </p>
            </div>
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/ariel.webp"
                alt="Ariel Leonardo Del Valle Matos - El Gordito del Sabor"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12 mb-16">
            <h2 className="heading-2 text-amber-900 mb-6 text-center">Mi Misión</h2>
            <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-6">
              Desde los sabores reconfortantes de la comida boricua hasta los secretos culinarios de diversas nacionalidades, cada publicación está destinada a despertar tu paladar y avivar tu amor por la cocina.
            </p>
            <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto">
              Únete a nuestra comunidad culinaria, donde compartiré no solo recetas, sino también historias detrás de cada plato, consejos prácticos y momentos divertidos en la cocina. ¡Estoy aquí para inspirarte y hacerte sentir como un chef en tu propio hogar!
            </p>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="heading-2 text-amber-900 mb-12 text-center">Lo que nos Define</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Autenticidad',
                  description: 'Recetas auténticas que honran la tradición culinaria puertorriqueña y latina.',
                  emoji: '🎯',
                },
                {
                  title: 'Pasión',
                  description: 'Cada plato es preparado con amor y dedicación para ofrecerte lo mejor.',
                  emoji: '❤️',
                },
                {
                  title: 'Comunidad',
                  description: 'Creemos en compartir conocimiento y crear una familia de amantes de la cocina.',
                  emoji: '👨‍👩‍👧‍👦',
                },
              ].map((value) => (
                <div key={value.title} className="bg-white border-2 border-amber-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{value.emoji}</div>
                  <h3 className="font-playfair text-2xl font-bold text-amber-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About the Chef */}
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-12 mb-16">
            <h2 className="heading-2 text-amber-900 mb-8 text-center">Sobre Ariel Leonardo Del Valle Matos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 text-lg mb-4">
                  Con más de 10 años de experiencia en la cocina, Ariel ha dedicado su vida a perfeccionar el arte culinario puertorriqueño. Su pasión por la gastronomía latina lo ha llevado a explorar y dominar técnicas tradicionales y modernas.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                  Ariel cree que la comida es más que nutrición; es una forma de conectar con nuestra cultura, compartir momentos especiales con nuestras familias y crear recuerdos inolvidables alrededor de la mesa.
                </p>
                <p className="text-gray-700 text-lg">
                  Su objetivo es hacer que la cocina puertorriqueña sea accesible para todos, desde principiantes hasta chefs experimentados, compartiendo no solo recetas, sino también la historia y el amor detrás de cada plato.
                </p>
              </div>
              <div className="relative w-full h-80 rounded-xl overflow-hidden">
                <Image
                  src="/images/ariel.webp"
                  alt="Ariel Leonardo Del Valle Matos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="heading-2 text-amber-900 mb-12 text-center">¿Qué Encontrarás Aquí?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Recetas Detalladas',
                  description: 'Paso a paso claro y fácil de seguir para que cualquiera pueda preparar deliciosos platillos.',
                  icon: '📖',
                },
                {
                  title: 'Historias Culinarias',
                  description: 'Conoce la historia y tradición detrás de cada receta que compartimos.',
                  icon: '📚',
                },
                {
                  title: 'Consejos Prácticos',
                  description: 'Trucos y técnicas para mejorar tus habilidades culinarias en la cocina.',
                  icon: '💡',
                },
                {
                  title: 'Comunidad Activa',
                  description: 'Únete a una comunidad de amantes de la cocina que comparten tu pasión.',
                  icon: '👥',
                },
              ].map((item) => (
                <div key={item.title} className="bg-amber-50 rounded-xl p-8">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-playfair text-xl font-bold text-amber-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 rounded-2xl p-12 text-center text-white">
            <h2 className="heading-2 text-white mb-4">¡Prepárate para Explorar, Cocinar y Disfrutar!</h2>
            <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
              Gracias por ser parte de esta deliciosa aventura. Estoy aquí para inspirarte y hacerte sentir como un chef en tu propio hogar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recetas" className="btn-primary inline-block">
                Explorar Recetas
              </Link>
              <Link href="/tienda" className="bg-white text-amber-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-50 transition-all inline-block">
                Visitar Tienda
              </Link>
            </div>
            <p className="text-amber-100 text-sm mt-8">
              Con sabor y cariño, <span className="font-bold">Ariel Leonardo Del Valle Matos</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
