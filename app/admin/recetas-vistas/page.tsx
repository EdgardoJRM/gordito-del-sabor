'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';
import { recipes } from '@/lib/recipes-data';

export default function AdminRecetasVistas() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </main>
    );
  }

  const isAdmin =
    (session?.user as any)?.role === 'admin' ||
    session?.user?.email === 'admin@gordito.com';

  if (status === 'unauthenticated' || !isAdmin) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Acceso Denegado</h1>
          <Link href="/" className="text-amber-600 hover:text-amber-700">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver al Dashboard
          </Link>
          <h1 className="font-montserrat text-3xl font-bold text-amber-900">Recetas Más Vistas</h1>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <div key={recipe.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">🍳</span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-poppins inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                    {recipe.category}
                  </span>
                  <span className="font-montserrat text-2xl font-bold text-green-600">#{index + 1}</span>
                </div>

                <h3 className="font-montserrat text-xl font-bold text-amber-900 mb-2">
                  {recipe.title}
                </h3>

                <p className="font-lora text-gray-600 text-sm mb-4">
                  {recipe.description}
                </p>

                <div className="flex items-center gap-2 text-gray-600">
                  <Eye size={18} />
                  <span className="font-poppins text-sm">-- visualizaciones</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-lora text-blue-800">
            💡 <span className="font-semibold">Nota:</span> Las estadísticas de visualización se guardarán cuando se conecte a una base de datos. 
            Actualmente, se pueden rastrear en tiempo real con la autenticación de usuarios.
          </p>
        </div>
      </div>
    </main>
  );
}
