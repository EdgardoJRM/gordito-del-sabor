'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

export default function PapaEventHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#1A1412]/90 backdrop-blur-lg border-b border-white/10">
      <div className="container-custom">
        <div className="flex flex-wrap justify-between items-center gap-3 py-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image
              src={siteConfig.logoPath}
              alt={siteConfig.brandName}
              width={180}
              height={42}
              className="h-8 w-auto brightness-0 invert object-contain"
              priority
            />
            <span className="sr-only">{siteConfig.brandName}</span>
          </Link>
          <a
            href="#ordenar"
            className="inline-flex items-center justify-center shrink-0 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold text-sm md:text-base py-3 px-5 md:px-8 rounded-full transition-colors shadow-lg"
          >
            Personalizar ahora
          </a>
        </div>
      </div>
    </header>
  );
}
