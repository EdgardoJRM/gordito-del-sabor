'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Loader } from 'lucide-react';

type EbookDownloadFormProps = {
  /** Se dispara al enviar OK, antes de redirigir (p. ej. analytics del funnel) */
  onConversion?: () => void;
};

export default function EbookDownloadForm({ onConversion }: EbookDownloadFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/ebook/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al procesar tu solicitud');
      }

      setSubmitted(true);
      onConversion?.();
      setTimeout(() => {
        router.push('/ebook/descarga');
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el formulario');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#C4472B]/20 rounded-full flex items-center justify-center">
            <Download size={32} className="text-[#C4472B]" />
          </div>
        </div>
        <p className="text-[#1A1412] font-bold text-lg">¡Procesando tu solicitud...</p>
        <p className="body-text text-[#6B5B4E]">Redirigiendo a tu página de descarga...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-[#1A1412] mb-3 uppercase tracking-wide">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-[#E8E0D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4472B] focus:border-transparent text-[#1A1412] placeholder-[#9C8B80]"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-[#1A1412] mb-3 uppercase tracking-wide">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-[#E8E0D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4472B] focus:border-transparent text-[#1A1412] placeholder-[#9C8B80]"
            placeholder="tu@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-[#1A1412] mb-3 uppercase tracking-wide">
          Número de Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-6 py-4 bg-white border border-[#E8E0D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4472B] focus:border-transparent text-[#1A1412] placeholder-[#9C8B80]"
          placeholder="+1 (787) XXX-XXXX"
        />
      </div>

      {error && (
        <div className="bg-[#C4472B]/15 border border-[#C4472B]/40 rounded-2xl p-4">
          <p className="text-[#A8381F] text-sm font-bold">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-text bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 font-bold flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader size={20} className="animate-spin" />
            Procesando...
          </>
        ) : (
          <>
            <Download size={20} />
            Descargar Recetario Gratis
          </>
        )}
      </button>

      <p className="text-xs text-[#9C8B80] text-center">
        Recibirás el recetario por email inmediatamente. Respetamos tu privacidad.
      </p>
    </form>
  );
}
