'use client';

import { usePapaInventory } from '@/hooks/usePapaInventory';

export default function PapaStickyBar() {
  const { inventory, loading } = usePapaInventory();

  const total = inventory.total;
  const remaining = inventory.remaining;
  const sold = inventory.sold;
  const progress = Math.max(0, Math.min(100, (remaining / total) * 100));

  return (
    <div
      className={`text-white shadow-lg ${
        inventory.soldOut ? 'bg-[#1A1412]' : 'bg-[#C4472B]'
      }`}
    >
      <div className="container-custom py-3 md:py-4">
        <p className="text-center text-base md:text-lg font-bold">
          {loading ? (
            'Cargando disponibilidad…'
          ) : inventory.soldOut ? (
            <>Edición agotada — los {total} delantales ya tienen dueño</>
          ) : (
            <>
              Solo quedan{' '}
              <span className="text-2xl md:text-3xl mx-1">{remaining}</span> de {total} delantales
              <span className="block text-sm font-normal text-white/85 mt-1">
                {sold} vendidos
              </span>
            </>
          )}
        </p>
        {!inventory.soldOut && (
          <div className="mt-2 h-2.5 rounded-full bg-[#A8381F] overflow-hidden max-w-xl mx-auto">
            <div
              className="h-full bg-[#FAF8F5] transition-all duration-700"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={remaining}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label="Delantales disponibles"
            />
          </div>
        )}
      </div>
    </div>
  );
}
