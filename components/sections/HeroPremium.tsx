import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const CHEF_IMAGE =
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80';

export default function HeroPremium() {
  return (
    <section
      id="site-hero"
      className="relative -mt-[4.5rem] pt-[4.5rem] min-h-[100svh] flex flex-col justify-center bg-[#1A1412] overflow-hidden"
    >
      <div className="container-custom relative z-10 flex-1 flex items-center py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Mobile: chef arriba (estilo Alex Guarnaschelli) */}
          <div className="lg:hidden order-1 w-full max-w-sm mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={CHEF_IMAGE}
                alt="El Gordito del Sabor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 85vw, 0px"
                priority
              />
            </div>
          </div>

          {/* Copy + CTAs */}
          <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            <p className="text-[#E8D4BC] text-xs md:text-sm tracking-[0.28em] uppercase mb-4">
              Recetas boricuas auténticas
            </p>
            <h1 className="heading-hero text-[#FAF8F5] mb-4">
              EL GORDITO
              <br />
              DEL SABOR
            </h1>
            <p className="subheadline text-[#D4C9BC] max-w-xl mx-auto lg:mx-0 mb-8">
              Recetas boricuas con sazón de verdad.
            </p>

            {/* Social proof — avatar solo desktop (en móvil ya hay foto grande arriba) */}
            <div className="hidden md:flex items-center justify-center lg:justify-start gap-4 mb-10">
              <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-[#FAF8F5]/25 shadow-lg shrink-0">
                <Image
                  src={CHEF_IMAGE}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="text-left">
                <p className="text-[#FAF8F5] font-bold text-sm md:text-base">160K+ seguidores</p>
                <p className="text-[#9C8B80] text-xs md:text-sm">Sazón real en redes</p>
              </div>
            </div>
            <p className="md:hidden text-[#9C8B80] text-sm mb-10">
              <span className="text-[#FAF8F5] font-bold">160K+ seguidores</span>
              {' · '}
              Sazón real en redes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/recetario"
                className="btn-text inline-flex items-center justify-center bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 px-10 rounded-full transition-colors shadow-lg"
              >
                Descargar Recetario Gratis
              </Link>
              <Link
                href="/recetas"
                className="btn-text inline-flex items-center justify-center border-2 border-[#FAF8F5] text-[#FAF8F5] py-4 px-10 rounded-full hover:bg-[#FAF8F5] hover:text-[#1A1412] transition-colors"
              >
                Ver Recetas
              </Link>
            </div>
          </div>

          {/* Food image — solo desktop (columna derecha) */}
          <div className="hidden lg:block lg:col-span-5 lg:order-2 w-full max-w-none">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/images/ariel.webp"
                alt="Plato boricua — El Gordito del Sabor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-10 flex flex-col items-center gap-2">
        <span className="text-[#FAF8F5]/50 text-xs tracking-[0.2em] uppercase">Explorar</span>
        <ChevronDown className="text-[#FAF8F5]/40 animate-bounce" size={22} aria-hidden />
      </div>
    </section>
  );
}
