'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  buildPapaStripeCheckoutUrl,
  getDefaultShopBundleId,
  getShopBundleIds,
  papaBundles,
  papaEvent,
  papaNonPersonalizedPromo,
  type PapaBundleId,
} from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';
import { usePapaInventory } from '@/hooks/usePapaInventory';

export default function PapaProductBuyBox() {
  const searchParams = useSearchParams();
  const { inventory, loading } = usePapaInventory();
  const [bundleId, setBundleId] = useState<PapaBundleId>(getDefaultShopBundleId());
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCancelled(searchParams.get('cancelled') === '1');
  }, [searchParams]);

  useEffect(() => {
    if (loading || inventory.soldOut) return;
    if (!inventory.bundleAvailability[bundleId]) {
      const fallback = getShopBundleIds().find((id) => inventory.bundleAvailability[id]);
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
          ? `Legado requiere 2 unidades. Solo quedan ${inventory.remaining}.`
          : 'Esta oferta no está disponible.'
      );
      return;
    }
    const stripeUrl = buildPapaStripeCheckoutUrl(bundleId);
    if (!stripeUrl) {
      setError('Enlace no configurado. Escríbenos y te ayudamos.');
      return;
    }
    window.location.href = stripeUrl;
  };

  const copyPromoCode = async () => {
    try {
      await navigator.clipboard.writeText(papaNonPersonalizedPromo.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!loading && inventory.soldOut) {
    return (
      <div id="ordenar" className="scroll-mt-28 panel-inset p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-earth mb-2">Agotado</p>
        <p className="text-warm-dark mb-4">
          Los {papaEvent.totalAprons} delantales de esta edición ya tienen dueño.
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-sm font-semibold text-warm-dark underline underline-offset-2"
        >
          Escríbenos
        </a>
      </div>
    );
  }

  return (
    <div id="ordenar" className="scroll-mt-28 space-y-5">
      {cancelled && (
        <div
          className="rounded-md bg-[#FFF8F5] px-4 py-3 text-sm text-earth border border-accent/20"
          role="status"
        >
          No se completó el pago.{' '}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-warm-dark underline">
            ¿Necesitas ayuda?
          </a>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold text-warm-dark mb-3">Oferta</p>
        <div className="space-y-1.5" role="radiogroup" aria-label="Selecciona tu oferta">
          {getShopBundleIds().map((id) => {
            const bundle = papaBundles[id];
            const active = bundleId === id;
            const available = inventory.bundleAvailability[id];
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={!available}
                onClick={() => available && setBundleId(id)}
                className={`w-full flex items-center justify-between gap-3 rounded-md px-4 py-3.5 text-left transition-colors ${
                  !available
                    ? 'bg-warm-linen/50 text-earth-light cursor-not-allowed'
                    : active
                      ? 'bg-warm-linen text-warm-dark'
                      : 'bg-transparent hover:bg-warm-linen/60 text-warm-dark'
                }`}
              >
                <span>
                  <span className="block font-semibold">
                    {bundle.title}
                    {bundle.badge && available ? (
                      <span className="ml-2 text-xs font-semibold text-accent">{bundle.badge}</span>
                    ) : null}
                  </span>
                  <span className="block text-sm text-earth mt-0.5">{bundle.bullets[0]}</span>
                </span>
                <span className="font-semibold shrink-0">{bundle.priceLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="panel-inset px-4 py-3 text-sm text-earth">
        <p className="font-semibold text-warm-dark mb-1">
          ¿Sin personalizar? {papaNonPersonalizedPromo.priceLabel}
        </p>
        <p className="leading-relaxed">
          Elige <strong className="text-warm-dark">Personalizado</strong> y en Stripe aplica el código{' '}
          <button
            type="button"
            onClick={copyPromoCode}
            className="font-mono font-semibold text-accent underline underline-offset-2"
            aria-label={`Copiar código ${papaNonPersonalizedPromo.code}`}
          >
            {papaNonPersonalizedPromo.code}
          </button>
          {copied ? ' — copiado' : ''}. Mismo delantal de las fotos, con logo (sin nombre bordado).
        </p>
      </div>

      <p className="text-sm text-earth">
        En Stripe escribes el nombre para el bordado (máx. {papaEvent.maxEmbroideryChars} caracteres)
        — o usas {papaNonPersonalizedPromo.code} si no quieres bordado.
      </p>

      {!loading && (
        <p className="text-sm text-earth">
          Quedan <strong className="text-warm-dark">{inventory.remaining}</strong> de {inventory.total}{' '}
          en esta edición.
        </p>
      )}

      {error && (
        <p className="text-sm font-semibold text-accent" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading || !canSelectBundle}
        className="w-full bg-warm-dark hover:bg-[#2A221E] disabled:bg-[#C4B8AE] disabled:cursor-not-allowed text-white py-4 px-6 text-sm font-semibold uppercase tracking-widest transition-colors min-h-[52px] rounded-md"
      >
        {loading ? 'Cargando…' : `Comprar ahora — ${selected.priceLabel}`}
      </button>

      <p className="text-xs text-earth leading-relaxed text-center">
        En Stripe completas pago y entrega. Pago seguro.
        <br />
        <a
          href={siteConfig.whatsappGroup}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-warm-dark"
        >
          WhatsApp
        </a>
        {' · '}
        <a href={`mailto:${siteConfig.email}`} className="underline text-warm-dark">
          Email
        </a>
      </p>
    </div>
  );
}
