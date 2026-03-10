'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function HeroPremium() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  // Total frames available
  const TOTAL_FRAMES = 240;

  useEffect(() => {
    const handleScroll = () => {
      // Calcular el progreso basado en el scroll dentro del hero (primeros 800vh)
      const heroHeight = window.innerHeight * 8; // 800vh
      const scrolled = window.scrollY;
      
      // Solo calcular progreso mientras estamos en el hero
      if (scrolled < heroHeight) {
        const progress = Math.min((scrolled / heroHeight) * 100, 100);
        setScrollProgress(progress);
        const frameIndex = Math.floor((progress / 100) * (TOTAL_FRAMES - 1));
        setCurrentFrame(frameIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get frame number with leading zeros
  const getFrameNumber = (index: number) => {
    return String(index + 1).padStart(3, '0');
  };

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30">
        <div className="container-custom py-4 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-lg md:text-xl font-bold text-white truncate">
            El Gordito del Sabor
          </Link>

          {/* Center Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/tienda" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Delantales
            </Link>
            <Link href="/recetas" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Recetas
            </Link>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Comunidad
            </a>
          </div>

          {/* CTA Button - Desktop */}
          <button
            onClick={() => router.push('/tienda')}
            className="hidden md:block border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all text-sm font-medium"
          >
            Diseña tu delantal
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="container-custom py-4 flex flex-col gap-4">
              <Link 
                href="/tienda" 
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Delantales
              </Link>
              <Link 
                href="/recetas" 
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recetas
              </Link>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Comunidad
              </a>
              <button
                onClick={() => {
                  router.push('/tienda');
                  setMobileMenuOpen(false);
                }}
                className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all text-sm font-medium w-full"
              >
                Diseña tu delantal
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Animation Section - SOLO ANIMACION */}
      <section ref={containerRef} className="relative w-full h-[800vh] bg-black">
        {/* Fixed Background Animation Container - Solo durante el hero */}
        <div 
          className="fixed top-0 left-0 h-screen w-full z-10"
          style={{
            opacity: scrollProgress < 90 ? 1 : 0,
            pointerEvents: scrollProgress < 90 ? 'auto' : 'none',
            transition: 'opacity 0.5s ease-out',
          }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-amber-950/20 opacity-60" />

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-48 h-48 md:w-96 md:h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-48 h-48 md:w-96 md:h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" />
          </div>

          {/* Background Animation - Fondo Pantalla Completa */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            {/* Lighting Effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Rim Light */}
              <div className="absolute w-full h-full bg-gradient-to-r from-amber-500/20 to-transparent rounded-full blur-3xl" />
            </div>

            {/* Animated Product Image - Background - Pantalla Completa */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={`/images/hero/ezgif-frame-${getFrameNumber(currentFrame)}.png`}
                alt="Delantal animado"
                width={1200}
                height={1400}
                priority
                quality={85}
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

          {/* Hero Content - Centered Text */}
          <div 
            className="absolute inset-0 flex items-center justify-center z-20 pt-16 md:pt-0"
            style={{
              opacity: Math.max(0, 1 - scrollProgress / 30), // Desaparece en los primeros 30% del scroll
              pointerEvents: scrollProgress > 30 ? 'none' : 'auto',
            }}
          >
            <div className="container-custom w-full px-4 md:px-0">
              {/* Centered Text Content */}
              <div className="text-white space-y-6 md:space-y-8 max-w-3xl mx-auto text-center">
                {/* Headline */}
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 md:mb-6">
                    El Gordito
                    <br />
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      del Sabor
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed px-2 md:px-0">
                  Delantales diseñados para los que cocinan con respeto. Personaliza el tuyo y cocina con estilo.
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => router.push('/tienda')}
                  className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 md:py-5 px-8 md:px-12 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-lg"
                >
                  Diseñar mi delantal
                </button>

                {/* Features */}
                <div className="flex flex-col sm:flex-row gap-6 md:gap-12 pt-8 md:pt-12 border-t border-gray-800 justify-center">
                  <div>
                    <p className="text-amber-400 font-bold text-xl md:text-2xl">100%</p>
                    <p className="text-gray-400 text-sm md:text-lg">Personalizable</p>
                  </div>
                  <div>
                    <p className="text-amber-400 font-bold text-xl md:text-2xl">Premium</p>
                    <p className="text-gray-400 text-sm md:text-lg">Calidad</p>
                  </div>
                  <div>
                    <p className="text-amber-400 font-bold text-xl md:text-2xl">Rápido</p>
                    <p className="text-gray-400 text-sm md:text-lg">Envío</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 flex flex-col items-center gap-4 z-30">
            <div className="flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all ${
                    scrollProgress > i * 33 ? 'bg-amber-500 h-2' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <ChevronDown className="text-gray-600 animate-bounce" size={20} />
          </div>
        </div>
      </section>
    </>
  );
}
