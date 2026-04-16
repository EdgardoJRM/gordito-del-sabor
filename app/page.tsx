import HeroPremium from '@/components/sections/HeroPremium';
import EbookSection from '@/components/sections/EbookSection';
import RecipesGrid from '@/components/sections/RecipesGrid';
import GorditoSection from '@/components/sections/GorditoSection';
import ProductLifestyle from '@/components/sections/ProductLifestyle';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      {/* 1. HERO - Marca + Cocina */}
      <HeroPremium />
      
      {/* 2. RECETARIO - Lead Magnet */}
      <EbookSection />
      
      {/* 3. RECETAS POPULARES */}
      <RecipesGrid />

      {/* 4. HISTORIA / PERSONALIDAD */}
      <GorditoSection />
      
      {/* 5. PRODUCTO FUTURO - Delantal */}
      <ProductLifestyle />
      
      {/* 6. CTA RECETARIO */}
      <FinalCTA />
    </>
  );
}
