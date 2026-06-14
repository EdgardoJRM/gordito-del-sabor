import type { Metadata } from 'next';
import EcosystemHero from '@/components/sections/ecosystem/EcosystemHero';
import EcosystemOfferStack from '@/components/sections/ecosystem/EcosystemOfferStack';
import EcosystemEmotional from '@/components/sections/ecosystem/EcosystemEmotional';
import EcosystemWhatYouGet from '@/components/sections/ecosystem/EcosystemWhatYouGet';
import EcosystemPresaleSteps from '@/components/sections/ecosystem/EcosystemPresaleSteps';
import EcosystemBovedaTeaser from '@/components/sections/ecosystem/EcosystemBovedaTeaser';
import EcosystemBookTeaser from '@/components/sections/ecosystem/EcosystemBookTeaser';
import CommunityStats from '@/components/sections/CommunityStats';
import EcosystemSponsorsTeaser from '@/components/sections/ecosystem/EcosystemSponsorsTeaser';
import EcosystemFaqShort from '@/components/sections/ecosystem/EcosystemFaqShort';
import EcosystemFinalCta from '@/components/sections/ecosystem/EcosystemFinalCta';

export const metadata: Metadata = {
  title: 'El Gordito del Sabor | Recetas, delantal y sazón boricua',
  description:
    'Únete a la comunidad del Gordito: preventa del delantal oficial, La Bóveda del Sabor, libro de recetas y patrocinios con propósito.',
  openGraph: {
    title: 'El Gordito del Sabor',
    description: 'Preventa del delantal, recetas boricuas y comunidad real.',
    type: 'website',
    locale: 'es_PR',
  },
};

export default function Home() {
  return (
    <>
      <EcosystemHero />
      <EcosystemOfferStack />
      <EcosystemEmotional />
      <EcosystemWhatYouGet />
      <EcosystemPresaleSteps />
      <EcosystemBovedaTeaser />
      <EcosystemBookTeaser />
      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom">
          <h2 className="heading-section text-[#1A1412] text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            Comunidad con cifras reales
          </h2>
          <CommunityStats />
          <p className="text-center text-sm text-[#9C8B80] mt-8 max-w-2xl mx-auto">
            Los números son editables en <code className="rounded bg-[#F2EDE6] px-1">lib/site-config.ts</code>.
            Confírmalos antes de campañas pagadas.
          </p>
        </div>
      </section>
      <EcosystemSponsorsTeaser />
      <EcosystemFaqShort />
      <EcosystemFinalCta />
    </>
  );
}
