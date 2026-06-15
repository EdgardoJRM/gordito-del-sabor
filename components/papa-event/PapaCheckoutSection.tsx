'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import {
  papaBundles,
  papaEvent,
  validateEmbroideryNames,
  type PapaBundleId,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';

export default function PapaCheckoutSection() {
  const searchParams = useSearchParams();
  const [bundleId, setBundleId] = useState<PapaBundleId>('vip');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    setCancelled(searchParams.get('cancelled') === '1');
  }, [searchParams]);

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
    <section
      id="ordenar"
      className="section-spacing-comfort bg-[#F2EDE6] border-t border-[#E8E0D8] scroll-mt-28"
    >
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
          <p className="comfort-eyebrow text-[#6B5B4E] mb-3">Paso 1: elige tu oferta</p>
          <h2 className="heading-section-comfort text-[#1A1412] mb-4">
            Personaliza y ordena tu delantal
          </h2>
          <p className="body-text text-lg max-w-2xl mx-auto">
            Stock en mano. Ordena hoy y recibe antes del Día de los Padres.
          </p>
        </div>

        {cancelled && (
          <div
            className="mb-8 rounded-2xl border-2 border-[#C4472B]/40 bg-[#FFF8F5] p-6 text-center"
            role="status"
          >
            <p className="text-lg font-bold text-[#1A1412] mb-1">No se completó el pago</p>
            <p className="body-text">
              Puedes intentar de nuevo abajo. Si necesitas ayuda, escríbenos a{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-[#C4472B] font-bold underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        )}

        <div
          role="radiogroup"
          aria-labelledby="bundle-picker-label"
          className="grid grid-cols-1 gap-5 mb-10"
        >
          <p id="bundle-picker-label" className="sr-only">
            Selecciona tu oferta
          </p>
          {(Object.keys(papaBundles) as PapaBundleId[]).map((id) => {
            const bundle = papaBundles[id];
            const active = bundleId === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setBundleId(id)}
                className={`relative text-left rounded-2xl border-2 p-6 md:p-8 transition-all min-h-[120px] ${
                  active
                    ? 'border-[#C4472B] bg-[#FFF8F5] ring-2 ring-[#C4472B]/30 shadow-md'
                    : 'border-[#E8E0D8] bg-[#FAF8F5] hover:border-[#C4472B]/40'
                }`}
              >
                {bundle.badge && (
                  <span className="inline-block rounded-full bg-[#C4472B] px-4 py-1.5 text-sm font-bold text-white mb-3">
                    {bundle.badge}
                  </span>
                )}
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-[#1A1412]">{bundle.title}</h3>
                  <p className="text-3xl font-bold text-[#C4472B]">{bundle.priceLabel}</p>
                </div>
                <ul className="space-y-2">
                  {bundle.bullets.map((line) => (
                    <li key={line} className="flex gap-3 text-lg text-[#6B5B4E]">
                      <Check className="shrink-0 text-[#C4472B] mt-1" size={20} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border-2 border-[#E8E0D8] bg-[#FAF8F5] p-8 md:p-10 shadow-sm">
          <h3 className="text-2xl font-bold text-[#1A1412] mb-2">
            Paso 2: datos para el bordado
          </h3>
          <p className="body-text text-lg mb-8">
            Oferta seleccionada: <strong className="text-[#1A1412]">{selected.title}</strong> (
            {selected.priceLabel})
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="embroidery-1" className="block text-lg font-bold text-[#1A1412] mb-2">
                {isLegado ? 'Nombre delantal 1 (papá)' : 'Nombre a bordar'}
              </label>
              <input
                id="embroidery-1"
                type="text"
                maxLength={papaEvent.maxEmbroideryChars}
                value={name1}
                onChange={(e) => setName1(e.target.value.slice(0, papaEvent.maxEmbroideryChars))}
                placeholder="Ej: Papi"
                className="input-comfort"
                autoComplete="off"
              />
              <p className="text-base text-[#6B5B4E] mt-2">
                Máximo {papaEvent.maxEmbroideryChars} letras. Escribe exactamente cómo quieres que salga.
              </p>
            </div>

            {isLegado && (
              <div>
                <label htmlFor="embroidery-2" className="block text-lg font-bold text-[#1A1412] mb-2">
                  Nombre delantal 2 (hijo/a)
                </label>
                <input
                  id="embroidery-2"
                  type="text"
                  maxLength={papaEvent.maxEmbroideryChars}
                  value={name2}
                  onChange={(e) => setName2(e.target.value.slice(0, papaEvent.maxEmbroideryChars))}
                  placeholder="Ej: Nene"
                  className="input-comfort"
                  autoComplete="off"
                />
              </div>
            )}

            <div>
              <label htmlFor="checkout-email" className="block text-lg font-bold text-[#1A1412] mb-2">
                Tu email (para la confirmación)
              </label>
              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input-comfort"
                autoComplete="email"
              />
            </div>
          </div>

          {error && (
            <p className="mt-6 text-lg font-bold text-[#C4472B]" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="btn-text mt-8 w-full bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[56px] text-xl"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Abriendo pago seguro…
              </>
            ) : (
              `Pagar ${selected.priceLabel} — pago seguro`
            )}
          </button>

          <p className="text-base text-center text-[#6B5B4E] mt-6 leading-relaxed">
            Pago seguro con Stripe · Envío en checkout · Hecho en Puerto Rico
            <br />
            ¿Dudas?{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-[#C4472B] font-bold underline">
              Escríbenos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
