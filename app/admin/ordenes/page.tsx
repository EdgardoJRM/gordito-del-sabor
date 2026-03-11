'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminOrdenes() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setChecking(false);
      return;
    }

    if (status === 'authenticated') {
      const checkAdmin = async () => {
        try {
          const res = await fetch('/api/admin/check');
          const data = await res.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin:', error);
          setIsAdmin(false);
        } finally {
          setChecking(false);
        }
      };

      checkAdmin();
    }
  }, [status]);

  if (status === 'loading' || checking) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3B30] mx-auto mb-4"></div>
          <p className="text-[#A1A1A6]">Cargando...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated' || !isAdmin) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-section text-white mb-4">Acceso Denegado</h1>
          <Link href="/" className="text-[#FF3B30] hover:text-[#FF453A]">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-900">
        <div className="container-custom py-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[#FF3B30] hover:text-[#FF453A] mb-6 transition-colors">
            <ArrowLeft size={20} />
            Volver al Dashboard
          </Link>
          <h1 className="heading-section text-white">Gestión de Órdenes</h1>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Órdenes de Compra</h2>
            
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-[#6E6E73] mb-4" />
              <p className="body-text text-[#A1A1A6] text-lg">No hay órdenes aún</p>
              <p className="text-sm text-[#6E6E73] mt-2">Las órdenes aparecerán aquí cuando los clientes realicen compras</p>
            </div>

            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-lg">
              <p className="body-text text-[#A1A1A6]">
                💡 <span className="font-semibold text-white">Nota:</span> Las órdenes se guardarán cuando se conecte a una base de datos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
