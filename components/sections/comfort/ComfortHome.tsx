import Image from 'next/image';
import Link from 'next/link';
import { Gift, MapPin, ShieldCheck, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import { papaEvent, papaHero, papaTeamPhotos } from '@/lib/papa-event';
import { siteConfig } from '@/lib/site-config';

const whyItems = [
  {
    icon: Gift,
    title: 'Regalo con su nombre',
    text: 'Bordamos el nombre o apodo de papá. Máximo 15 letras. Simple y personal.',
  },
  {
    icon: ShieldCheck,
    title: 'Calidad que dura',
    text: 'Tela resistente para la cocina de verdad. Hecho para usarse, no para guardarse.',
  },
  {
    icon: MapPin,
    title: 'Recogida garantizada',
    text: `Recoge en ${papaEvent.pickupLocation} el ${papaEvent.pickupFriday} o ${papaEvent.pickupSaturday}. Listo antes del Domingo.`,
  },
  {
    icon: Heart,
    title: 'De nuestra familia a la tuya',
    text: `${siteConfig.stats.instagram} en redes confían en nuestro sabor.`,
  },
];

const steps = [
  { n: 1, title: 'Elige tu oferta', text: 'Premium, VIP o Legado — según el regalo que quieras darle.' },
  { n: 2, title: 'Asegura tu delantal', text: 'Completas bordado, entrega y datos en el siguiente paso.' },
  { n: 3, title: 'Nosotros bordamos', text: 'A mano en 24–48 horas. Hecho en Puerto Rico.' },
  { n: 4, title: 'Tú recibes', text: `Recogida en Área Metro o envío por correo.` },
];

export function ComfortHomeHero() {
  return (
    <section
      id="site-hero"
      className="relative -mt-[4.5rem] pt-[4.5rem] min-h-[90svh] flex items-center bg-[#1A1412] overflow-hidden"
    >
      <Image
        src={papaTeamPhotos.hero}
        alt="El Gordito del Sabor — El Sabor de Papá"
        fill
        priority
        className="object-cover object-center opacity-70"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1412]/90 via-[#1A1412]/70 to-[#1A1412]/40" />
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="comfort-eyebrow text-[#E8D4BC] mb-4">{papaHero.eyebrow}</p>
          <h1 className="heading-hero text-[#FAF8F5] mb-6 break-words">{papaHero.headline}</h1>
          <p className="text-xl md:text-2xl text-[#E8D4BC] leading-relaxed mb-8 max-w-xl">
            {papaHero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/el-sabor-de-papa#ordenar" size="lg" className="shadow-xl w-full sm:w-auto">
              {papaHero.cta}
            </Button>
            <Button href="/preguntas" variant="ghost" size="lg" className="w-full sm:w-auto">
              Tengo una pregunta
            </Button>
          </div>
          <p className="mt-6 text-lg text-[#C4B8AE]">{papaEvent.socialProof}</p>
        </div>
      </div>
    </section>
  );
}

export function ComfortHomeWhy() {
  return (
    <section className="section-spacing-comfort bg-[#FAF8F5]">
      <div className="container-custom">
        <h2 className="heading-section-comfort text-[#1A1412] text-center mb-4">
          ¿Por qué regalar este delantal?
        </h2>
        <p className="body-text text-lg text-center max-w-2xl mx-auto mb-12">
          No es merch cualquiera. Es reconocimiento al sazón de papá, con el sello de El Gordito del
          Sabor.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border-2 border-[#E8E0D8] bg-white p-8 flex gap-5"
              >
                <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-[#C4472B]/10 text-[#C4472B]">
                  <Icon size={28} aria-hidden />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1412] mb-2">{item.title}</h3>
                  <p className="body-text text-lg">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="text-center text-base text-[#6B5B4E] mt-8 max-w-xl mx-auto">
          Si eliges envío por correo, puede llegar después del Domingo. Para garantía a tiempo, elige
          recogida.
        </p>
      </div>
    </section>
  );
}

export function ComfortHomeHow() {
  return (
    <section className="section-spacing-comfort bg-[#F2EDE6] border-y border-[#E8E0D8]">
      <div className="container-custom max-w-3xl">
        <h2 className="heading-section-comfort text-[#1A1412] text-center mb-12">
          Cómo ordenar (en 4 pasos)
        </h2>
        <ol className="space-y-6">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex gap-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E0D8] p-6 md:p-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C4472B] text-white text-xl font-bold">
                {step.n}
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#1A1412] mb-1">{step.title}</h3>
                <p className="body-text text-lg">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="text-center mt-12">
          <Button href="/el-sabor-de-papa#ordenar" size="lg">
            Asegura tu delantal
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ComfortHomeTrust() {
  return (
    <section className="section-spacing-comfort bg-[#1A1412] text-center">
      <div className="container-custom max-w-2xl space-y-8">
        <h2 className="heading-section-comfort text-[#FAF8F5]">
          Estamos aquí si necesitas ayuda
        </h2>
        <p className="text-xl text-[#C4B8AE] leading-relaxed">
          Si prefieres hablar con alguien antes de ordenar, escríbenos. Te respondemos con claridad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={`mailto:${siteConfig.email}`} size="lg" variant="primary">
            Escribir por email
          </Button>
          <Button href="/preguntas" size="lg" variant="ghost">
            Ver preguntas frecuentes
          </Button>
        </div>
        <p className="text-base text-[#9C8B80]">
          También puedes explorar{' '}
          <Link href="/recetas" className="text-[#E8D4BC] underline">
            nuestras recetas
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
