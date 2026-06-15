'use client';

import { useEffect, useState } from 'react';
import { papaEvent } from '@/lib/papa-event';

type Inventory = {
  total: number;
  sold: number;
  remaining: number;
};

export default function PapaStickyBar() {
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/papa-event/inventory')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.remaining === 'number') setInventory(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = inventory?.total ?? papaEvent.totalAprons;
  const remaining = inventory?.remaining ?? papaEvent.totalAprons;
  const progress = Math.max(0, Math.min(100, (remaining / total) * 100));

  return (
    <div className="sticky top-[72px] z-40 bg-[#C4472B] text-white shadow-lg">
      <div className="container-custom py-3 md:py-4">
        <p className="text-center text-base md:text-lg font-bold">
          {loading ? (
            'Cargando disponibilidad…'
          ) : (
            <>
              Solo quedan{' '}
              <span className="text-2xl md:text-3xl mx-1">{remaining}</span> de {total} delantales
            </>
          )}
        </p>
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
      </div>
    </div>
  );
}
