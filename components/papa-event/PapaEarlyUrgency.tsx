'use client';

import { papaEarlyUrgency, papaEvent } from '@/lib/papa-event';
import { usePapaInventory } from '@/hooks/usePapaInventory';
import PapaCtaWithMicro from '@/components/papa-event/PapaCtaWithMicro';

export default function PapaEarlyUrgency() {
  const { inventory, loading } = usePapaInventory();

  return (
    <section className="section-spacing-comfort bg-[#F2EDE6] border-y border-[#E8E0D8]">
      <div className="container-custom max-w-3xl">
        <p className="comfort-eyebrow text-[#6B5B4E] mb-3">{papaEarlyUrgency.eyebrow}</p>
        <h2 className="heading-section-comfort text-[#1A1412] mb-4">{papaEarlyUrgency.title}</h2>
        <p className="text-lg text-[#6B5B4E] leading-relaxed mb-6">{papaEarlyUrgency.intro}</p>
        <p className="text-lg text-[#6B5B4E] leading-relaxed mb-8">{papaEarlyUrgency.closing}</p>

        {!loading && !inventory.soldOut && (
          <p className="text-lg text-[#1A1412] mb-8">
            Quedan <strong className="text-[#C4472B]">{inventory.remaining}</strong> unidades en esta
            edición.
          </p>
        )}

        <ul className="space-y-4 mb-10">
          {papaEarlyUrgency.offers.map((offer) => (
            <li
              key={offer.id}
              className="rounded-xl border border-[#E8E0D8] bg-white p-5 text-[#1A1412]"
            >
              <p className="font-bold text-lg mb-1">
                {offer.title} — {offer.price}
              </p>
              <p className="text-[#6B5B4E]">{offer.description}</p>
            </li>
          ))}
        </ul>

        <PapaCtaWithMicro
          size="lg"
          className="shadow-xl w-full sm:w-auto"
          micro={papaEarlyUrgency.micro}
        />
      </div>
    </section>
  );
}
