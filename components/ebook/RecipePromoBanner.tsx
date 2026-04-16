'use client';

import { Download } from 'lucide-react';

export default function RecipePromoBanner() {
  const handleClick = () => {
    // Navigate to recetario landing page
    window.location.href = '/recetario';
  };

  return (
    <div className="bg-gradient-to-r from-[#FF3B30]/10 to-[#FF3B30]/5 border border-[#FF3B30]/30 rounded-2xl p-8 md:p-12 my-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            ¿Te gustó esta receta?
          </h3>
          <p className="body-text text-lg text-[#A1A1A6]">
            Descarga el recetario completo con 20 recetas del Gordito.
          </p>
        </div>
        <button
          onClick={handleClick}
          className="flex items-center gap-2 bg-[#FF3B30] hover:bg-[#FF453A] text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 whitespace-nowrap"
        >
          <Download size={20} />
          Descargar Gratis
        </button>
      </div>
    </div>
  );
}
