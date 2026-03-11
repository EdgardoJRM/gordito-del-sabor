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
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-custom py-6 flex items-center justify-between">
          <div>
            <h1 className="font-montserrat text-3xl font-bold text-amber-900">Panel de Admin</h1>
            <p className="text-gray-600 text-sm">Bienvenido, {session?.user?.name}</p>
          </div>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
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
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-poppins text-lg font-semibold text-gray-700">Usuarios</h3>
                <Users className="text-blue-600" size={32} />
              </div>
              <p className="font-montserrat text-4xl font-bold text-gray-900 mb-2">--</p>
              <p className="text-sm text-gray-600">Usuarios registrados</p>
            </div>
          </Link>

          {/* Recetas Vistas */}
          <Link href="/admin/recetas-vistas" className="group">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-poppins text-lg font-semibold text-gray-700">Recetas Vistas</h3>
                <Eye className="text-green-600" size={32} />
              </div>
              <p className="font-montserrat text-4xl font-bold text-gray-900 mb-2">--</p>
              <p className="text-sm text-gray-600">Total de visualizaciones</p>
            </div>
          </Link>

          {/* Órdenes */}
          <Link href="/admin/ordenes" className="group">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-poppins text-lg font-semibold text-gray-700">Órdenes</h3>
                <ShoppingCart className="text-purple-600" size={32} />
              </div>
              <p className="font-montserrat text-4xl font-bold text-gray-900 mb-2">--</p>
              <p className="text-sm text-gray-600">Órdenes completadas</p>
            </div>
          </Link>

          {/* Leads (placeholder stats) */}
          <Link href="/admin/leads" className="group">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-poppins text-lg font-semibold text-gray-700">Leads</h3>
                <Mail className="text-orange-600" size={32} />
              </div>
              <p className="font-montserrat text-4xl font-bold text-gray-900 mb-2">--</p>
              <p className="text-sm text-gray-600">Leads capturados (ebook, contacto, newsletter)</p>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="font-montserrat text-2xl font-bold text-amber-900 mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/usuarios"
              className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-shadow"
            >
              <Users className="text-blue-600 mb-3" size={32} />
              <h3 className="font-poppins font-semibold text-gray-900 mb-2">Gestionar Usuarios</h3>
              <p className="text-sm text-gray-600">Ver y gestionar usuarios registrados</p>
            </Link>

            <Link
              href="/admin/recetas-vistas"
              className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-shadow"
            >
              <Eye className="text-green-600 mb-3" size={32} />
              <h3 className="font-poppins font-semibold text-gray-900 mb-2">Recetas Vistas</h3>
              <p className="text-sm text-gray-600">Analizar qué recetas son más vistas</p>
            </Link>

            <Link
              href="/admin/ordenes"
              className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-shadow"
            >
              <ShoppingCart className="text-purple-600 mb-3" size={32} />
              <h3 className="font-poppins font-semibold text-gray-900 mb-2">Órdenes</h3>
              <p className="text-sm text-gray-600">Ver todas las órdenes de compra</p>
            </Link>

            <Link
              href="/admin/leads"
              className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-shadow"
            >
              <Mail className="text-orange-600 mb-3" size={32} />
              <h3 className="font-poppins font-semibold text-gray-900 mb-2">Leads</h3>
              <p className="text-sm text-gray-600">Ver leads de ebook, contacto y newsletter</p>
            </Link>

            <Link
              href="/admin/favoritos"
              className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="text-red-600 mb-3 text-3xl">❤️</div>
              <h3 className="font-poppins font-semibold text-gray-900 mb-2">Recetas Favoritas</h3>
              <p className="text-sm text-gray-600">Ver recetas más guardadas</p>
            </Link>

            <Link
              href="/admin/reportes"
              className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-shadow"
            >
              <BarChart3 className="text-orange-600 mb-3" size={32} />
              <h3 className="font-poppins font-semibold text-gray-900 mb-2">Reportes</h3>
              <p className="text-sm text-gray-600">Generar reportes y análisis</p>
            </Link>

            <Link
              href="/admin/configuracion"
              className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="text-gray-600 mb-3 text-3xl">⚙️</div>
              <h3 className="font-poppins font-semibold text-gray-900 mb-2">Configuración</h3>
              <p className="text-sm text-gray-600">Ajustes del sistema</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
