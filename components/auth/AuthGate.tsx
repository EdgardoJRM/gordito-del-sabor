'use client';

import Link from 'next/link';

export default function AuthGate() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1600&q=80"
          alt="Comida boricua"
          className="w-full h-full object-cover"
          style={{ filter: 'blur(20px)' }}
        />
        <div className="absolute inset-0 bg-[#FAF8F5]/85" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 text-center">
        <div className="mb-8">
          <span className="text-7xl">🍳</span>
        </div>

        <h1 className="heading-section text-[#1A1412] mb-6">
          Únete a la comunidad
          <br />
          del sabor
        </h1>

        <p className="body-text text-xl mb-10 leading-relaxed">
          Crea una cuenta gratis para ver todas las recetas del Gordito.
        </p>

        <Link
          href="/auth/login"
          className="btn-text block w-full bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 rounded-full transition-all transform hover:scale-105 mb-4"
        >
          Crear cuenta gratis
        </Link>

        <p className="body-text text-sm mb-8 text-[#6B5B4E]">
          Más de 160,000 personas ya cocinan con el Gordito.
        </p>

        <p className="body-text text-sm text-[#1A1412]">
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/auth/login"
            className="text-[#C4472B] font-bold hover:text-[#A8381F] transition-colors"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
