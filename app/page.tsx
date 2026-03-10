import HeroPremium from '@/components/HeroPremium';
import SaborSection from '@/components/SaborSection';
import RecipesGrid from '@/components/RecipesGrid';
import GorditoSection from '@/components/GorditoSection';
import CommunityGrid from '@/components/CommunityGrid';
import ProductLifestyle from '@/components/ProductLifestyle';
import VideosSection from '@/components/VideosSection';
import Newsletter from '@/components/Newsletter';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <>
      {/* Hero con animación del delantal */}
      <HeroPremium />
      
      {/* El sabor empieza aquí - Imagen grande + texto */}
      <SaborSection />
      
      {/* Grid de recetas 3x2 */}
      <RecipesGrid />
      
      {/* Sección del Gordito */}
      <GorditoSection />
      
      {/* Grid de comunidad tipo Instagram */}
      <CommunityGrid />
      
      {/* Productos lifestyle */}
      <ProductLifestyle />
      
      {/* Videos */}
      <VideosSection />
      
      {/* Newsletter */}
      <Newsletter />
      
      {/* CTA final con imagen de fondo */}
      <FinalCTA />
    </>
  );
}
