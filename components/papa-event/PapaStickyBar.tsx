'use client';

import { usePapaInventory } from '@/hooks/usePapaInventory';

export default function PapaStickyBar() {
  const { inventory, loading } = usePapaInventory();

  if (loading) return null;

  if (inventory.soldOut) {
    return (
      <div className="bg-[#FAF8F5] hairline-b text-center py-2 text-xs text-[#6B5B4E]">
        Edición agotada — gracias por el amor
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] hairline-b text-center py-2 text-xs text-[#6B5B4E]">
      <span className="text-[#1A1412] font-medium">Envío gratis en PR</span>
      <span className="mx-2">·</span>
      Bordado a mano en 24–48 h
      <span className="mx-2 hidden sm:inline">·</span>
      <span className="hidden sm:inline">
        Quedan <strong className="text-[#1A1412]">{inventory.remaining}</strong> unidades
      </span>
    </div>
  );
}
