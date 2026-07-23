import { papaBuyerMoments } from '@/lib/papa-event';

export default function PapaBuyerMoments() {
  return (
    <section className="section-spacing-comfort bg-[#FAF8F5]">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="heading-section-comfort text-[#1A1412] mb-4">{papaBuyerMoments.title}</h2>
          <p className="text-lg text-[#6B5B4E]">{papaBuyerMoments.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {papaBuyerMoments.items.map((item, index) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#E8E0D8] bg-white p-6 md:p-8 relative"
            >
              <span className="absolute -top-3 left-6 bg-[#C4472B] text-white text-sm font-bold px-3 py-1 rounded-full">
                {index + 1}
              </span>
              <h3 className="text-xl font-bold text-[#1A1412] mb-3 mt-2">{item.title}</h3>
              <p className="text-[#6B5B4E] leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
