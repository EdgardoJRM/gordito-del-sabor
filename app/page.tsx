import HeroPremium from '@/components/HeroPremium';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';
import About from '@/components/About';

export default function Home() {
  return (
    <>
      {/* Hero con animación - 800vh de altura */}
      <HeroPremium />
      
      {/* Resto de secciones - comienzan después del hero */}
      <FeaturedRecipes />
      <Categories />
      <About />
      <Newsletter />
    </>
  );
}
