'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Users, ShoppingCart, Eye, LogOut, Mail, TrendingUp } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface AdminStats {
  totalUsers: number;
  totalLeads: number;
  leadsBySource: {
    ebook: number;
    contact: number;
    newsletter: number;
  };
  totalOrders: number;
  totalRevenue: number;
  topRecipes: Array<{
    id: string;
    title: string;
    favorites: number;
  }>;
  lastUpdated: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

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

  // Cargar estadísticas cuando es admin
  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const res = await fetch('/api/admin/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

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
          <p className="body-text text-[#A1A1A6] mb-6">Solo administradores pueden acceder a esta sección</p>
          <Link
            href="/"
            className="inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white font-bold py-3 px-8 rounded-full transition-all"
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
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Usuarios</h3>
                <Users className="text-blue-400" size={40} />
              </div>
              <p className="text-5xl font-bold text-white mb-2">
                {statsLoading ? '--' : stats?.totalUsers || 0}
              </p>
              <p className="body-text text-[#A1A1A6] text-sm">Usuarios registrados</p>
            </div>
          </Link>

          {/* Total Leads */}
          <Link href="/admin/leads" className="group">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Leads</h3>
                <Mail className="text-purple-400" size={40} />
              </div>
              <p className="text-5xl font-bold text-white mb-2">
                {statsLoading ? '--' : stats?.totalLeads || 0}
              </p>
              <p className="body-text text-[#A1A1A6] text-sm">
                {!statsLoading && stats ? (
                  <>
                    📚 {stats.leadsBySource.ebook} | 📧 {stats.leadsBySource.newsletter} | 💬 {stats.leadsBySource.contact}
                  </>
                ) : (
                  'Cargando...'
                )}
              </p>
            </div>
          </Link>

          {/* Total Orders */}
          <Link href="/admin/ordenes" className="group">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-8 hover:border-green-500/40 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Órdenes</h3>
                <ShoppingCart className="text-green-400" size={40} />
              </div>
              <p className="text-5xl font-bold text-white mb-2">
                {statsLoading ? '--' : stats?.totalOrders || 0}
              </p>
              <p className="body-text text-[#A1A1A6] text-sm">Órdenes completadas</p>
            </div>
          </Link>

          {/* Total Revenue */}
          <div className="group">
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-8 hover:border-orange-500/40 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Ingresos</h3>
                <TrendingUp className="text-orange-400" size={40} />
              </div>
              <p className="text-5xl font-bold text-white mb-2">
                {statsLoading ? '--' : `$${(stats?.totalRevenue || 0).toFixed(2)}`}
              </p>
              <p className="body-text text-[#A1A1A6] text-sm">Ingresos totales USD</p>
            </div>
          </div>
        </div>

        {/* Top Recipes Section */}
        {!statsLoading && stats && stats.topRecipes.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Recetas Más Guardadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.topRecipes.map((recipe, idx) => (
                <div key={recipe.id} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-bold text-[#FF3B30]">#{idx + 1}</span>
                    <span className="text-sm text-[#A1A1A6]">❤️ {recipe.favorites}</span>
                  </div>
                  <p className="text-white font-semibold">{recipe.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/usuarios"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <Users className="text-blue-400 mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">Usuarios</h3>
              <p className="body-text text-[#A1A1A6] text-sm">Ver y gestionar usuarios</p>
            </Link>

            <Link
              href="/admin/recetas"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <Eye className="text-green-400 mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">Recetas</h3>
              <p className="body-text text-[#A1A1A6] text-sm">Gestionar recetas (CRUD)</p>
            </Link>

            <Link
              href="/admin/ordenes"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <ShoppingCart className="text-green-400 mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">Órdenes</h3>
              <p className="body-text text-[#A1A1A6] text-sm">Ver todas las órdenes</p>
            </Link>

            <Link
              href="/admin/leads"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <Mail className="text-purple-400 mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">Leads</h3>
              <p className="body-text text-[#A1A1A6] text-sm">Ver leads capturados</p>
            </Link>
          </div>
        </div>

        {/* Last Updated */}
        {!statsLoading && stats && (
          <p className="text-center text-[#6E6E73] text-xs mt-8">
            Última actualización: {new Date(stats.lastUpdated).toLocaleString('es-ES')}
          </p>
        )}
      </div>
    </main>
  );
}
