'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { usePapaInventory } from '@/hooks/usePapaInventory';

export default function PapaEventHeader() {
  const { inventory, loading } = usePapaInventory();

  return (
    <header className="sticky top-0 z-50 bg-[#1A1412]/95 backdrop-blur-lg border-b border-white/10">
      <div className="container-custom">
        <div className="flex justify-between items-center gap-4 py-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image
              src={siteConfig.logoPath}
              alt={siteConfig.brandName}
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />
            <span className="sr-only">{siteConfig.brandName}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/preguntas"
              className="hidden sm:inline nav-text text-[#E8D4BC] hover:text-white transition-colors"
            >
              Ayuda
            </Link>
            {inventory.soldOut && !loading ? (
              <span className="btn-text inline-flex items-center justify-center bg-[#6B5B4E] text-white/90 py-4 px-6 md:px-8 rounded-full min-h-[52px] cursor-default">
                Agotado
              </span>
            ) : (
              <a
                href="#ordenar"
                className="btn-text inline-flex items-center justify-center bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 px-6 md:px-8 rounded-full transition-colors shadow-lg min-h-[52px]"
              >
                Asegura tu delantal
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
