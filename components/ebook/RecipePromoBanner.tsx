'use client';

import { ChefHat } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function RecipePromoBanner() {
  if (siteConfig.recetarioGratisEnabled) {
    return (
      <div className="bg-[#FAF8F5] border border-[#C4472B]/25 rounded-2xl p-8 md:p-12 my-12 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1A1412] mb-2">
              ¿Te gustó esta receta?
            </h3>
            <p className="body-text text-lg text-[#6B5B4E]">
              Descarga el recetario completo con 20 recetas del Gordito.
            </p>
          </div>
          <a
            href="/recetario"
            className="flex items-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 whitespace-nowrap"
          >
            Descargar gratis
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] border border-[#C4472B]/25 rounded-2xl p-8 md:p-12 my-12 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-[#1A1412] mb-2">
            ¿Te gustó esta receta?
          </h3>
          <p className="body-text text-lg text-[#6B5B4E]">
            El recetario digital con 20 recetas favoritas viene incluido con Delantal El Gordito.
          </p>
        </div>
        <a
          href="/delantal-el-gordito"
          className="flex items-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 whitespace-nowrap"
        >
          <ChefHat size={20} aria-hidden />
          Asegura tu delantal
        </a>
      </div>
    </div>
  );
}
