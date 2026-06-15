'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import BrandLogo from '@/components/shared/BrandLogo';
import { siteConfig } from '@/lib/site-config';
import { usePapaInventory } from '@/hooks/usePapaInventory';

export default function PapaEventHeader() {
  const { inventory, loading } = usePapaInventory();

  return (
    <header className="relative bg-[#1A1412]/95 backdrop-blur-lg border-b border-white/10">
      <div className="container-custom">
        <div className="flex justify-between items-center gap-4 py-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <BrandLogo
              width={64}
              height={64}
              className="h-14 w-14 md:h-16 md:w-16"
              imageClassName="h-full w-full object-contain"
              priority
            />
            <span className="sr-only">{siteConfig.brandName}</span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 nav-text text-[#E8D4BC] hover:text-white transition-colors"
            >
              <MessageCircle size={20} aria-hidden />
              Dudas
            </a>
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
