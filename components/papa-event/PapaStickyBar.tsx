'use client';

import { usePapaInventory } from '@/hooks/usePapaInventory';
import { papaProductName } from '@/lib/papa-event';

export default function PapaStickyBar() {
  const { inventory, loading } = usePapaInventory();

  if (loading) {
    return (
      <div className="bg-[#1A1412] text-white border-t border-white/10">
        <div className="container-custom py-2.5 text-center text-sm text-[#C4B8AE]">
          Cargando disponibilidad…
        </div>
      </div>
    );
  }

  if (inventory.soldOut) {
    return (
      <div className="bg-[#1A1412] text-white border-t border-white/10">
        <div className="container-custom py-2.5 text-center text-sm font-medium text-[#E8D4BC]">
          {papaProductName} — edición agotada
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1412] text-white border-t border-white/10">
      <div className="container-custom py-2.5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-sm text-[#E8D4BC]">
        <span className="font-medium text-white">{papaProductName}</span>
        <span className="hidden sm:inline text-[#6B5B4E]">·</span>
        <span>
          Quedan <strong className="text-white">{inventory.remaining}</strong> en esta edición
        </span>
      </div>
    </div>
  );
}
