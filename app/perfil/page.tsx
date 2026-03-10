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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Acceso Requerido</h1>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tu perfil</p>
          <Link
            href="/auth/login"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
          >
            Iniciar Sesión
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="container-custom py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="heading-1 text-amber-900 mb-2">Mi Perfil</h1>
              <p className="text-gray-600">Bienvenido, {session?.user?.name}</p>
            </div>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* User Info */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-12">
            <h2 className="font-montserrat text-2xl font-bold text-amber-900 mb-4">Información de Cuenta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-poppins text-sm text-gray-600 font-medium">Nombre</p>
                <p className="font-lora text-lg text-gray-900">{session?.user?.name}</p>
              </div>
              <div>
                <p className="font-poppins text-sm text-gray-600 font-medium">Email</p>
                <p className="font-lora text-lg text-gray-900">{session?.user?.email}</p>
              </div>
            </div>
          </div>

          {/* Favorites Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-montserrat text-2xl font-bold text-amber-900 mb-2">
                  <Heart className="inline-block mr-2 text-red-500" size={28} />
                  Mis Recetas Favoritas
                </h2>
                <p className="font-lora text-gray-600">
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
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {favorites.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
                <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="font-montserrat text-2xl font-bold text-gray-700 mb-2">
                  No tienes recetas favoritas
                </h3>
                <p className="font-lora text-gray-600 mb-6">
                  Explora nuestras recetas y guarda tus favoritas para acceder a ellas fácilmente
                </p>
                <Link
                  href="/recetas"
                  className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
                >
                  Explorar Recetas
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Image placeholder */}
                    <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                      <span className="text-6xl">🍳</span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="font-poppins inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                          {recipe.category}
                        </span>
                      </div>

                      <h3 className="font-montserrat text-xl font-bold text-amber-900 mb-2">
                        {recipe.title}
                      </h3>

                      <p className="font-lora text-gray-600 text-sm mb-4">
                        {recipe.description}
                      </p>

                      <p className="font-poppins text-xs text-gray-500 mb-4">
                        Guardado: {new Date(recipe.savedAt).toLocaleDateString('es-ES')}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/recetas/${recipe.id}`}
                          className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all text-center"
                        >
                          Ver Receta
                        </Link>
                        <button
                          onClick={() => removeFavorite(recipe.id)}
                          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
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
