'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export default function EbookSection() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          source: 'ebook',
        }),
      });

      if (!res.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
    } catch (err) {
      setError('Ocurrió un error al enviar tu información. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ebook-section" className="section-spacing bg-black border-t border-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-8">
            <h2 className="heading-section text-white">
              Las 20 Recetas
              <br />
              Favoritas del Sabor
            </h2>
            <p className="body-text text-xl md:text-2xl max-w-xl">
              Descarga gratis el recetario con 20 de las recetas favoritas del Gordito.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#FF3B30] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Recetas fáciles de preparar</p>
              </div>
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#FF3B30] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Ingredientes simples</p>
              </div>
              <div className="flex items-start gap-4">
                <Check size={24} className="text-[#FF3B30] flex-shrink-0 mt-1" />
                <p className="body-text text-lg">Sabor boricua auténtico</p>
              </div>
            </div>
          </div>

          {/* Email Capture Form */}
          <div className="relative h-auto rounded-3xl overflow-hidden bg-[#1C1C1E] border border-gray-900 p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/10" />
            <div className="relative z-10 space-y-6">
              <div className="text-center mb-8">
                <p className="text-sm tracking-[0.3em] uppercase text-[#A1A1A6] mb-2">
                  Recetario digital
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  20 Recetas que saben a casa
                </h3>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-[#FF3B30]/20 rounded-full flex items-center justify-center">
                      <Check size={32} className="text-[#FF3B30]" />
                    </div>
                  </div>
                  <p className="text-white font-bold text-lg">¡Listo!</p>
                  <p className="body-text text-sm">
                    Revisa tu email para descargar el recetario.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent"
                      required
                    />
                  </div>
                  {error && <p className="text-[#FF3B30] text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-text bg-[#FF3B30] hover:bg-[#FF453A] text-white py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 font-bold"
                  >
                    {loading ? 'Enviando...' : 'Descargar Recetario'}
                  </button>
                </form>
              )}

              <p className="text-xs text-[#6E6E73] text-center">
                Formato PDF, fácil de leer en tu celular, tablet o computadora.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

