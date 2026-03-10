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
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-black border-b border-gray-900 py-8">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#A1A1A6] hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-white mb-6">Sobre Nosotros</h1>
          <p className="body-text text-xl max-w-3xl">
            Conoce la historia de Ariel Leonardo Del Valle Matos y su pasión por la gastronomía latina
          </p>
        </div>
      </section>

      {/* Main Story */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">¡Bienvenidos a El Gordito del Sabor!</h2>
              <p className="body-text text-lg mb-6">
                Soy <span className="font-bold text-white">Ariel Leonardo Del Valle Matos</span>, amante apasionado de la cocina y orgulloso representante de la gastronomía latina, especialmente de la deliciosa cocina boricua de mi Puerto Rico querido.
              </p>
              <p className="body-text text-lg mb-6">
                En "El Gordito del Sabor", comparto mi amor por la cocina a través de recetas auténticas y llenas de sabores vibrantes. Mi misión es llevar a tu hogar el deleite de la comida latina, haciendo que cada platillo sea una experiencia inolvidable para ti y tus seres queridos.
              </p>
              <p className="body-text text-lg">
                Desde mi fogón hasta tu pantalla, te invito a explorar el mundo de la gastronomía conmigo. Aquí encontrarás recetas detalladas, vídeos cautivadores y la pasión que pongo en cada plato.
              </p>
            </div>
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden">
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
          <div className="bg-[#1C1C1E] rounded-3xl p-12 md:p-16 mb-32 border border-gray-900">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Mi Misión</h2>
            <p className="body-text text-lg text-center max-w-3xl mx-auto mb-6">
              Desde los sabores reconfortantes de la comida boricua hasta los secretos culinarios de diversas nacionalidades, cada publicación está destinada a despertar tu paladar y avivar tu amor por la cocina.
            </p>
            <p className="body-text text-lg text-center max-w-3xl mx-auto">
              Únete a nuestra comunidad culinaria, donde compartiré no solo recetas, sino también historias detrás de cada plato, consejos prácticos y momentos divertidos en la cocina. ¡Estoy aquí para inspirarte y hacerte sentir como un chef en tu propio hogar!
            </p>
          </div>

          {/* Values */}
          <div className="mb-32">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Lo que nos Define</h2>
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
                <div key={value.title} className="bg-[#1C1C1E] border border-gray-900 rounded-3xl p-8 text-center hover:border-gray-800 transition-all hover:scale-105">
                  <div className="text-6xl mb-6">{value.emoji}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="body-text">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About the Chef */}
          <div className="bg-[#1C1C1E] border border-gray-900 rounded-3xl p-12 md:p-16 mb-32">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Sobre Ariel Leonardo Del Valle Matos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="body-text text-lg mb-6">
                  Con más de 10 años de experiencia en la cocina, Ariel ha dedicado su vida a perfeccionar el arte culinario puertorriqueño. Su pasión por la gastronomía latina lo ha llevado a explorar y dominar técnicas tradicionales y modernas.
                </p>
                <p className="body-text text-lg mb-6">
                  Ariel cree que la comida es más que nutrición; es una forma de conectar con nuestra cultura, compartir momentos especiales con nuestras familias y crear recuerdos inolvidables alrededor de la mesa.
                </p>
                <p className="body-text text-lg">
                  Su objetivo es hacer que la cocina puertorriqueña sea accesible para todos, desde principiantes hasta chefs experimentados, compartiendo no solo recetas, sino también la historia y el amor detrás de cada plato.
                </p>
              </div>
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden">
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
          <div className="mb-32">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">¿Qué Encontrarás Aquí?</h2>
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
                <div key={item.title} className="bg-[#1C1C1E] border border-gray-900 rounded-3xl p-8 hover:border-gray-800 transition-all">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="body-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#1C1C1E] to-black border border-gray-900 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">¡Prepárate para Explorar, Cocinar y Disfrutar!</h2>
            <p className="body-text text-lg mb-12 max-w-2xl mx-auto">
              Gracias por ser parte de esta deliciosa aventura. Estoy aquí para inspirarte y hacerte sentir como un chef en tu propio hogar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/recetas" className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 px-12 rounded-full transition-all transform hover:scale-105">
                Explorar Recetas
              </Link>
              <Link href="/tienda" className="btn-text inline-block bg-white hover:bg-gray-200 text-black py-4 px-12 rounded-full transition-all transform hover:scale-105">
                Visitar Tienda
              </Link>
            </div>
            <p className="body-text text-sm">
              Con sabor y cariño, <span className="font-bold text-white">Ariel Leonardo Del Valle Matos</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
