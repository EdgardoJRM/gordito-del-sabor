import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import FAQAccordion from '@/components/ui/FAQAccordion';
import { faqCategories } from '@/lib/faqs';

const shortIds = ['preventa', 'delantal', 'boveda'] as const;

export default function EcosystemFaqShort() {
  const items = shortIds.flatMap((id) => {
    const cat = faqCategories.find((c) => c.id === id);
    return (cat?.items.slice(0, 1) ?? []).map((it, idx) => ({
      id: `${id}-${idx}`,
      question: it.q,
      answer: it.a,
    }));
  });

  return (
    <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
      <div className="container-custom max-w-3xl mx-auto">
        <SectionHeader
          title="Preguntas frecuentes"
          subtitle="Respuestas cortas. Para todo el detalle, entra a la página de ayuda."
        />
        <FAQAccordion items={items} />
        <p className="text-center mt-10">
          <Link
            href="/preguntas"
            className="btn-text text-[#C4472B] font-bold hover:text-[#A8381F] underline underline-offset-4"
          >
            Ver todas las preguntas
          </Link>
        </p>
      </div>
    </section>
  );
}
