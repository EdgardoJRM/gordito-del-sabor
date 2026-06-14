import Image from 'next/image';
import { ListChecks, Video } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

export default function EcosystemBovedaTeaser() {
  return (
    <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1 space-y-6">
            <SectionHeader
              align="left"
              eyebrow="Producto digital"
              title="La Bóveda del Sabor"
              subtitle="Recetas, videos, listas de compra y contenido premium en un solo lugar. Menos scroll infinito, más sazón en la mesa."
            />
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <Video className="text-[#C4472B] shrink-0 mt-1" size={22} aria-hidden />
                <span className="body-text text-[#1A1412]">
                  Videos paso a paso para cocinar sin adivinar.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <ListChecks className="text-[#C4472B] shrink-0 mt-1" size={22} aria-hidden />
                <span className="body-text text-[#1A1412]">
                  Listas de compra por receta: supermercado común, sin vueltas.
                </span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button href="/la-boveda">Ver La Bóveda</Button>
              <Button href="/recetas" variant="secondary">
                Explorar recetas gratis
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-[#E8E0D8] shadow-lg bg-[#1A1412]">
            <Image
              src="/Imagenes20recetas/chimichurri-ribeye-ai.jpg"
              alt="Recetas en La Bóveda — vista mockup"
              fill
              className="object-cover opacity-90"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1412]/80 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 text-[#FAF8F5] text-sm font-medium">
              Placeholder visual: sustituye por captura real del dashboard cuando exista.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
