'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function HeroPremium() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationFrameRef = useRef<number>();

  // Total frames available
  const TOTAL_FRAMES = 240;

  // Preload all images on mount with progress tracking
  useEffect(() => {
    const loadImages = async () => {
      const loadedImagesArray: HTMLImageElement[] = [];
      let loadedCount = 0;
      
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const frameNumber = String(i + 1).padStart(3, '0');
        
        try {
          const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => {
              // Fallback to PNG if WebP fails
              const fallbackImg = new Image();
              fallbackImg.onload = () => resolve(fallbackImg);
              fallbackImg.onerror = reject;
              fallbackImg.src = `/images/hero/ezgif-frame-${frameNumber}.png`;
            };
            image.src = `/images/hero/webp/ezgif-frame-${frameNumber}.webp`;
          });
          
          loadedImagesArray.push(img);
          loadedCount++;
          
          // Update progress
          const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          setLoadingProgress(progress);
          
        } catch (error) {
          console.error(`Error loading frame ${frameNumber}:`, error);
        }
      }

      imagesRef.current = loadedImagesArray;
      setImagesLoaded(true);
      
      // Small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      // Draw first frame
      if (canvasRef.current && loadedImagesArray[0]) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw image centered and scaled
          const scale = Math.max(canvas.width / loadedImagesArray[0].width, canvas.height / loadedImagesArray[0].height);
          const x = (canvas.width / 2) - (loadedImagesArray[0].width / 2) * scale;
          const y = (canvas.height / 2) - (loadedImagesArray[0].height / 2) * scale;
          
          ctx.drawImage(loadedImagesArray[0], x, y, loadedImagesArray[0].width * scale, loadedImagesArray[0].height * scale);
        }
      }
    };

    loadImages();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Block scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Draw frame on canvas
  const drawFrame = (frameIndex: number) => {
    if (!canvasRef.current || !imagesRef.current[frameIndex]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    
    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image centered and scaled to cover
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Handle window resize
  useEffect(() => {
    if (isMobile || !imagesLoaded) return;

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawFrame(currentFrame);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, imagesLoaded, currentFrame]);

  // Update frame when currentFrame changes
  useEffect(() => {
    if (!imagesLoaded || isMobile) return;
    
    animationFrameRef.current = requestAnimationFrame(() => {
      drawFrame(currentFrame);
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentFrame, imagesLoaded, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return;
      
      const heroHeight = window.innerHeight * 8;
      const scrolled = window.scrollY;
      
      if (scrolled < heroHeight) {
        const progress = Math.min((scrolled / heroHeight) * 100, 100);
        setScrollProgress(progress);
        const frameIndex = Math.floor((progress / 100) * (TOTAL_FRAMES - 1));
        setCurrentFrame(frameIndex);
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <>
      {/* Fullscreen Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-8 px-4">
            {/* Logo with pulse animation */}
            <div className="animate-pulse">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                El Gordito
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                del Sabor
              </h2>
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 md:w-96 mx-auto">
              {/* Progress Bar Background */}
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                {/* Progress Bar Fill */}
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>

              {/* Progress Percentage */}
              <div className="mt-4 text-amber-400 font-bold text-xl md:text-2xl">
                {loadingProgress}%
              </div>

              {/* Loading Text */}
              <div className="mt-2 text-gray-400 text-sm md:text-base">
                Cargando experiencia...
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Hero Animation Section - SOLO DESKTOP */}
      {!isMobile && (
        <section ref={containerRef} className="relative w-full min-h-[800vh] bg-black">
          {/* Fixed Background Animation Container */}
          <div 
            className="fixed top-0 left-0 h-screen w-full z-0 transition-opacity duration-500"
            style={{
              opacity: scrollProgress < 90 ? 1 : 0,
              pointerEvents: scrollProgress < 90 ? 'auto' : 'none',
            }}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-amber-950/10 opacity-40" />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Background Animation - Fondo Pantalla Completa */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              {/* Lighting Effects */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Rim Light */}
                <div className="absolute w-full h-full bg-gradient-to-r from-amber-500/20 to-transparent rounded-full blur-3xl" />
              </div>

              {/* Animated Product Image - Canvas Rendering */}
              <div className="relative w-full h-full flex items-center justify-center">
                {!imagesLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-xl">Cargando animación...</div>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-cover opacity-50"
                  style={{ 
                    display: 'block',
                  }}
                />
              </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

            {/* Hero Content - Centered Text */}
            <div 
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{
                opacity: Math.max(0, 1 - scrollProgress / 30),
                pointerEvents: scrollProgress > 30 ? 'none' : 'auto',
              }}
            >
              <div className="container-custom w-full px-4">
                {/* Centered Text Content */}
                <div className="text-white space-y-8 max-w-3xl mx-auto text-center">
                  {/* Headline */}
                  <div>
                    <h1 className="text-7xl lg:text-8xl font-bold leading-tight mb-6">
                      El Gordito
                      <br />
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        del Sabor
                      </span>
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                    Delantales diseñados para los que cocinan con respeto. Personaliza el tuyo y cocina con estilo.
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => router.push('/tienda')}
                    className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-5 px-12 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                  >
                    Diseñar mi delantal
                  </button>

                  {/* Features */}
                  <div className="flex gap-12 pt-12 border-t border-gray-800 justify-center">
                    <div>
                      <p className="text-amber-400 font-bold text-2xl">100%</p>
                      <p className="text-gray-400 text-lg">Personalizable</p>
                    </div>
                    <div>
                      <p className="text-amber-400 font-bold text-2xl">Premium</p>
                      <p className="text-gray-400 text-lg">Calidad</p>
                    </div>
                    <div>
                      <p className="text-amber-400 font-bold text-2xl">Rápido</p>
                      <p className="text-gray-400 text-lg">Envío</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 flex flex-col items-center gap-4 z-30">
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
      )}

      {/* Hero Section Simplificado para Mobile */}
      {isMobile && (
        <section className="relative w-full min-h-screen bg-black pt-32 pb-20 z-10">
          <div className="container-custom w-full h-full flex items-center justify-center">
            {/* Centered Text Content */}
            <div className="text-white space-y-6 max-w-3xl mx-auto text-center">
              {/* Headline */}
              <div>
                <h1 className="text-4xl font-bold leading-tight mb-4">
                  El Gordito
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    del Sabor
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-base text-gray-300 leading-relaxed px-2">
                Delantales diseñados para los que cocinan con respeto. Personaliza el tuyo y cocina con estilo.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => router.push('/tienda')}
                className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
              >
                Diseñar mi delantal
              </button>

              {/* Features */}
              <div className="flex flex-col gap-6 pt-8 border-t border-gray-800 justify-center">
                <div>
                  <p className="text-amber-400 font-bold text-xl">100%</p>
                  <p className="text-gray-400 text-sm">Personalizable</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold text-xl">Premium</p>
                  <p className="text-gray-400 text-sm">Calidad</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold text-xl">Rápido</p>
                  <p className="text-gray-400 text-sm">Envío</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
