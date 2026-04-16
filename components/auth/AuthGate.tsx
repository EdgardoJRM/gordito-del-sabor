'use client';

import Link from 'next/link';

export default function AuthGate() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1600&q=80"
          alt="Comida boricua"
          className="w-full h-full object-cover"
          style={{ filter: 'blur(20px)' }}
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md mx-auto px-6 text-center">
        {/* Icon */}
        <div className="mb-8">
          <span className="text-7xl">🍳</span>
        </div>

        {/* Headline */}
        <h1 className="heading-section text-white mb-6">
          Únete a la comunidad
          <br />
          del sabor
        </h1>

        {/* Subheadline */}
        <p className="body-text text-xl mb-10 leading-relaxed">
          Crea una cuenta gratis para ver todas las recetas del Gordito.
        </p>

        {/* Primary CTA */}
        <Link
          href="/auth/login"
          className="btn-text block w-full bg-[#FF3B30] hover:bg-[#FF453A] text-white py-5 rounded-full transition-all transform hover:scale-105 mb-4"
        >
          Crear cuenta gratis
        </Link>

        {/* Social Proof */}
        <p className="body-text text-sm mb-8 opacity-75">
          Más de 160,000 personas ya cocinan con el Gordito.
        </p>

        {/* Secondary Link */}
        <p className="body-text text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/auth/login"
            className="text-white font-bold hover:text-[#FF3B30] transition-colors"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
