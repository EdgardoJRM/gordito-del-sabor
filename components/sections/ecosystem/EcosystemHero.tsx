import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';

export default function EcosystemHero() {
  return (
    <section
      id="site-hero"
      className="relative -mt-[4.5rem] pt-[4.5rem] min-h-[100svh] flex flex-col justify-center bg-[#1A1412] overflow-hidden"
    >
      <div className="container-custom relative z-10 flex-1 flex items-center py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          <div className="lg:hidden order-1 w-full max-w-sm mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/images/ariel.webp"
                alt="Ariel — El Gordito del Sabor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 85vw, 0px"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            <p className="label-eyebrow text-[#E8D4BC] mb-4">
              Somos familia. Somos sabor. Somos Puerto Rico.
            </p>
            <h1 className="mb-4">
              <span className="heading-hero block text-[#FAF8F5] leading-[0.95]">
                La primera pieza oficial
              </span>
              <span className="heading-hero-light block text-[#E8D4BC] leading-[0.95]">
                de la comunidad
              </span>
            </h1>
            <p className="subheadline text-[#D4C9BC] max-w-xl mx-auto lg:mx-0 mb-6 font-normal">
              Más que un delantal: es pertenencia. Sazón, familia y cultura en cada receta. Edición
              Edición limitada — stock de 100 unidades.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">
                Preventa {siteConfig.presale.badgeDays} días
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">
                Ebook inmediato
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">
                10% próxima orden
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button href="/delantal-el-gordito" variant="primary" className="shadow-xl">
                Quiero mi delantal
              </Button>
              <Button href="/delantal-el-gordito" variant="ghost">
                Ver Edición Fundadores
              </Button>
            </div>
            <p className="mt-6 text-sm text-[#9C8B80] max-w-md mx-auto lg:mx-0">
              ¿Solo quieres recetas primero?{' '}
              <Link href="/recetario" className="text-[#E8D4BC] underline underline-offset-4 hover:text-white">
                Baja el recetario gratis
              </Link>
              .
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-5 lg:order-2 w-full max-w-none">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/images/ariel.webp"
                alt="El Gordito del Sabor — cocina boricua"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-10 flex flex-col items-center gap-2">
        <span className="text-[#FAF8F5]/50 text-xs tracking-[0.2em] uppercase">Explorar</span>
        <ChevronDown className="text-[#FAF8F5]/40 animate-bounce" size={22} aria-hidden />
      </div>
    </section>
  );
}
