'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const [loading, setLoading] = useState(false);

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

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Acceso Requerido</h1>
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

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          userEmail: session?.user?.email,
          userName: session?.user?.name,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="container-custom py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-amber-900">
            El Gordito del Sabor
          </Link>
          <Link href="/tienda" className="text-amber-600 hover:text-amber-700 font-semibold">
            ← Volver a la tienda
          </Link>
        </div>
      </header>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold text-amber-900 mb-8">Tu Carrito</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Tu carrito está vacío
              </h2>
              <Link
                href="/tienda"
                className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
              >
                Continuar Comprando
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-amber-900">
                        {item.productName}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Personalización: <span className="font-semibold">{item.customText}</span>
                      </p>
                      <p className="text-amber-600 font-bold mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 h-fit">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                  Resumen
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <div className="border-t border-amber-200 pt-4 flex justify-between text-xl font-bold text-amber-900">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Procesando...' : 'Proceder al Pago'}
                </button>

                <Link
                  href="/tienda"
                  className="block text-center mt-4 text-amber-600 hover:text-amber-700 font-semibold"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
