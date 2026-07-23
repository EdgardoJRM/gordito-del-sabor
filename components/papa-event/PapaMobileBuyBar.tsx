'use client';

import { useEffect, useState } from 'react';
import { getDefaultShopBundleId, papaBundles, papaProductName } from '@/lib/papa-event';
import { usePapaInventory } from '@/hooks/usePapaInventory';

export default function PapaMobileBuyBar() {
  const { inventory, loading } = usePapaInventory();
  const [heroInView, setHeroInView] = useState(true);
  const [checkoutInView, setCheckoutInView] = useState(false);
  const defaultBundle = papaBundles[getDefaultShopBundleId()];

  useEffect(() => {
    const hero = document.getElementById('papa-hero');
    const checkout = document.getElementById('ordenar');

    const heroObserver = hero
      ? new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
          threshold: 0.05,
        })
      : null;

    const checkoutObserver = checkout
      ? new IntersectionObserver(([entry]) => setCheckoutInView(entry.isIntersecting), {
          threshold: 0.2,
        })
      : null;

    if (hero && heroObserver) heroObserver.observe(hero);
    if (checkout && checkoutObserver) checkoutObserver.observe(checkout);

    return () => {
      heroObserver?.disconnect();
      checkoutObserver?.disconnect();
    };
  }, []);

  const visible = !heroInView && !checkoutInView;

  if (loading || inventory.soldOut || !visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-[#E8E0D8] bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#1A1412] truncate">{papaProductName}</p>
          <p className="text-xs text-[#6B5B4E]">
            {defaultBundle.title} · {defaultBundle.priceLabel}
          </p>
        </div>
        <a
          href="#ordenar"
          className="shrink-0 bg-[#1A1412] text-white text-xs font-semibold uppercase tracking-widest px-6 py-3.5 min-h-[44px] inline-flex items-center"
        >
          Comprar
        </a>
      </div>
    </div>
  );
}
