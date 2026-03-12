import HeroPremium from '@/components/HeroPremium';
import EbookSection from '@/components/EbookSection';
import RecipesGrid from '@/components/RecipesGrid';
import GorditoSection from '@/components/GorditoSection';
import ProductLifestyle from '@/components/ProductLifestyle';
import FinalCTA from '@/components/FinalCTA';

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
