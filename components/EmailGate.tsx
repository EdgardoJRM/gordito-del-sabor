'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface EmailGateProps {
  isOpen: boolean;
  onSubmit: (email: string, name: string) => void;
  recipeName: string;
}

export default function EmailGate({ isOpen, onSubmit, recipeName }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    // Validar nombre
    if (name.trim().length < 2) {
      setError('Por favor ingresa tu nombre');
      return;
    }

    setLoading(true);

    try {
      // Aquí puedes enviar los datos a tu backend
      // Por ahora, solo guardamos en localStorage
      const subscribers = JSON.parse(localStorage.getItem('recipe_subscribers') || '[]');
      
      subscribers.push({
        email,
        name,
        recipe: recipeName,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem('recipe_subscribers', JSON.stringify(subscribers));

      // Llamar callback
      onSubmit(email, name);

      // Limpiar formulario
      setEmail('');
      setName('');
    } catch (err) {
      setError('Error al procesar tu solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in-up">
        <h2 className="heading-3 text-amber-900 mb-2">Acceder a la Receta</h2>
        <p className="text-gray-600 mb-6">
          Para acceder a la receta de <span className="font-semibold">{recipeName}</span>, por favor comparte tu información:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Procesando...' : 'Acceder a la Receta'}
          </button>

          {/* Nota de privacidad */}
          <p className="text-xs text-gray-500 text-center">
            Tu información será usada solo para enviarte recetas y promociones.
            No compartimos tus datos.
          </p>
        </form>
      </div>
    </div>
  );
}
