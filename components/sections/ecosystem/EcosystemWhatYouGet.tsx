import { BookOpen, Gift, Percent, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import FeatureCard from '@/components/ui/FeatureCard';

export default function EcosystemWhatYouGet() {
  return (
    <section className="section-spacing bg-[#1A1412] border-t border-[#2D2220]">
      <div className="container-custom">
        <SectionHeader
          dark
          eyebrow="Desde hoy"
          title="Lo que recibes desde hoy"
          subtitle="Aunque el delantal venga por ronda, tú no te quedas con las manos vacías."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FeatureCard dark icon={BookOpen} title="Ebook digital de cortesía">
            Recetas, historias y consejos para cocinar con confianza mientras tu pieza oficial se produce con calidad.
          </FeatureCard>
          <FeatureCard dark icon={Sparkles} title="Delantal oficial">
            Diseño exclusivo. Representa a la comunidad que dice “esto es bello” cuando el plato queda bien.
          </FeatureCard>
          <FeatureCard dark icon={Gift} title="Acceso fundador (Edición Fundadores)">
            La Bóveda del Sabor: recetas organizadas, listas y contenido premium para no perderte en el scroll.
          </FeatureCard>
          <FeatureCard dark icon={Percent} title="10% en tu próxima orden">
            Cupón para la siguiente compra oficial. Recurrencia con respeto, no con presión.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
