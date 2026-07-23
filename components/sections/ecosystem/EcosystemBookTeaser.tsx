import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

export default function EcosystemBookTeaser() {
  return (
    <section className="section-spacing bg-[#FAF8F5] hairline-t">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative mx-auto w-full max-w-md aspect-[3/4] rounded-lg border border-border-subtle bg-[#F2EDE6] shadow-xl overflow-hidden">
            <Image
              src="/ebooks/recetario-portada-pr.jpg"
              alt="Las 20 Recetas Favoritas del Sabor — portada"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 400px"
            />
          </div>
          <div>
            <SectionHeader
              align="left"
              eyebrow="Sabores que nos unen"
              title="Las 20 Recetas Favoritas del Sabor"
              subtitle="El mismo corazón del recetario gratis, elevado a oferta cuando quieras venderlo con bonos, bundle o campaña. También puedes seguir regalando el PDF en /recetario."
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button href="/las-20-recetas-favoritas">Ver página del libro</Button>
              <Button href="/recetario" variant="secondary">
                Descargar gratis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
