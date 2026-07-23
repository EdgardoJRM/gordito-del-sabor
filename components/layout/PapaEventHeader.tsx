'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import BrandLogo from '@/components/shared/BrandLogo';
import { siteConfig } from '@/lib/site-config';
import { usePapaInventory } from '@/hooks/usePapaInventory';

export default function PapaEventHeader() {
  const { inventory, loading } = usePapaInventory();

  return (
    <header className="bg-white border-b border-[#E8E0D8]">
      <div className="container-custom">
        <div className="flex justify-between items-center gap-4 h-16 md:h-[4.5rem]">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <BrandLogo
              width={48}
              height={48}
              className="h-10 w-10 md:h-11 md:w-11"
              imageClassName="h-full w-full object-contain"
              priority
            />
            <span className="hidden sm:block text-sm font-semibold text-[#1A1412] tracking-tight">
              {siteConfig.brandName}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/recetas"
              className="hidden md:inline text-sm text-[#6B5B4E] hover:text-[#1A1412] transition-colors"
            >
              Recetas
            </Link>
            {inventory.soldOut && !loading ? (
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9C8B80]">
                Agotado
              </span>
            ) : (
              <a
                href="#ordenar"
                className="inline-flex items-center gap-2 bg-[#1A1412] hover:bg-[#2A221E] text-white text-xs font-semibold uppercase tracking-widest px-5 py-3 transition-colors min-h-[44px]"
              >
                <ShoppingBag size={16} aria-hidden />
                Comprar
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
