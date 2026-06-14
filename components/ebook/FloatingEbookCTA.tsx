'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';

const FLOAT_PATHS = new Set([
  '/',
  '/recetas',
  '/recetario',
  '/el-sabor-de-papa',
  '/delantal',
  '/la-boveda',
  '/las-20-recetas-favoritas',
  '/sobre-nosotros',
  '/patrocinadores',
  '/preguntas',
]);

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
      className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
      title="Descargar recetario gratis"
    >
      <Download size={20} />
      <span className="hidden sm:inline">Recetario gratis</span>
      <span className="sm:hidden">PDF</span>
    </a>
  );
}
