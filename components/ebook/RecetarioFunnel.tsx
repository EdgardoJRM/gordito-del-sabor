'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowDown, Check, Gift, Lock, Users } from 'lucide-react';
import EbookDownloadForm from '@/components/ebook/EbookDownloadForm';
import { CONTACT_EMAIL } from '@/lib/contact-email';

const FUNNEL_ID = 'recetario-scroll-v1';

/** IDs de sección para analytics (scroll único, sin wizard) */
const SECTION_IDS = ['hero', 'gallery', 'story', 'stack', 'optin'] as const;
type SectionId = (typeof SECTION_IDS)[number];

function emitFunnelEvent(
  name: 'funnel_started' | 'step_viewed' | 'step_completed' | 'funnel_completed',
  detail: { stepId?: SectionId; stepIndex?: number }
) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('site:funnel', {
      detail: { funnelId: FUNNEL_ID, name, ...detail },
    })
  );
}

function recipeImageSrc(fileName: string) {
  return `/Imagenes20recetas/${encodeURIComponent(fileName)}`;
}

const VALUE_STACK = [
  { label: '20 recetas boricuas paso a paso', value: '$47' },
  { label: 'Lista de ingredientes sin vueltas (supermercado común)', value: '$19' },
  { label: 'Tiempos reales: desde 20 min hasta lo que tome de verdad', value: '$15' },
  { label: 'PDF para celular, tablet o imprimir en casa', value: '$12' },
];

const GALLERY_RECIPES: { file: string; label: string }[] = [
  { file: 'Hamburger de Churrasco.jpeg', label: 'Hamburger de Churrasco' },
  { file: 'Biftec Encebollado a Mi Estilo.jpeg', label: 'Biftec encebollado' },
  { file: 'Pork Belly.jpeg', label: 'Pork belly' },
  { file: 'Tacada a Mi Estilo.jpeg', label: 'Tacada' },
  { file: 'Coquito de cafe.jpeg', label: 'Coquito de café' },
  { file: 'Churrasco Relleno Enrollad.jpeg', label: 'Churrasco enrollado' },
];

const PROBLEM_BULLETS = [
  'Ves un plato rico en redes, lo intentas… y no queda igual.',
  'Compras cosas raras que solo usas una vez.',
  'Ganas de comer como en Puerto Rico sin estar pegada/o a otro video.',
];

const HERO_IMAGE = 'Perinal al caldero al estilo boricua.jpeg';

export default function RecetarioFunnel() {
  const started = useRef(false);
  const seenSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      emitFunnelEvent('funnel_started', {});
      emitFunnelEvent('step_viewed', { stepId: 'hero', stepIndex: 0 });
      seenSections.current.add('hero');
    }
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-funnel-section]');
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('data-funnel-section');
          if (!id || seenSections.current.has(id)) return;
          seenSections.current.add(id);
          const idx = SECTION_IDS.indexOf(id as SectionId);
          emitFunnelEvent('step_viewed', {
            stepId: id as SectionId,
            stepIndex: idx >= 0 ? idx : undefined,
          });
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* —— Hero —— */}
      <section
        data-funnel-section="hero"
        className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <Image
          src={recipeImageSrc(HERO_IMAGE)}
          alt="Pernil al caldero estilo boricua"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/95 via-[#1A1412]/75 to-[#1A1412]/55" aria-hidden />

        <div className="relative z-10 container-custom max-w-4xl mx-auto px-4 py-16 md:py-24 text-center space-y-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8D4BC]">
            Gratis · PDF al instante
          </p>
          <h1 className="heading-hero text-[#FAF8F5] leading-[1.08] drop-shadow-sm">
            Las 20 recetas que la comunidad del Gordito pide una y otra vez
          </h1>
          <p className="subheadline text-lg md:text-2xl text-[#FAF4EE] max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
            Sin complicarte. Con ingredientes de verdad. Para que en tu casa se huela sazón boricua — aunque no hayas nacido frente al fogón.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm text-[#FAF8F5]">
              <Users size={18} className="text-[#E8D4BC] shrink-0" aria-hidden />
              Más de 160,000 personas cocinan con el Gordito
            </span>
          </div>
          <div className="pt-4">
            <a
              href="#recetario-optin"
              className="btn-text inline-flex items-center justify-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 px-10 md:px-14 rounded-full transition-all shadow-xl hover:scale-[1.02] w-full sm:w-auto font-bold text-lg"
            >
              Quiero el recetario gratis
              <ArrowDown size={22} className="animate-bounce" aria-hidden />
            </a>
          </div>
          <p className="text-sm text-[#C4B8AE] max-w-md mx-auto">
            Abajo ves un adelanto de lo que viene en el PDF. El formulario está al final de la página.
          </p>
        </div>
      </section>

      {/* —— Galería de recetas reales —— */}
      <section
        data-funnel-section="gallery"
        className="section-spacing bg-[#FAF8F5] border-b border-[#E8E0D8]"
      >
        <div className="container-custom max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
            <h2 className="heading-section text-[#1A1412] text-3xl md:text-4xl">
              Un adelanto de lo que cocinas con nosotros
            </h2>
            <p className="body-text text-lg text-[#6B5B4E]">
              Fotos reales de las recetas del recetario. Nada de stock genérico: esto es lo que tú vas a preparar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {GALLERY_RECIPES.map(({ file, label }) => (
              <article
                key={file}
                className="group relative overflow-hidden rounded-2xl border border-[#E8E0D8] bg-[#F2EDE6] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={recipeImageSrc(file)}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/85 via-transparent to-transparent" />
                  <p className="absolute bottom-0 left-0 right-0 p-4 text-[#FAF8F5] font-bold text-base md:text-lg leading-snug">
                    {label}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center mt-10 text-[#6B5B4E] font-medium">
            Y <span className="text-[#C4472B] font-bold">14 recetas más</span> dentro del PDF — mismas fotos y pasos claros.
          </p>
        </div>
      </section>

      {/* —— Historia / problema —— */}
      <section
        data-funnel-section="story"
        className="section-spacing bg-gradient-to-b from-[#F2EDE6] to-[#FAF8F5] border-b border-[#E8E0D8]"
      >
        <div className="container-custom max-w-2xl mx-auto px-4 space-y-10 text-center">
          <h2 className="heading-section text-[#1A1412] text-3xl md:text-4xl">
            ¿Te pasa esto en la cocina?
          </h2>
          <ul className="text-left space-y-4 rounded-2xl border border-[#E8E0D8] bg-white p-6 md:p-8 shadow-sm">
            {PROBLEM_BULLETS.map((line) => (
              <li key={line} className="flex gap-3 body-text text-[#1A1412]">
                <span className="text-[#C4472B] font-bold shrink-0">·</span>
                {line}
              </li>
            ))}
          </ul>
          <p className="body-text text-lg md:text-xl text-[#1A1412] font-medium leading-relaxed">
            Este recetario es lo contrario:{' '}
            <span className="text-[#C4472B]">20 favoritas del Gordito</span>, con la comunidad probándolas antes que tú.
            Pasos claros, medidas que funcionan en casa — sin humo.
          </p>
        </div>
      </section>

      {/* —— Value stack —— */}
      <section
        data-funnel-section="stack"
        className="section-spacing bg-[#1A1412] text-[#FAF8F5] border-b border-[#E8E0D8]"
      >
        <div className="container-custom max-w-2xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-3">
            <Gift className="mx-auto text-[#E8D4BC]" size={40} aria-hidden />
            <h2 className="text-3xl md:text-4xl font-bold">Esto es lo que llevas hoy</h2>
            <p className="text-[#C4B8AE] text-lg">Un solo PDF. Todo junto. Sin pagar nada.</p>
          </div>

          <div className="rounded-3xl border border-[#C4472B]/40 bg-[#2a211d] p-6 md:p-10 space-y-4 shadow-xl">
            {VALUE_STACK.map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4 last:border-0 last:pb-0"
              >
                <span className="flex items-start gap-2 font-medium text-[#FAF8F5]">
                  <Check size={20} className="text-[#C4472B] shrink-0 mt-0.5" aria-hidden />
                  {row.label}
                </span>
                <span className="text-sm text-[#9C8B80] sm:text-right">
                  <span className="line-through">{row.value}</span>
                </span>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-dashed border-[#C4472B]/50">
              <span className="text-lg font-bold">Valor aproximado</span>
              <span className="text-xl line-through text-[#9C8B80]">$93+</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-[#C4472B] px-6 py-4">
              <span className="font-bold uppercase tracking-wide text-sm">Tu inversión</span>
              <span className="text-2xl font-bold">$0</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#2a211d] p-6 flex gap-4">
            <Lock className="text-[#E8D4BC] shrink-0" size={28} aria-hidden />
            <div>
              <p className="font-bold text-[#FAF8F5] mb-1">Garantía simple</p>
              <p className="text-sm text-[#C4B8AE] leading-relaxed">
                Te mandamos el PDF al email que nos dejes. Si no llega, revisa spam o escríbenos a {CONTACT_EMAIL} y lo resolvemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* —— Opt-in —— */}
      <section
        id="recetario-optin"
        data-funnel-section="optin"
        className="section-spacing bg-[#FAF8F5] border-b border-[#E8E0D8]"
      >
        <div className="container-custom max-w-xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4472B]">Último paso</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1412]">
              ¿A qué email te enviamos el PDF?
            </h2>
            <p className="body-text text-[#6B5B4E]">
              &quot;Las 20 Recetas Favoritas Del Sabor&quot; — revisa spam si no lo ves en unos minutos.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8E0D8] bg-white p-6 md:p-10 shadow-sm">
            <EbookDownloadForm
              onConversion={() =>
                emitFunnelEvent('funnel_completed', { stepId: 'optin', stepIndex: 4 })
              }
            />
          </div>

          <p className="text-xs text-center text-[#9C8B80]">
            Al enviar, aceptas recibir el recetario y mensajes ocasionales del Gordito. Puedes darte de baja cuando quieras.
          </p>
        </div>
      </section>
    </div>
  );
}
