'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import {
  papaBundles,
  papaEvent,
  validateEmbroideryNames,
  type PapaBundleId,
} from '@/lib/papa-event';

export default function PapaCheckoutSection() {
  const [bundleId, setBundleId] = useState<PapaBundleId>('vip');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = papaBundles[bundleId];
  const isLegado = bundleId === 'legado';

  const handleCheckout = async () => {
    setError(null);
    const names = isLegado ? [name1, name2] : [name1];
    const validationError = validateEmbroideryNames(bundleId, names);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Ingresa un email válido para la confirmación.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'papa-event',
          bundleId,
          embroideryNames: names.map((n) => n.trim()),
          customerEmail: email.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'No se pudo iniciar el pago.');
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ordenar" className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8] scroll-mt-28">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <p className="label-eyebrow text-[#6B5B4E] mb-3">Edición Día de los Padres</p>
          <h2 className="heading-section text-[#1A1412] text-3xl md:text-5xl mb-4">
            Elige tu bundle y personaliza
          </h2>
          <p className="body-text text-lg max-w-2xl mx-auto">
            Stock real en mano — sin preventa. Ordena hoy y recibe antes del Día de los Padres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {(Object.keys(papaBundles) as PapaBundleId[]).map((id) => {
            const bundle = papaBundles[id];
            const active = bundleId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setBundleId(id)}
                className={`relative text-left rounded-2xl border p-6 transition-all ${
                  active
                    ? 'border-[#C4472B] bg-[#FFF8F5] ring-2 ring-[#C4472B]/30 shadow-md'
                    : 'border-[#E8E0D8] bg-[#FAF8F5] hover:border-[#C4472B]/40'
                }`}
              >
                {bundle.badge && (
                  <span className="absolute -top-3 left-4 rounded-full bg-[#C4472B] px-3 py-1 text-xs font-bold uppercase text-white">
                    {bundle.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#1A1412] mb-1">{bundle.title}</h3>
                <p className="text-3xl font-bold text-[#C4472B] mb-4">{bundle.priceLabel}</p>
                <ul className="space-y-2">
                  {bundle.bullets.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-[#6B5B4E]">
                      <Check className="shrink-0 text-[#C4472B] mt-0.5" size={16} />
                      {line}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-[#E8E0D8] bg-[#FAF8F5] p-8 md:p-10 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-[#1A1412] mb-6">
            Personalización — {selected.title}
          </h3>

          <div className="space-y-5">
            <div>
              <label htmlFor="embroidery-1" className="block text-sm font-bold text-[#1A1412] mb-2">
                {isLegado ? 'Nombre delantal 1 (papá)' : 'Nombre a bordar'}
              </label>
              <input
                id="embroidery-1"
                type="text"
                maxLength={papaEvent.maxEmbroideryChars}
                value={name1}
                onChange={(e) => setName1(e.target.value.slice(0, papaEvent.maxEmbroideryChars))}
                placeholder="Ej: Papi"
                className="w-full rounded-xl border border-[#E8E0D8] bg-white px-4 py-3 text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#C4472B]"
              />
              <p className="text-xs text-[#9C8B80] mt-1">
                Máx. {papaEvent.maxEmbroideryChars} caracteres
              </p>
            </div>

            {isLegado && (
              <div>
                <label htmlFor="embroidery-2" className="block text-sm font-bold text-[#1A1412] mb-2">
                  Nombre delantal 2 (hijo/a)
                </label>
                <input
                  id="embroidery-2"
                  type="text"
                  maxLength={papaEvent.maxEmbroideryChars}
                  value={name2}
                  onChange={(e) => setName2(e.target.value.slice(0, papaEvent.maxEmbroideryChars))}
                  placeholder="Ej: Nene"
                  className="w-full rounded-xl border border-[#E8E0D8] bg-white px-4 py-3 text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#C4472B]"
                />
              </div>
            )}

            <div>
              <label htmlFor="checkout-email" className="block text-sm font-bold text-[#1A1412] mb-2">
                Tu email (confirmación de orden)
              </label>
              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-[#E8E0D8] bg-white px-4 py-3 text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#C4472B]"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm font-medium text-[#C4472B]" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="btn-text mt-8 w-full bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Abriendo pago seguro…
              </>
            ) : (
              `Pagar ${selected.priceLabel} con Stripe`
            )}
          </button>

          <p className="text-xs text-center text-[#9C8B80] mt-4">
            Pago seguro con Stripe · Envío calculado en checkout · Hecho en Puerto Rico
          </p>
        </div>
      </div>
    </section>
  );
}
