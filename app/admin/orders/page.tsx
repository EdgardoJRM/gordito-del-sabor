'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { orders } from '@/app/api/checkout/route';
import { Package, ArrowLeft } from 'lucide-react';

export default function AdminOrdersPage() {
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar órdenes desde la API
    const loadOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        const data = await response.json();
        setOrdersList(data.orders || []);
      } catch (error) {
        console.error('Error loading orders:', error);
        // Fallback: usar órdenes en memoria
        setOrdersList(Object.values(orders));
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="container-custom py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-amber-900">Panel de Admin</h1>
          <Link href="/" className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-2">
            <ArrowLeft size={20} />
            Volver
          </Link>
        </div>
      </header>

      {/* Orders */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-amber-900 mb-8">Órdenes Recientes</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando órdenes...</p>
            </div>
          ) : ordersList.length === 0 ? (
            <div className="text-center py-12">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No hay órdenes aún</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      ID Orden
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      Producto
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      Personalización
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.map((order, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-mono text-sm text-gray-900">
                        {order.id?.slice(0, 12)}...
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {order.userName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {order.userEmail || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {order.items?.[0]?.productName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {order.items?.[0]?.customText || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status === 'confirmed'
                            ? 'Confirmado'
                            : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString('es-ES')
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
