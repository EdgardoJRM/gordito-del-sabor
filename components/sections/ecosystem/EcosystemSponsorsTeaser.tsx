import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { sponsorDeliverables } from '@/lib/sponsor-packages';

export default function EcosystemSponsorsTeaser() {
  return (
    <section className="section-spacing bg-[#1A1412] border-t border-[#2D2220]">
      <div className="container-custom max-w-4xl mx-auto text-center">
        <SectionHeader
          dark
          eyebrow="Para marcas"
          title="Patrocinios que se sienten en la mesa"
          subtitle="No somos “un reel más”. Integramos tu producto en recetas que la comunidad sí quiere cocinar, con reporte y claridad."
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left mb-10">
          {sponsorDeliverables.map((line) => (
            <li
              key={line}
              className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#FAF8F5]"
            >
              {line}
            </li>
          ))}
        </ul>
        <Button href="/patrocinadores" variant="primary">
          Quiero colaborar
        </Button>
      </div>
    </section>
  );
}
