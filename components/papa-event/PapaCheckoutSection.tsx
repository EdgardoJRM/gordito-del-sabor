'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';
import {
  buildPapaStripeCheckoutUrl,
  papaBundles,
  papaEvent,
  papaHero,
  type PapaBundleId,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';
import { usePapaInventory } from '@/hooks/usePapaInventory';

export default function PapaCheckoutSection() {
  const searchParams = useSearchParams();
  const { inventory, loading } = usePapaInventory();
  const [bundleId, setBundleId] = useState<PapaBundleId>('vip');
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    setCancelled(searchParams.get('cancelled') === '1');
  }, [searchParams]);

  useEffect(() => {
    if (loading || inventory.soldOut) return;

    if (!inventory.bundleAvailability[bundleId]) {
      const fallback = (Object.keys(papaBundles) as PapaBundleId[]).find(
        (id) => inventory.bundleAvailability[id]
      );
      if (fallback) setBundleId(fallback);
    }
  }, [bundleId, inventory, loading]);

  const selected = papaBundles[bundleId];
  const canSelectBundle = inventory.bundleAvailability[bundleId];

  const handleCheckout = () => {
    setError(null);

    if (inventory.soldOut) {
      setError('Esta edición ya está agotada.');
      return;
    }

    if (!canSelectBundle) {
      setError(
        selected.apronCount > 1
          ? `Legado incluye 2 delantales. Solo quedan ${inventory.remaining}. Elige Premium o VIP.`
          : 'Esta oferta ya no está disponible.'
      );
      return;
    }

    const stripeUrl = buildPapaStripeCheckoutUrl(bundleId);
    if (!stripeUrl) {
      setError('El enlace no está configurado. Escríbenos y te ayudamos.');
      return;
    }

    window.location.href = stripeUrl;
  };

  if (!loading && inventory.soldOut) {
    return (
      <section
        id="ordenar"
        className="section-spacing-comfort bg-[#F2EDE6] border-t border-[#E8E0D8] scroll-mt-28"
      >
        <div className="container-custom max-w-3xl text-center">
          <p className="comfort-eyebrow text-[#6B5B4E] mb-3">Edición agotada</p>
          <h2 className="heading-section-comfort text-[#1A1412] mb-4">
            Los 100 delantales ya tienen dueño
          </h2>
          <p className="body-text text-lg max-w-2xl mx-auto mb-8">
            Gracias por el amor. Esta edición de El Sabor de Papá cerró. Si quedaste fuera o
            necesitas ayuda con un pedido, escríbenos.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="btn-text inline-flex items-center justify-center bg-[#1A1412] hover:bg-[#2A221E] text-white py-4 px-8 rounded-full transition-colors min-h-[52px]"
          >
            Escribir a El Gordito
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      id="ordenar"
      className="section-spacing-comfort bg-[#F2EDE6] border-t border-[#E8E0D8] scroll-mt-28"
    >
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
          <p className="comfort-eyebrow text-[#6B5B4E] mb-3">Edición limitada</p>
          <h2 className="heading-section-comfort text-[#1A1412] mb-4">Elige tu oferta</h2>
          <p className="body-text text-lg max-w-2xl mx-auto">
            {loading ? (
              <>Cargando disponibilidad…</>
            ) : (
              <>
                Quedan <strong className="text-[#1A1412]">{inventory.remaining}</strong> de{' '}
                {inventory.total} delantales. Elige la oferta y asegura el
                tuyo en el siguiente paso.
              </>
            )}
          </p>
        </div>

        {cancelled && (
          <div
            className="mb-8 rounded-2xl border-2 border-[#C4472B]/40 bg-[#FFF8F5] p-6 text-center"
            role="status"
          >
            <p className="text-lg font-bold text-[#1A1412] mb-1">No se completó tu reserva</p>
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
            const available = inventory.bundleAvailability[id];
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                aria-disabled={!available}
                disabled={!available}
                onClick={() => available && setBundleId(id)}
                className={`relative text-left rounded-2xl border-2 p-6 md:p-8 transition-all min-h-[120px] ${
                  !available
                    ? 'border-[#E8E0D8] bg-[#F0EBE4] opacity-60 cursor-not-allowed'
                    : active
                      ? 'border-[#C4472B] bg-[#FFF8F5] ring-2 ring-[#C4472B]/30 shadow-md'
                      : 'border-[#E8E0D8] bg-[#FAF8F5] hover:border-[#C4472B]/40'
                } ${bundle.recommended && available ? 'md:scale-[1.01]' : ''}`}
              >
                {!available && (
                  <span className="inline-block rounded-full bg-[#6B5B4E] px-4 py-1.5 text-sm font-bold text-white mb-3">
                    {bundle.apronCount > 1
                      ? `Requiere 2 — quedan ${inventory.remaining}`
                      : 'No disponible'}
                  </span>
                )}
                {available && bundle.badge && (
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
          <p className="body-text text-lg text-center mb-6">
            Oferta seleccionada:{' '}
            <strong className="text-[#1A1412]">
              {selected.title} ({selected.priceLabel})
              {selected.apronCount > 1 ? ` · ${selected.apronCount} delantales` : ''}
            </strong>
          </p>

          {error && (
            <p className="mb-6 text-lg font-bold text-[#C4472B] text-center" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading || !canSelectBundle}
            className="btn-text w-full bg-[#C4472B] hover:bg-[#A8381F] disabled:bg-[#C4B8AE] disabled:cursor-not-allowed text-white py-5 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-h-[56px] text-xl"
          >
            {loading ? 'Cargando…' : `${papaHero.cta} — ${selected.priceLabel}`}
          </button>

          <p className="text-base text-center text-[#6B5B4E] mt-6 leading-relaxed">
            En el siguiente paso completas bordado, entrega y datos. Pago seguro con Stripe.
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
