'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { papaEvent, papaFaqs, papaHighlights, papaShopProduct } from '@/lib/papa-event';

const panels = [
  {
    id: 'details',
    title: 'Detalles',
    content: (
      <ul className="space-y-3 text-sm text-[#6B5B4E]">
        {papaHighlights.map((item) => (
          <li key={item.title}>
            <strong className="text-[#1A1412]">{item.title}.</strong> {item.text}
          </li>
        ))}
        <li>Máximo {papaEvent.maxEmbroideryChars} caracteres por nombre en el bordado.</li>
      </ul>
    ),
  },
  {
    id: 'shipping',
    title: 'Envío y entrega',
    content: <p className="text-sm text-[#6B5B4E] leading-relaxed">{papaShopProduct.shipping}</p>,
  },
  {
    id: 'guarantee',
    title: 'Garantía',
    content: <p className="text-sm text-[#6B5B4E] leading-relaxed">{papaShopProduct.guarantee}</p>,
  },
] as const;

export default function PapaProductAccordion() {
  const [openId, setOpenId] = useState<string | null>('details');

  return (
    <div className="border-t border-[#E8E0D8] divide-y divide-[#E8E0D8]">
      {panels.map((panel) => {
        const open = openId === panel.id;
        return (
          <div key={panel.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : panel.id)}
              className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-[#1A1412] uppercase tracking-wide"
              aria-expanded={open}
            >
              {panel.title}
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            {open && <div className="pb-5">{panel.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

export function PapaProductFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border-t border-[#E8E0D8] divide-y divide-[#E8E0D8]">
      {papaFaqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-[#1A1412]"
              aria-expanded={open}
            >
              {faq.question}
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            {open && (
              <p className="pb-5 text-sm text-[#6B5B4E] leading-relaxed">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
