'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export default function AdminOrdenes() {
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

  if (status === 'unauthenticated' || session?.user?.email !== 'admin@gordito.com') {
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
          <h1 className="font-montserrat text-3xl font-bold text-amber-900">Gestión de Órdenes</h1>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h2 className="font-montserrat text-2xl font-bold text-amber-900 mb-6">Órdenes de Compra</h2>
            
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="font-lora text-gray-600 text-lg">No hay órdenes aún</p>
              <p className="text-sm text-gray-500 mt-2">Las órdenes aparecerán aquí cuando los clientes realicen compras</p>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-lora text-blue-800">
                💡 <span className="font-semibold">Nota:</span> Las órdenes se guardarán cuando se conecte a una base de datos. 
                Actualmente, se pueden ver en el panel de admin de órdenes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
