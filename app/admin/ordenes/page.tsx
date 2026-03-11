'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrderData {
  _id: string;
  email: string;
  productId: string;
  customText?: string;
  quantity: number;
  price: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdenes() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Cargar órdenes cuando es admin
  useEffect(() => {
    if (!isAdmin) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/orders');
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Órdenes de Compra</h2>
              <span className="text-[#A1A1A6] text-sm">Total: {orders.length}</span>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3B30] mx-auto mb-4"></div>
                <p className="text-[#A1A1A6]">Cargando órdenes...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart size={64} className="mx-auto text-[#6E6E73] mb-4" />
                <p className="body-text text-[#A1A1A6] text-lg">No hay órdenes aún</p>
                <p className="text-sm text-[#6E6E73] mt-2">Las órdenes aparecerán aquí cuando los clientes realicen compras</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-4 text-left font-bold text-white">Email</th>
                      <th className="px-6 py-4 text-left font-bold text-white">Producto</th>
                      <th className="px-6 py-4 text-left font-bold text-white">Cantidad</th>
                      <th className="px-6 py-4 text-left font-bold text-white">Precio</th>
                      <th className="px-6 py-4 text-left font-bold text-white">Estado</th>
                      <th className="px-6 py-4 text-left font-bold text-white">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-[#A1A1A6]">{order.email}</td>
                        <td className="px-6 py-4 text-white font-semibold">{order.productId}</td>
                        <td className="px-6 py-4 text-white">{order.quantity}</td>
                        <td className="px-6 py-4 text-white font-semibold">${order.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'completed'
                                ? 'bg-green-500/20 text-green-400'
                                : order.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {order.status === 'completed' ? '✓ Completada' : order.status === 'pending' ? '⏳ Pendiente' : '✗ Fallida'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#A1A1A6] text-sm">
                          {new Date(order.createdAt).toLocaleDateString('es-ES')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
