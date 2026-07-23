import SectionHeader from '@/components/ui/SectionHeader';
import { siteConfig } from '@/lib/site-config';

const steps = [
  {
    n: '1',
    title: 'Ordena hoy',
    text: 'Elige Delantal o Edición Fundadores y completa el checkout (cuando conectes la URL real).',
  },
  {
    n: '2',
    title: 'Ebook al momento',
    text: 'Recibes el PDF y el mensaje de bienvenida por email según tu flujo de pago.',
  },
  {
    n: '3',
    title: `Tu delantal en ~${siteConfig.presale.deliveryWeeksApprox} semanas`,
    text: 'Producción por ronda, con calidad. La espera es parte del lanzamiento, no un castigo.',
  },
];

export default function EcosystemPresaleSteps() {
  return (
    <section className="section-spacing bg-[#FAF8F5] hairline-t">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Transparencia"
          title="Cómo funciona la preventa"
          subtitle="Sin letra pequeña escondida. Si apoyas el lanzamiento, te lo decimos claro y te damos valor desde ya."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-lg md:rounded-lg border border-border-subtle bg-[#F2EDE6] p-8 shadow-sm"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#C4472B] text-white font-bold text-lg mb-6">
                {s.n}
              </span>
              <h3 className="text-xl font-bold text-[#1A1412] mb-3">{s.title}</h3>
              <p className="body-text text-[#6B5B4E]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
