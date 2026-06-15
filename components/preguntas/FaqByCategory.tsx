'use client';

import { useMemo, useState } from 'react';
import { Mail, Package, HelpCircle } from 'lucide-react';
import FAQAccordion, { type FaqAccordionItem } from '@/components/ui/FAQAccordion';
import Button from '@/components/ui/Button';
import { faqCategories, type FaqCategoryId } from '@/lib/faqs';
import { siteConfig } from '@/lib/site-config';

const TAB_ORDER: FaqCategoryId[] = [
  'preventa',
  'delantal',
  'pagos',
  'envios',
  'libro',
  'boveda',
  'sponsors',
];

export default function FaqByCategory() {
  const [tab, setTab] = useState<FaqCategoryId>('preventa');

  const items: FaqAccordionItem[] = useMemo(() => {
    const cat = faqCategories.find((c) => c.id === tab);
    return (cat?.items ?? []).map((it, i) => ({
      id: `${tab}-${i}`,
      question: it.q,
      answer: it.a,
    }));
  }, [tab]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      <div
        className="lg:col-span-4 flex flex-col gap-2"
        role="tablist"
        aria-label="Categorías de ayuda"
      >
        {TAB_ORDER.map((id) => {
          const label = faqCategories.find((c) => c.id === id)?.label ?? id;
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(id)}
              className={`w-full text-left rounded-xl px-5 py-4 text-lg font-bold transition border-2 min-h-[56px] ${
                active
                  ? 'border-[#C4472B] bg-[#FFF8F5] text-[#1A1412] shadow-sm'
                  : 'border-[#E8E0D8] bg-white text-[#6B5B4E] hover:border-[#C4472B]/40'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="lg:col-span-8" role="tabpanel">
        <FAQAccordion items={items} />
      </div>
    </div>
  );
}

export function HelpCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
      <div className="rounded-2xl border-2 border-[#E8E0D8] bg-white p-8">
        <Mail className="text-[#C4472B] mb-4" size={32} aria-hidden />
        <h3 className="text-xl font-bold text-[#1A1412] mb-2">Escríbenos</h3>
        <p className="body-text text-lg mb-4">Te ayudamos con tu orden o dudas del delantal.</p>
        <a
          className="text-lg text-[#C4472B] font-bold hover:underline break-all"
          href={`mailto:${siteConfig.email}`}
        >
          {siteConfig.email}
        </a>
      </div>
      <div className="rounded-2xl border-2 border-[#E8E0D8] bg-white p-8">
        <Package className="text-[#C4472B] mb-4" size={32} aria-hidden />
        <h3 className="text-xl font-bold text-[#1A1412] mb-2">Ordenar delantal</h3>
        <p className="body-text text-lg mb-6">Elige tu oferta y asegura el delantal de papá.</p>
        <Button href="/el-sabor-de-papa#ordenar" size="lg" className="w-full">
          Ir a ordenar
        </Button>
      </div>
      <div className="rounded-2xl border-2 border-[#E8E0D8] bg-white p-8">
        <HelpCircle className="text-[#C4472B] mb-4" size={32} aria-hidden />
        <h3 className="text-xl font-bold text-[#1A1412] mb-2">Soporte técnico</h3>
        <p className="body-text text-lg mb-4">Para temas del sitio o recetario.</p>
        <a
          className="text-lg text-[#C4472B] font-bold hover:underline break-all"
          href={`mailto:${siteConfig.supportEmail}`}
        >
          {siteConfig.supportEmail}
        </a>
      </div>
    </div>
  );
}
