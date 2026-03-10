'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 bg-gradient-to-r from-black via-amber-950/30 to-black border-t border-gray-800">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block mb-6 p-4 bg-amber-600/20 rounded-full border border-amber-600/30">
            <Mail className="text-amber-400" size={28} />
          </div>

          <h2 className="heading-2 font-montserrat text-white mb-4 text-4xl font-bold">
            Mantente
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Conectado
            </span>
          </h2>

          <p className="font-lora text-gray-400 text-lg mb-10">
            Suscríbete para recibir nuestras últimas recetas, consejos de cocina y ofertas especiales directamente en tu correo.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 rounded-lg bg-gray-900 text-white placeholder-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 whitespace-nowrap"
            >
              Suscribirse
            </button>
          </form>

          {submitted && (
            <p className="mt-4 text-amber-400 font-semibold">
              ¡Gracias por suscribirte! Revisa tu correo.
            </p>
          )}

          <p className="font-lora text-gray-500 text-sm mt-6">
            No compartimos tu correo. Puedes desuscribirse en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
}
