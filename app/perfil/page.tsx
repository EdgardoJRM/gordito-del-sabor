'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFavoritesStore } from '@/lib/favorites-store';
import { Heart, LogOut, ArrowLeft, Trash2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (status === 'loading' || !isMounted) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3B30] mx-auto mb-4"></div>
          <p className="body-text">Cargando...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="heading-section text-white">Acceso Requerido</h1>
          <p className="body-text text-xl">Debes iniciar sesión para ver tu perfil</p>
          <Link
            href="/auth/login"
            className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 px-10 rounded-full transition-all transform hover:scale-105"
          >
            Iniciar Sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-900">
        <div className="container-custom py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#A1A1A6] hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="heading-section text-white mb-2">Mi Perfil</h1>
              <p className="body-text text-xl">Bienvenido, {session?.user?.name}</p>
            </div>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
              className="btn-text flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 w-fit"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <section className="section-spacing">
        <div className="container-custom">
          {/* User Info */}
          <div className="bg-[#1C1C1E] border border-gray-900 rounded-3xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Información de Cuenta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-[#6E6E73] font-bold mb-2 uppercase tracking-wide">Nombre</p>
                <p className="text-xl text-white">{session?.user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-[#6E6E73] font-bold mb-2 uppercase tracking-wide">Email</p>
                <p className="text-xl text-white">{session?.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Favorites Section */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                  <Heart className="text-[#FF3B30]" size={40} fill="#FF3B30" />
                  Mis Recetas Favoritas
                </h2>
                <p className="body-text text-lg">
                  {favorites.length} receta{favorites.length !== 1 ? 's' : ''} guardada{favorites.length !== 1 ? 's' : ''}
                </p>
              </div>
              {favorites.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('¿Estás seguro de que quieres eliminar todas tus recetas favoritas?')) {
                      clearFavorites();
                    }
                  }}
                  className="btn-text text-[#FF3B30] hover:text-[#FF453A] font-bold transition-colors"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {favorites.length === 0 ? (
              <div className="bg-[#1C1C1E] border-2 border-dashed border-gray-900 rounded-3xl p-16 text-center">
                <Heart size={80} className="mx-auto text-[#6E6E73] mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  No tienes recetas favoritas
                </h3>
                <p className="body-text text-lg mb-10 max-w-2xl mx-auto">
                  Explora nuestras recetas y guarda tus favoritas para acceder a ellas fácilmente
                </p>
                <Link
                  href="/recetas"
                  className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 px-12 rounded-full transition-all transform hover:scale-105"
                >
                  Explorar Recetas
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-[#1C1C1E] border border-gray-900 rounded-3xl overflow-hidden hover:border-gray-800 transition-all hover:scale-105"
                  >
                    {/* Image placeholder */}
                    <div className="h-56 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <span className="text-7xl">🍳</span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-gray-900 text-[#A1A1A6] text-xs font-bold rounded-full uppercase tracking-wide">
                          {recipe.category}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {recipe.title}
                      </h3>

                      <p className="body-text text-sm mb-4 line-clamp-2">
                        {recipe.description}
                      </p>

                      <p className="text-xs text-[#6E6E73] mb-6">
                        Guardado: {new Date(recipe.savedAt).toLocaleDateString('es-ES')}
                      </p>

                      <div className="flex gap-3">
                        <Link
                          href={`/recetas/${recipe.id}`}
                          className="btn-text flex-1 bg-[#FF3B30] hover:bg-[#FF453A] text-white py-3 rounded-full transition-all text-center transform hover:scale-105"
                        >
                          Ver Receta
                        </Link>
                        <button
                          onClick={() => removeFavorite(recipe.id)}
                          className="px-4 py-3 bg-gray-900 text-[#FF3B30] hover:bg-gray-800 rounded-full transition-colors"
                          title="Eliminar de favoritos"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
