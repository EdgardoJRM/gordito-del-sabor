'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apronProducts } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';
import { X, Check } from 'lucide-react';

export default function StorePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState<any>(null);
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

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
          <p className="text-gray-600 mb-6">Debes iniciar sesión para acceder a la tienda</p>
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

  const handleAddToCart = (productId: string) => {
    if (!customText.trim()) {
      alert('Por favor ingresa el texto personalizado');
      return;
    }

    if (customText.length > 20) {
      alert('El texto no puede exceder 20 caracteres');
      return;
    }

    const product = apronProducts.find((p) => p.id === productId);
    if (!product) return;

    const fullText = `${customText} del Sabor`;

    addItem({
      id: `${productId}-${Date.now()}`,
      productId,
      productName: product.name,
      price: product.price,
      customText: fullText,
      quantity: 1,
    });

    setPopupProduct({
      name: product.name,
      customText: fullText,
      price: product.price,
    });
    setShowPopup(true);
    setCustomText('');
    setSelectedProduct(null);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Delantales Personalizados
          </h1>
          <p className="text-xl opacity-90">
            Crea tu delantal único con tu nombre personalizado
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {apronProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-8xl">
                  {product.image}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="text-amber-600">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="text-3xl font-bold text-amber-900 mb-6">
                    ${product.price.toFixed(2)}
                  </div>

                  {/* Customization */}
                  {selectedProduct === product.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Tu nombre (máx 20 caracteres)
                        </label>
                        <input
                          type="text"
                          value={customText}
                          onChange={(e) =>
                            setCustomText(e.target.value.slice(0, 20))
                          }
                          placeholder="Ej: El Flaco"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Se mostrará como: "{customText} del Sabor"
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
                        >
                          Agregar al Carrito
                        </button>
                        <button
                          onClick={() => setSelectedProduct(null)}
                          className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-300 transition-all"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedProduct(product.id)}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
                    >
                      Personalizar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <Check size={32} className="text-green-600" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                ¡Agregado al Carrito!
              </h2>
              <p className="text-gray-600 mb-4">
                {popupProduct?.name}
              </p>
              <div className="bg-amber-50 rounded-lg p-4 mb-4">
                <p className="text-lg font-semibold text-amber-900">
                  "{popupProduct?.customText}"
                </p>
                <p className="text-2xl font-bold text-amber-600 mt-2">
                  ${popupProduct?.price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-gray-500 italic mb-6">
                Este es el Regalo Perfecto
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all"
              >
                Seguir Explorando
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  router.push('/carrito');
                }}
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all"
              >
                Asegurar Delantal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
