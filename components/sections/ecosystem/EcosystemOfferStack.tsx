import SectionHeader from '@/components/ui/SectionHeader';
import PricingCard from '@/components/ui/PricingCard';
import { offers } from '@/lib/offers';

export default function EcosystemOfferStack() {
  return (
    <section className="section-spacing bg-[#FAF8F5] hairline-t">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Preventa oficial"
          title="Elige cómo entras al lanzamiento"
          subtitle="Dos formas de apoyar la primera producción. La Edición Fundadores trae más valor si quieres La Bóveda desde el día uno."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          <PricingCard offer={offers.delantal} />
          <PricingCard offer={offers.fundadores} />
        </div>
      </div>
    </section>
  );
}
