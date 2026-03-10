'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { apronProducts } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';
import { X, Check } from 'lucide-react';

export default function StorePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState<any>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (productId: string) => {
    // Verificar login solo al intentar agregar al carrito
    if (!session) {
      router.push('/auth/login');
      return;
    }

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
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="section-spacing bg-black border-b border-gray-900">
        <div className="container-custom text-center">
          <h1 className="heading-section text-white mb-6">
            El delantal del sabor
          </h1>
          <p className="body-text text-xl max-w-2xl mx-auto">
            Diseñado para los que cocinan con respeto. Personaliza tu delantal con tu nombre.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {apronProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#1C1C1E] border border-gray-900 rounded-3xl overflow-hidden hover:border-gray-800 transition-all hover:scale-105"
              >
                {/* Product Image */}
                <div className="h-56 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-8xl">
                  {product.image}
                </div>

                {/* Product Info */}
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="body-text mb-6">{product.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-[#A1A1A6] flex items-center gap-2">
                        <span className="text-[#FF3B30]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="text-4xl font-bold text-white mb-8">
                    ${product.price.toFixed(2)}
                  </div>

                  {/* Customization */}
                  {selectedProduct === product.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                          Tu nombre (máx 20 caracteres)
                        </label>
                        <input
                          type="text"
                          value={customText}
                          onChange={(e) =>
                            setCustomText(e.target.value.slice(0, 20))
                          }
                          placeholder="Ej: El Flaco"
                          className="w-full px-6 py-4 bg-black border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                        />
                        <p className="text-xs text-[#6E6E73] mt-2">
                          Se mostrará como: "<span className="text-white">{customText || 'Tu nombre'} del Sabor</span>"
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="btn-text flex-1 bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 rounded-full transition-all transform hover:scale-105"
                        >
                          Agregar al Carrito
                        </button>
                        <button
                          onClick={() => setSelectedProduct(null)}
                          className="btn-text flex-1 bg-gray-900 text-white py-4 rounded-full hover:bg-gray-800 transition-all"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedProduct(product.id)}
                      className="btn-text w-full bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 rounded-full transition-all transform hover:scale-105"
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
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1C1C1E] border border-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-6 right-6 text-[#6E6E73] hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#FF3B30]/20 rounded-full p-6">
                <Check size={40} className="text-[#FF3B30]" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¡Agregado al Carrito!
              </h2>
              <p className="body-text text-lg mb-6">
                {popupProduct?.name}
              </p>
              <div className="bg-black border border-gray-900 rounded-2xl p-6 mb-6">
                <p className="text-xl font-bold text-white mb-2">
                  "{popupProduct?.customText}"
                </p>
                <p className="text-3xl font-bold text-[#FF3B30] mt-4">
                  ${popupProduct?.price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-[#6E6E73] italic">
                Este es el Regalo Perfecto
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="btn-text flex-1 bg-gray-900 text-white py-4 rounded-full hover:bg-gray-800 transition-all"
              >
                Seguir Explorando
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  router.push('/carrito');
                }}
                className="btn-text flex-1 bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 rounded-full transition-all transform hover:scale-105"
              >
                Ir al Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
