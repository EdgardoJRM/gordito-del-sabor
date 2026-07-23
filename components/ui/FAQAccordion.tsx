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

  const divide = dark ? 'divide-white/10' : 'divide-border-subtle';
  const btn = dark
    ? 'text-warm hover:bg-white/5'
    : 'text-warm-dark hover:bg-warm-linen';
  const content = dark ? 'text-[#C4B8AE]' : 'text-earth';

  return (
    <div className={`divide-y ${divide}`}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className={dark ? 'bg-warm-dark' : 'bg-warm'}>
            <button
              type="button"
              className={`flex w-full items-center justify-between gap-4 px-1 py-5 text-left min-h-[56px] ${btn}`}
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
            >
              <span className="font-bold text-lg md:text-xl pr-2">{item.question}</span>
              <ChevronDown
                className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''} ${
                  dark ? 'text-[#E8D4BC]' : 'text-earth'
                }`}
                size={22}
                aria-hidden
              />
            </button>
            {open && (
              <div className={`pb-5 body-text text-lg ${content}`}>{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
