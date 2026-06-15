'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';

/** Rutas donde el recetario flotante ayuda sin competir con la compra del delantal. */
const FLOAT_PATHS = new Set(['/recetas', '/recetario', '/sobre-nosotros']);

export default function FloatingEbookCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(FLOAT_PATHS.has(pathname));
  }, [pathname]);

  if (!isVisible) return null;

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
