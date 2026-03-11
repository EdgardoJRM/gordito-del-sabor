'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Users, ShoppingCart, Eye, LogOut, Mail } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated' || !isAdmin) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">Solo administradores pueden acceder a esta sección</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
          >
            Volver al Inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-900 sticky top-0 z-40">
        <div className="container-custom py-6 flex items-center justify-between">
          <div>
            <h1 className="heading-section text-white">Panel de Admin</h1>
            <p className="body-text text-[#A1A1A6] text-sm">Bienvenido, {session?.user?.name}</p>
          </div>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="flex items-center gap-2 text-[#FF3B30] hover:text-[#FF453A] font-semibold transition-colors"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Users */}
          <Link href="/admin/usuarios" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Usuarios</h3>
                <Users className="text-[#FF3B30]" size={32} />
              </div>
              <p className="text-4xl font-bold text-white mb-2">--</p>
              <p className="body-text text-[#A1A1A6] text-sm">Usuarios registrados</p>
            </div>
          </Link>

          {/* Recetas Vistas */}
          <Link href="/admin/recetas-vistas" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Recetas Vistas</h3>
                <Eye className="text-[#FF3B30]" size={32} />
              </div>
              <p className="text-4xl font-bold text-white mb-2">--</p>
              <p className="body-text text-[#A1A1A6] text-sm">Total de visualizaciones</p>
            </div>
          </Link>

          {/* Órdenes */}
          <Link href="/admin/ordenes" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Órdenes</h3>
                <ShoppingCart className="text-[#FF3B30]" size={32} />
              </div>
              <p className="text-4xl font-bold text-white mb-2">--</p>
              <p className="body-text text-[#A1A1A6] text-sm">Órdenes completadas</p>
            </div>
          </Link>

          {/* Leads */}
          <Link href="/admin/leads" className="group">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Leads</h3>
                <Mail className="text-[#FF3B30]" size={32} />
              </div>
              <p className="text-4xl font-bold text-white mb-2">--</p>
              <p className="body-text text-[#A1A1A6] text-sm">Leads capturados</p>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="heading-section text-white mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/usuarios"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <Users className="text-[#FF3B30] mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">Usuarios</h3>
              <p className="body-text text-[#A1A1A6] text-sm">Ver y gestionar usuarios</p>
            </Link>

            <Link
              href="/admin/recetas-vistas"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <Eye className="text-[#FF3B30] mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">Recetas Vistas</h3>
              <p className="body-text text-[#A1A1A6] text-sm">Analizar recetas populares</p>
            </Link>

            <Link
              href="/admin/ordenes"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <ShoppingCart className="text-[#FF3B30] mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">Órdenes</h3>
              <p className="body-text text-[#A1A1A6] text-sm">Ver todas las órdenes</p>
            </Link>

            <Link
              href="/admin/leads"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <Mail className="text-[#FF3B30] mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">Leads</h3>
              <p className="body-text text-[#A1A1A6] text-sm">Ver leads capturados</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
