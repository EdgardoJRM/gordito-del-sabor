import PapaCtaWithMicro from '@/components/papa-event/PapaCtaWithMicro';
import { papaCtaMicro, papaQuickOrder } from '@/lib/papa-event';

export default function PapaQuickOrderBand() {
  return (
    <section className="py-12 md:py-16 bg-[#1A1412]">
      <div className="container-custom max-w-3xl text-center">
        <p className="comfort-eyebrow text-[#E8D4BC] mb-3">{papaQuickOrder.priceHighlight}</p>
        <h2 className="heading-section-comfort text-[#FAF8F5] mb-4">{papaQuickOrder.title}</h2>
        <p className="text-xl text-[#E8D4BC] leading-relaxed mb-8">{papaQuickOrder.subtitle}</p>
        <PapaCtaWithMicro size="lg" className="shadow-xl" microTone="light" micro={papaCtaMicro.scarcity}>
          {papaQuickOrder.cta}
        </PapaCtaWithMicro>
      </div>
    </section>
  );
}
