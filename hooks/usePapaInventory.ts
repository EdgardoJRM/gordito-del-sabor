'use client';

import { useEffect, useState } from 'react';
import { papaEvent } from '@/lib/papa-event';
import type { PapaInventoryResponse } from '@/lib/papa-inventory';

export function usePapaInventory() {
  const [inventory, setInventory] = useState<PapaInventoryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetch('/api/papa-event/inventory')
        .then((res) => (res.ok ? res.json() : null))
        .then((data: PapaInventoryResponse | null) => {
          if (!cancelled && data && typeof data.remaining === 'number') {
            setInventory(data);
          }
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();
    const interval = window.setInterval(load, 60_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const fallback: PapaInventoryResponse = {
    total: papaEvent.totalAprons,
    sold: 0,
    remaining: papaEvent.totalAprons,
    soldOut: false,
    bundleAvailability: {
      premium: true,
      vip: true,
      legado: true,
    },
  };

  return {
    inventory: inventory ?? fallback,
    loading,
    loaded: inventory != null,
  };
}
