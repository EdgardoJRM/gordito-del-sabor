import Image from 'next/image';
import Button from '@/components/ui/Button';

const BG = `/Imagenes20recetas/${encodeURIComponent('Perinal al caldero al estilo boricua.jpeg')}`;

export default function EcosystemFinalCta() {
  return (
    <section className="relative section-spacing flex items-center justify-center bg-[#1A1412] min-h-[360px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={BG}
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-[#1A1412]/80 to-[#1A1412]/55" />
      </div>
      <div className="container-custom relative z-10 text-center max-w-3xl mx-auto space-y-8">
        <h2 className="heading-section text-[#FAF8F5] text-3xl md:text-5xl">
          ¿Listo para cocinar con nosotros?
        </h2>
        <p className="body-text text-lg text-[#C4B8AE]">
          Entra por el delantal, por La Bóveda o por el recetario gratis. Lo importante es que cocines con sazón de verdad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/delantal-el-gordito">Ordenar delantal</Button>
          <Button href="/recetario" variant="ghost">
            Recetario gratis
          </Button>
        </div>
      </div>
    </section>
  );
}
