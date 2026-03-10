import HeroPremium from '@/components/HeroPremium';
import BrandSection from '@/components/BrandSection';
import ContentSection from '@/components/ContentSection';
import CommunitySection from '@/components/CommunitySection';
import ProductSection from '@/components/ProductSection';
import FeaturesSection from '@/components/FeaturesSection';
import FinalCTA from '@/components/FinalCTA';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      {/* Hero con animación del delantal */}
      <HeroPremium />
      
      {/* Brand storytelling */}
      <BrandSection />
      
      {/* Contenido / recetas */}
      <ContentSection />
      
      {/* Comunidad */}
      <CommunitySection />
      
      {/* Producto (delantal) */}
      <ProductSection />
      
      {/* Features */}
      <FeaturesSection />
      
      {/* Newsletter */}
      <Newsletter />
      
      {/* CTA final */}
      <FinalCTA />
    </>
  );
}
