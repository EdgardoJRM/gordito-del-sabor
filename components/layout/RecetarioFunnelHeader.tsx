'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';

/**
 * Cabecera del funnel /recetario: sin menú de navegación; una sola acción hacia el opt-in.
 */
export default function RecetarioFunnelHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-lg border-b border-[#E8E0D8]">
      <div className="container-custom">
        <div className="flex flex-wrap justify-between items-center gap-3 py-4">
          <p className="text-[#1A1412] font-bold text-lg md:text-xl tracking-tight">
            El Gordito del Sabor
          </p>
          <Link
            href="#recetario-optin"
            className="inline-flex items-center justify-center gap-2 shrink-0 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold text-sm md:text-base py-3 px-5 md:px-8 rounded-full transition-colors shadow-sm"
          >
            <Download size={18} className="hidden sm:block" aria-hidden />
            Descargar el recetario
          </Link>
        </div>
      </div>
    </header>
  );
}
