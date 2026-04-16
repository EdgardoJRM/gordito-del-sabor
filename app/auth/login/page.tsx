'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        isSignUp: isSignUp.toString(),
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/recetas');
      }
    } catch (err) {
      setError('Ocurrió un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1C1C1E] rounded-3xl border border-gray-900 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">
              {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </h1>
            <p className="body-text">
              {isSignUp
                ? 'Únete a El Gordito del Sabor'
                : 'Bienvenido de vuelta'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-950/50 border border-red-900 rounded-2xl flex items-start gap-3">
              <AlertCircle className="text-[#FF3B30] flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-[#6E6E73]" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full pl-12 pr-4 py-4 bg-black border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-[#6E6E73]" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-black border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-[#6E6E73]" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-black border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-text w-full bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading
                ? 'Procesando...'
                : isSignUp
                ? 'Crear Cuenta'
                : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="body-text text-sm">
              {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({ email: '', password: '', name: '' });
                }}
                className="text-[#FF3B30] font-bold hover:text-[#FF453A]"
              >
                {isSignUp ? 'Inicia sesión' : 'Regístrate'}
              </button>
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-[#A1A1A6] hover:text-white text-sm font-bold transition-colors">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
