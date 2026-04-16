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
      setOrderData({
        id: sessionId,
        status: 'confirmed',
      });
    }

    setLoading(false);
  }, [sessionId, clearCart]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3B30] mx-auto mb-4"></div>
          <p className="body-text">Procesando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-900">
        <div className="container-custom py-6">
          <Link href="/" className="text-2xl font-bold text-white">
            El Gordito del Sabor
          </Link>
        </div>
      </header>

      {/* Success Message */}
      <section className="section-spacing flex items-center">
        <div className="container-custom max-w-3xl">
          <div className="bg-[#1C1C1E] border border-gray-900 rounded-3xl shadow-2xl p-12 md:p-16 text-center">
            {/* Icon */}
            <div className="mb-10 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse"></div>
                <CheckCircle size={100} className="text-green-500 relative" strokeWidth={2} />
              </div>
            </div>

            {/* Title */}
            <h1 className="heading-section text-white mb-6">
              ¡Pago Exitoso!
            </h1>

            {/* Message */}
            <p className="body-text text-2xl mb-12">
              Gracias por tu compra. Tu delantal personalizado está siendo preparado.
            </p>

            {/* Order Details */}
            <div className="bg-black border border-gray-900 rounded-3xl p-8 mb-10 text-left">
              <h2 className="text-2xl font-bold text-white mb-6">
                Detalles de tu Orden
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="body-text">ID de Orden:</span>
                  <span className="font-mono text-sm text-white">
                    {sessionId?.slice(0, 20)}...
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-text">Estado:</span>
                  <span className="font-bold text-green-500">Confirmado</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="body-text">Próximo Paso:</span>
                  <span className="text-white">Envío en 3-5 días</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-900/50 rounded-3xl p-8 mb-12 text-left">
              <div className="flex gap-4">
                <Package className="text-blue-400 flex-shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="font-bold text-blue-300 mb-4 text-xl">
                    ¿Qué sucede ahora?
                  </h3>
                  <ul className="body-text space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span>Recibirás un email de confirmación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span>Tu delantal será personalizado y empacado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span>Recibirás un número de seguimiento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      <span>Entrega estimada: 3-5 días hábiles</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/recetas"
                className="btn-text flex-1 bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 rounded-full transition-all transform hover:scale-105"
              >
                Ver recetas
              </Link>
              <Link
                href="/"
                className="btn-text flex-1 bg-gray-900 hover:bg-gray-800 text-white py-5 rounded-full transition-all"
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
