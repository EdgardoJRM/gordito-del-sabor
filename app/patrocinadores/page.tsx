import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BarChart3, ChefHat, Mail } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import SponsorInquiryForm from '@/components/sponsors/SponsorInquiryForm';
import { siteConfig } from '@/lib/site-config';
import { sponsorMetricsDisplay, sponsorPackages, sponsorProcess } from '@/lib/sponsor-packages';

export const metadata: Metadata = {
  title: 'Patrocina recetas con El Gordito del Sabor',
  description:
    'Integra tu marca en recetas patrocinadas, reels, stories y campañas gastronómicas con comunidad real y reportes claros.',
};

export default function PatrocinadoresPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="bg-[#1A1412] text-[#FAF8F5] py-16 md:py-24 border-b border-[#2D2220]">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#C4B8AE] hover:text-[#FAF8F5] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <p className="label-eyebrow text-[#E8D4BC] mb-4">Media brand gastronómico</p>
          <h1 className="heading-section max-w-4xl mb-6">
            Integra tu marca en recetas que la comunidad sí quiere cocinar
          </h1>
          <p className="subheadline text-[#D4C9BC] max-w-2xl font-normal">
            Colabora con {siteConfig.brandName} y conecta con familias que cocinan, comparten y confían en nuestras
            recetas.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="#solicitud">Quiero colaborar</Button>
            <Button href="#paquetes" variant="ghost">
              Ver paquetes
            </Button>
          </div>
        </div>
      </section>

      <section className="section-spacing border-t border-[#E8E0D8]">
        <div className="container-custom">
          <SectionHeader
            title="Métricas (editables)"
            subtitle="Confirma cifras finales con tu equipo antes de cerrar deals. Los valores viven en `lib/site-config.ts` y `lib/sponsor-packages.ts`."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sponsorMetricsDisplay.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-[#E8E0D8] bg-[#F2EDE6] p-8 text-center shadow-sm"
              >
                <BarChart3 className="mx-auto text-[#C4472B] mb-4" size={28} aria-hidden />
                <p className="text-sm font-bold uppercase tracking-wider text-[#6B5B4E]">{m.label}</p>
                <p className="mt-3 text-3xl font-bold text-[#1A1412]">{m.value}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-dashed border-[#C4472B]/40 bg-[#FFF8F5] p-8 text-center sm:col-span-2 lg:col-span-3">
              <p className="body-text text-[#1A1412]">
                Audiencia: placeholder editable — {siteConfig.stats.audienceActiveNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="paquetes" className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8] scroll-mt-24">
        <div className="container-custom">
          <SectionHeader
            title="Paquetes de colaboración"
            subtitle="Precios “desde” para anclar. Ajusta según tu rate card real."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {sponsorPackages.map((pkg) => (
              <article
                key={pkg.id}
                className={`rounded-2xl md:rounded-3xl border p-8 md:p-10 bg-[#FAF8F5] shadow-sm ${
                  pkg.recommended ? 'ring-2 ring-[#C4472B]/30 border-[#C4472B]/40' : 'border-[#E8E0D8]'
                }`}
              >
                {pkg.recommended && (
                  <span className="inline-block rounded-full bg-[#C4472B] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-4">
                    Recomendado
                  </span>
                )}
                <h3 className="text-2xl font-bold text-[#1A1412]">{pkg.name}</h3>
                <p className="text-[#6B5B4E] mt-2">{pkg.tagline}</p>
                <p className="text-3xl font-bold text-[#1A1412] mt-6">{pkg.fromPrice}</p>
                <ul className="mt-8 space-y-3">
                  {pkg.includes.map((line) => (
                    <li key={line} className="flex gap-2 text-[#1A1412] body-text">
                      <ChefHat className="text-[#C4472B] shrink-0 mt-0.5" size={18} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Button href="#solicitud">Solicitar este paquete</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#1A1412] border-t border-[#2D2220] text-[#FAF8F5]">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="heading-section text-center mb-12 md:mb-16 text-3xl md:text-4xl text-[#FAF8F5]">
            Cómo trabajamos
          </h2>
          <ol className="space-y-6">
            {sponsorProcess.map((s) => (
              <li key={s.step} className="flex gap-4 items-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#C4472B] text-sm font-bold">
                  {s.step}
                </span>
                <div>
                  <p className="font-bold text-lg">{s.title}</p>
                  <p className="text-[#C4B8AE] mt-1">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="solicitud" className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8] scroll-mt-24">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Mail className="text-[#C4472B]" size={28} aria-hidden />
            <h2 className="heading-section text-[#1A1412] text-3xl md:text-4xl">Formulario</h2>
          </div>
          <SponsorInquiryForm />
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8] text-center">
        <div className="container-custom max-w-2xl mx-auto space-y-6">
          <h2 className="heading-section text-[#1A1412] text-3xl md:text-4xl">¿Listo para sazón con data?</h2>
          <p className="body-text text-lg">
            Si tu producto encaja en la cocina boricua, hablemos sin postureo. La comunidad lo nota cuando es real.
          </p>
          <Button href={`mailto:${siteConfig.email}`}>Escribir por email</Button>
        </div>
      </section>
    </main>
  );
}
