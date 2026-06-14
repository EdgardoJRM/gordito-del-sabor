import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Users, Flame, GraduationCap } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import CommunityStats from '@/components/sections/CommunityStats';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Sobre nosotros | El Gordito del Sabor',
  description:
    'Historia de Ariel Leonardo Del Valle Matos, la comunidad del Gordito y la misión de llevar sazón boricua con respeto y claridad.',
};

const values = [
  {
    title: 'Sabor boricua',
    text: 'Recetas con identidad: de la casa, sin postureo.',
    Icon: Flame,
  },
  {
    title: 'Familia primero',
    text: 'La mesa es el lugar donde se arregla el día.',
    Icon: Heart,
  },
  {
    title: 'Comunidad',
    text: 'Cocinar es más fácil cuando no estás solo.',
    Icon: Users,
  },
  {
    title: 'Enseñar con corazón',
    text: 'Pasos claros para que te sientas capaz, no intimidado.',
    Icon: GraduationCap,
  },
];

const timeline = [
  { year: 'Inicio', text: 'Ariel empieza a compartir sazón real en redes, con humor y técnica.' },
  { year: 'Comunidad', text: 'La familia crece: recetas que la gente sí repite en casa.' },
  { year: 'Hoy', text: 'Ecosistema: recetas, ebook, delantal, Bóveda y colaboraciones con marcas.' },
];

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="border-b border-[#E8E0D8] bg-[#F2EDE6] py-8">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <p className="label-eyebrow text-[#6B5B4E] mb-3">Nuestra historia</p>
          <h1 className="heading-section text-[#1A1412] max-w-4xl mb-4">
            Se cocina con sazón, familia y comunidad
          </h1>
          <p className="body-text text-xl max-w-2xl">
            El Gordito del Sabor nació en el fogón, no en una corporación. Aquí el respeto es por el ingrediente y por
            la gente que cocina después del trabajo.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-[#E8E0D8] shadow-lg">
              <Image
                src="/images/ariel.webp"
                alt="Ariel Leonardo Del Valle Matos — El Gordito del Sabor"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1412]">Ariel Leonardo Del Valle Matos</h2>
              <p className="body-text text-lg">
                Soy Ariel. Cocino porque me gusta ver a la gente feliz con un plato honesto. Mi misión es simple:
                que tú prepares comida boricua con confianza, sin sentir que necesitas ser chef para que quede brutal.
              </p>
              <p className="body-text text-lg">
                En redes compartimos recetas, tips y ese “esto es bello” cuando algo sale como debe ser. En el sitio
                estamos construyendo el hogar digital: delantal, libro, La Bóveda y alianzas con marcas que respeten a
                la comunidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button href="/delantal">Ver preventa</Button>
                <Button href="/recetario" variant="secondary">
                  Recetario gratis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#1A1412] text-[#FAF8F5] border-t border-[#2D2220]">
        <div className="container-custom">
          <SectionHeader
            dark
            title="Valores"
            subtitle="Lo que no negociamos: autenticidad, claridad y respeto por tu tiempo en la cocina."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map(({ title, text, Icon }) => (
              <div
                key={title}
                className="rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <Icon className="text-[#E8D4BC] mb-4" size={28} aria-hidden />
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-[#C4B8AE] body-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl mx-auto">
          <SectionHeader title="Camino" subtitle="No es perfección. Es constancia con sabor." />
          <ol className="space-y-8">
            {timeline.map((t) => (
              <li key={t.year} className="flex gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C4472B] text-white text-xs font-bold text-center leading-tight px-1">
                  {t.year}
                </span>
                <p className="body-text text-lg text-[#1A1412] pt-2">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom">
          <h2 className="heading-section text-[#1A1412] text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            La comunidad en números
          </h2>
          <CommunityStats />
          <p className="text-center text-sm text-[#9C8B80] mt-8">
            Edita métricas en <code className="rounded bg-[#F2EDE6] px-1">lib/site-config.ts</code>.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#1A1412] border-t border-[#2D2220] text-center">
        <div className="container-custom max-w-2xl mx-auto space-y-6">
          <h2 className="heading-section text-[#FAF8F5] text-3xl md:text-4xl">Gracias por cocinar con nosotros</h2>
          <p className="body-text text-lg text-[#C4B8AE]">
            — {siteConfig.brandName}, {siteConfig.tagline}
          </p>
          <Button href="/preguntas" variant="ghost">
            Preguntas frecuentes
          </Button>
        </div>
      </section>
    </main>
  );
}
