'use client';

import { useEffect, useState } from 'react';

type Inventory = {
  total: number;
  sold: number;
  remaining: number;
};

export default function PapaStickyBar() {
  const [inventory, setInventory] = useState<Inventory | null>(null);

  useEffect(() => {
    fetch('/api/papa-event/inventory')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.remaining === 'number') setInventory(data);
      })
      .catch(() => {});
  }, []);

  if (!inventory) return null;

  const progress = Math.max(0, Math.min(100, (inventory.remaining / inventory.total) * 100));

  return (
    <div className="sticky top-[65px] z-40 bg-[#C4472B] text-white shadow-lg">
      <div className="container-custom py-3">
        <p className="text-center text-sm md:text-base font-bold">
          Solo quedan{' '}
          <span className="text-xl md:text-2xl mx-1">{inventory.remaining}</span> de{' '}
          {inventory.total} delantales disponibles
        </p>
        <div className="mt-2 h-2 rounded-full bg-[#A8381F] overflow-hidden max-w-xl mx-auto">
          <div
            className="h-full bg-[#FAF8F5] transition-all duration-700"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={inventory.remaining}
            aria-valuemin={0}
            aria-valuemax={inventory.total}
          />
        </div>
      </div>
    </div>
  );
}
