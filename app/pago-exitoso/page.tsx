'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();

    if (sessionId) {
      // En producción, verificarías la sesión con Stripe
      setOrderData({
        id: sessionId,
        status: 'confirmed',
      });
    }

    setLoading(false);
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Procesando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <Link href="/" className="text-2xl font-bold text-amber-900">
            El Gordito del Sabor
          </Link>
        </div>
      </header>

      {/* Success Message */}
      <section className="py-20">
        <div className="container-custom max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse"></div>
                <CheckCircle size={80} className="text-green-600 relative" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¡Pago Exitoso!
            </h1>

            {/* Message */}
            <p className="text-xl text-gray-600 mb-8">
              Gracias por tu compra. Tu delantal personalizado está siendo preparado.
            </p>

            {/* Order Details */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-lg font-bold text-amber-900 mb-4">
                Detalles de tu Orden
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">ID de Orden:</span>
                  <span className="font-mono text-sm text-gray-900">
                    {sessionId?.slice(0, 20)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Estado:</span>
                  <span className="font-semibold text-green-600">Confirmado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Próximo Paso:</span>
                  <span className="text-gray-900">Envío en 3-5 días</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <div className="flex gap-3">
                <Package className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">
                    ¿Qué sucede ahora?
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>✓ Recibirás un email de confirmación</li>
                    <li>✓ Tu delantal será personalizado y empacado</li>
                    <li>✓ Recibirás un número de seguimiento</li>
                    <li>✓ Entrega estimada: 3-5 días hábiles</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tienda"
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
              >
                Continuar Comprando
              </Link>
              <Link
                href="/"
                className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
