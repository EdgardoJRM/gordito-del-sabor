'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Gift,
  Lock,
  Sparkles,
  Users,
} from 'lucide-react';
import EbookDownloadForm from '@/components/ebook/EbookDownloadForm';

const FUNNEL_ID = 'recetario-brunson-v1';
const STEP_IDS = ['hook', 'story', 'stack', 'optin'] as const;

type StepId = (typeof STEP_IDS)[number];

function emitFunnelEvent(
  name: 'funnel_started' | 'step_viewed' | 'step_completed' | 'funnel_completed',
  detail: { stepId?: StepId; stepIndex?: number }
) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('site:funnel', {
      detail: { funnelId: FUNNEL_ID, name, ...detail },
    })
  );
}

const VALUE_STACK = [
  {
    label: '20 recetas boricuas paso a paso',
    value: '$47',
  },
  {
    label: 'Lista de ingredientes sin vueltas (supermercado común)',
    value: '$19',
  },
  {
    label: 'Tiempos reales: desde 20 min hasta lo que tome de verdad',
    value: '$15',
  },
  {
    label: 'PDF para celular, tablet o imprimir en casa',
    value: '$12',
  },
];

export default function RecetarioFunnel() {
  const [stepIndex, setStepIndex] = useState(0);
  const started = useRef(false);
  const optinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      emitFunnelEvent('funnel_started', {});
    }
  }, []);

  useEffect(() => {
    const stepId = STEP_IDS[stepIndex];
    emitFunnelEvent('step_viewed', { stepId, stepIndex });
  }, [stepIndex]);

  const goNext = useCallback(() => {
    const from = STEP_IDS[stepIndex];
    emitFunnelEvent('step_completed', { stepId: from, stepIndex });
    setStepIndex((i) => {
      const next = Math.min(i + 1, STEP_IDS.length - 1);
      if (next === STEP_IDS.length - 1) {
        setTimeout(() => {
          optinRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
      return next;
    });
  }, [stepIndex]);

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const progress = ((stepIndex + 1) / STEP_IDS.length) * 100;

  return (
    <div className="relative">
      {/* Sticky progress — estilo funnel */}
      <div className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8E0D8]">
        <div className="container-custom max-w-3xl py-3">
          <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider text-[#9C8B80]">
            <span>Paso {stepIndex + 1} de {STEP_IDS.length}</span>
            <span className="hidden sm:inline">Recetario gratis</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-[#E8E0D8] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#C4472B] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={stepIndex + 1}
              aria-valuemin={1}
              aria-valuemax={STEP_IDS.length}
            />
          </div>
        </div>
      </div>

      <div className="min-h-[70vh]">
        {/* —— STEP 1: Hook (atención + promesa específica) —— */}
        {stepIndex === 0 && (
          <section className="section-spacing bg-gradient-to-b from-[#F2EDE6] to-[#FAF8F5] border-b border-[#E8E0D8]">
            <div className="container-custom max-w-3xl mx-auto text-center space-y-8 px-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4472B]">
                Gratis hoy · PDF instantáneo
              </p>
              <h1 className="heading-hero text-[#1A1412] leading-tight">
                Las 20 recetas que la comunidad del Gordito pide una y otra vez
              </h1>
              <p className="subheadline text-xl md:text-2xl max-w-2xl mx-auto">
                Sin complicarte. Con ingredientes de verdad. Para que en tu casa se huela sazón boricua — aunque no hayas nacido frente al fogón.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#6B5B4E] py-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E8E0D8] bg-white px-4 py-2 shadow-sm">
                  <Users size={16} className="text-[#C4472B]" />
                  Más de 160,000 personas cocinan con el Gordito
                </span>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={goNext}
                  className="btn-text inline-flex items-center justify-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 px-10 md:px-14 rounded-full transition-all transform hover:scale-[1.02] shadow-lg w-full sm:w-auto"
                >
                  Sí, quiero ver cómo funciona
                  <ArrowRight size={22} />
                </button>
              </div>
              <p className="text-xs text-[#9C8B80] max-w-md mx-auto">
                Siguiente: por qué esto te ahorra tiempo y frustración en la cocina.
              </p>
            </div>
          </section>
        )}

        {/* —— STEP 2: Historia / problema–agitación (Brunson: “¿Te suena?”) —— */}
        {stepIndex === 1 && (
          <section className="section-spacing bg-[#FAF8F5] border-b border-[#E8E0D8]">
            <div className="container-custom max-w-3xl mx-auto px-4 space-y-10">
              <div className="text-center space-y-4">
                <Sparkles className="mx-auto text-[#C4472B]" size={36} />
                <h2 className="heading-section text-[#1A1412] text-center">
                  ¿Te pasa esto en la cocina?
                </h2>
                <p className="body-text text-lg text-left">
                  Ves un plato rico en redes, lo intentas… y no queda igual. O compras cosas raras que solo usas una vez.
                  No es que no sepas cocinar: es que faltan recetas probadas, con pasos claros y medidas que sí funcionan en casa.
                </p>
              </div>
              <ul className="space-y-4 rounded-2xl border border-[#E8E0D8] bg-white p-6 md:p-8 shadow-sm">
                {[
                  'Recetas que “se ven fáciles” pero no te dicen el truco del sofrito o el punto del arroz.',
                  'Listas de ingredientes larguísimas para un solo plato del diario.',
                  'Ganas de comer como en Puerto Rico… sin estar pegada/o al teléfono buscando otro video.',
                ].map((line) => (
                  <li key={line} className="flex gap-3 body-text text-[#1A1412]">
                    <span className="text-[#C4472B] font-bold">·</span>
                    {line}
                  </li>
                ))}
              </ul>
              <p className="body-text text-lg text-center font-medium text-[#1A1412]">
                Este recetario es lo contrario: 20 favoritas del Gordito, elegidas por la comunidad, listas para ejecutar.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E0D8] bg-white px-6 py-4 text-sm font-bold text-[#6B5B4E] hover:bg-[#F2EDE6]"
                >
                  <ChevronLeft size={18} />
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="btn-text inline-flex flex-1 items-center justify-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 px-8 rounded-full"
                >
                  Siguiente: qué llevas gratis
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* —— STEP 3: Value stack (Brunson: “total value” vs GRATIS) —— */}
        {stepIndex === 2 && (
          <section className="section-spacing bg-[#F2EDE6] border-b border-[#E8E0D8]">
            <div className="container-custom max-w-2xl mx-auto px-4 space-y-10">
              <div className="text-center space-y-3">
                <Gift className="mx-auto text-[#C4472B]" size={40} />
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A1412]">
                  Esto es lo que llevas hoy
                </h2>
                <p className="body-text">Un solo PDF. Todo junto. Sin pagar nada.</p>
              </div>

              <div className="rounded-3xl border-2 border-[#C4472B]/30 bg-[#FAF8F5] p-6 md:p-10 shadow-sm space-y-4">
                {VALUE_STACK.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E8E0D8] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="body-text text-[#1A1412] font-medium flex items-start gap-2">
                      <Check size={20} className="text-[#C4472B] flex-shrink-0 mt-0.5" />
                      {row.label}
                    </span>
                    <span className="text-sm text-[#9C8B80] sm:text-right">
                      <span className="line-through">{row.value}</span>
                    </span>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-dashed border-[#C4472B]/40">
                  <span className="text-lg font-bold text-[#1A1412]">Valor total aproximado</span>
                  <span className="text-xl line-through text-[#9C8B80]">$93+</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-[#1A1412] px-6 py-4 text-[#FAF8F5]">
                  <span className="font-bold uppercase tracking-wide text-sm">Tu inversión</span>
                  <span className="text-2xl font-bold text-[#FAF8F5]">$0</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E8E0D8] bg-white p-6 flex gap-4 shadow-sm">
                <Lock className="text-[#C4472B] flex-shrink-0" size={28} />
                <div>
                  <p className="font-bold text-[#1A1412] mb-1">Garantía simple</p>
                  <p className="body-text text-sm">
                    Te mandamos el PDF al email que nos dejes. Si no llega, revisa spam o escríbenos a info@gorditodelsabor.com y lo resolvemos.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E0D8] bg-white px-6 py-4 text-sm font-bold text-[#6B5B4E] hover:bg-[#FAF8F5]"
                >
                  <ChevronLeft size={18} />
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="btn-text inline-flex flex-1 items-center justify-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 px-8 rounded-full"
                >
                  Quiero el recetario gratis
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* —— STEP 4: Opt-in (único lugar del formulario — conversión) —— */}
        {stepIndex === 3 && (
          <section
            id="recetario-optin"
            ref={optinRef}
            className="section-spacing bg-[#FAF8F5] border-b border-[#E8E0D8]"
          >
            <div className="container-custom max-w-xl mx-auto px-4 space-y-8">
              <div className="text-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4472B]">
                  Último paso
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A1412]">
                  ¿A qué email te enviamos el PDF?
                </h2>
                <p className="body-text">
                  Enviaremos &quot;Las 20 Recetas Favoritas del Sabor&quot; a tu bandeja. Revisa spam si no lo ves en minutos.
                </p>
              </div>

              <div className="rounded-3xl border border-[#E8E0D8] bg-white p-6 md:p-10 shadow-sm">
                <EbookDownloadForm
                  onConversion={() =>
                    emitFunnelEvent('funnel_completed', { stepId: 'optin', stepIndex: 3 })
                  }
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#6B5B4E] hover:text-[#1A1412]"
                >
                  <ChevronLeft size={18} />
                  Volver al paso anterior
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
