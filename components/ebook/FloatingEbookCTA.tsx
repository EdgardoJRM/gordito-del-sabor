'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChefHat, Download } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const BASE_FLOAT_PATHS = new Set(['/recetas', '/sobre-nosotros']);

export default function FloatingEbookCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const paths = new Set(BASE_FLOAT_PATHS);
    if (siteConfig.recetarioGratisEnabled) {
      paths.add('/recetario');
    }
    setIsVisible(paths.has(pathname ?? ''));
  }, [pathname]);

  if (!isVisible) return null;

  if (siteConfig.recetarioGratisEnabled) {
    return (
      <a
        href="/recetario"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#1A1412] hover:bg-black text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg text-base min-h-[52px]"
        title="Descargar recetario gratis"
      >
        <Download size={22} aria-hidden />
        <span>Recetario gratis</span>
      </a>
    );
  }

  return (
    <a
      href="/delantal-el-gordito"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg text-base min-h-[52px]"
      title="Ordenar Delantal El Gordito"
    >
      <ChefHat size={22} aria-hidden />
      <span>Asegura tu delantal</span>
    </a>
  );
}
