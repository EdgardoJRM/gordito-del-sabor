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
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3B30] mx-auto mb-4"></div>
          <p className="body-text">Cargando...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="heading-section text-white">Acceso Requerido</h1>
          <p className="body-text text-xl">Inicia sesión para ver tu carrito</p>
          <Link
            href="/auth/login"
            className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 px-10 rounded-full transition-all transform hover:scale-105"
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
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-900">
        <div className="container-custom py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            El Gordito del Sabor
          </Link>
          <Link href="/tienda" className="text-[#A1A1A6] hover:text-white font-bold transition-colors flex items-center gap-2">
            <ArrowLeft size={20} />
            Volver a la tienda
          </Link>
        </div>
      </header>

      {/* Cart Content */}
      <section className="section-spacing">
        <div className="container-custom max-w-6xl">
          <h1 className="heading-section text-white mb-12">Tu Carrito</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart size={80} className="mx-auto text-[#6E6E73] mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">
                Tu carrito está vacío
              </h2>
              <Link
                href="/tienda"
                className="btn-text inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 px-10 rounded-full transition-all transform hover:scale-105"
              >
                Continuar Comprando
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#1C1C1E] border border-gray-900 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {item.productName}
                      </h3>
                      <p className="body-text text-sm mb-3">
                        Personalización: <span className="font-bold text-white">{item.customText}</span>
                      </p>
                      <p className="text-[#FF3B30] font-bold text-xl">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-black border border-gray-900 rounded-full overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-4 py-2 text-white hover:bg-gray-900 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-4 py-2 text-white hover:bg-gray-900 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#FF3B30] hover:text-[#FF453A] p-3 transition-colors"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-[#1C1C1E] border border-gray-900 rounded-3xl p-8 h-fit sticky top-24">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Resumen
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between text-[#A1A1A6] text-lg">
                    <span>Subtotal:</span>
                    <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#A1A1A6] text-lg">
                    <span>Envío:</span>
                    <span className="font-bold">Gratis</span>
                  </div>
                  <div className="border-t border-gray-900 pt-6">
                    <div className="flex justify-between text-white text-2xl font-bold">
                      <span>Total:</span>
                      <span className="text-[#FF3B30]">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn-text w-full bg-[#FF3B30] hover:bg-[#FF453A] text-white py-5 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Procesando...' : 'Proceder al Pago'}
                </button>

                <p className="text-[#6E6E73] text-xs text-center mt-6">
                  Pago seguro con Stripe
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
