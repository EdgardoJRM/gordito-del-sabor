'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter',
        }),
      });

      if (!res.ok) {
        throw new Error('Error al suscribirte');
      }

      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Ocurrió un error al suscribirte. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-spacing flex items-center justify-center bg-black border-t border-gray-900">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Headline */}
          <h2 className="heading-section text-white">
            No te pierdas la
            <br />
            próxima receta.
          </h2>

          {/* Copy */}
          <p className="body-text text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            Recibe recetas, tips y novedades del Gordito del Sabor directo a tu correo.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="nav-text flex-1 px-6 py-4 rounded-full bg-gray-900 text-white placeholder-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-text px-10 py-4 bg-[#FF3B30] hover:bg-[#FF453A] text-white rounded-full transition-all transform hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Enviando...' : 'Suscribirme'}
              </button>
            </div>

            {submitted && !error && (
              <p className="mt-6 text-[#FF3B30] font-bold">
                ¡Gracias por suscribirte!
              </p>
            )}
            {error && (
              <p className="mt-4 text-[#FF3B30] body-text text-sm">
                {error}
              </p>
            )}

            <p className="text-[#6E6E73] text-sm mt-6">
              No compartimos tu correo. Cancela cuando quieras.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
