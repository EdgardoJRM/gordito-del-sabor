'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FaqAccordionItem = { id: string; question: string; answer: string };

type FAQAccordionProps = {
  items: FaqAccordionItem[];
  dark?: boolean;
};

export default function FAQAccordion({ items, dark }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const border = dark ? 'border-white/10' : 'border-[#E8E0D8]';
  const btn = dark
    ? 'text-[#FAF8F5] hover:bg-white/5'
    : 'text-[#1A1412] hover:bg-[#F2EDE6]';
  const content = dark ? 'text-[#C4B8AE]' : 'text-[#6B5B4E]';

  return (
    <div className={`divide-y rounded-2xl border ${border} overflow-hidden`}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className={dark ? 'bg-[#1A1412]' : 'bg-[#FAF8F5]'}>
            <button
              type="button"
              className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left ${btn}`}
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
            >
              <span className="font-bold text-base md:text-lg pr-2">{item.question}</span>
              <ChevronDown
                className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''} ${
                  dark ? 'text-[#E8D4BC]' : 'text-[#6B5B4E]'
                }`}
                size={22}
                aria-hidden
              />
            </button>
            {open && (
              <div className={`px-6 pb-5 body-text ${content}`}>{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
