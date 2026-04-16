'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Download } from 'lucide-react';

export default function FloatingEbookCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const show =
      pathname === '/' ||
      pathname === '/recetas' ||
      pathname === '/recetario';
    setIsVisible(show);
  }, [pathname]);

  if (!isVisible) return null;

  const handleClick = () => {
    window.location.href = '/recetario';
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
      title="Descargar recetario gratis"
    >
      <Download size={20} />
      <span className="hidden sm:inline">Recetario Gratis</span>
      <span className="sm:hidden">Recetario</span>
    </button>
  );
}
