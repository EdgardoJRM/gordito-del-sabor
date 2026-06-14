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
  'libro',
  'boveda',
  'envios',
  'pagos',
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
      <div className="lg:col-span-4 space-y-2">
        {TAB_ORDER.map((id) => {
          const label = faqCategories.find((c) => c.id === id)?.label ?? id;
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`w-full text-left rounded-xl px-4 py-3 text-sm font-bold transition border ${
                active
                  ? 'border-[#C4472B] bg-[#C4472B]/10 text-[#1A1412]'
                  : 'border-[#E8E0D8] bg-[#FAF8F5] text-[#6B5B4E] hover:border-[#C4472B]/30'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="lg:col-span-8">
        <FAQAccordion items={items} />
      </div>
    </div>
  );
}

export function HelpCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      <div className="rounded-2xl border border-[#E8E0D8] bg-[#FAF8F5] p-8 shadow-sm">
        <Mail className="text-[#C4472B] mb-4" size={28} aria-hidden />
        <h3 className="font-bold text-lg text-[#1A1412] mb-2">Escríbenos</h3>
        <p className="body-text text-sm mb-4">Soporte y órdenes.</p>
        <a className="text-[#C4472B] font-bold hover:underline" href={`mailto:${siteConfig.supportEmail}`}>
          {siteConfig.supportEmail}
        </a>
      </div>
      <div className="rounded-2xl border border-[#E8E0D8] bg-[#FAF8F5] p-8 shadow-sm">
        <Package className="text-[#C4472B] mb-4" size={28} aria-hidden />
        <h3 className="font-bold text-lg text-[#1A1412] mb-2">Estado de mi orden</h3>
        <p className="body-text text-sm mb-4">Cuando conectes Shopify/Stripe, enlaza aquí el portal de clientes.</p>
        <Button href="/contacto" variant="secondary" size="sm">
          Contactar
        </Button>
      </div>
      <div className="rounded-2xl border border-[#E8E0D8] bg-[#FAF8F5] p-8 shadow-sm">
        <HelpCircle className="text-[#C4472B] mb-4" size={28} aria-hidden />
        <h3 className="font-bold text-lg text-[#1A1412] mb-2">Sponsors</h3>
        <p className="body-text text-sm mb-4">Propuestas B2B y media kit.</p>
        <Button href="/patrocinadores" variant="secondary" size="sm">
          Patrocinadores
        </Button>
      </div>
    </div>
  );
}
