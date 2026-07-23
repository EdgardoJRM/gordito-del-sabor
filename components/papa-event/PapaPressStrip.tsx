import { papaPress } from '@/lib/papa-event';

export default function PapaPressStrip() {
  return (
    <section className="py-10 bg-[#F2EDE6] hairline-y">
      <div className="container-custom max-w-5xl">
        <p className="text-center text-sm font-bold uppercase tracking-wider text-[#9C8B80] mb-6">
          {papaPress.eyebrow}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {papaPress.items.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-border-subtle bg-white px-5 py-4 text-center"
            >
              <p className="font-bold text-[#1A1412]">{item.label}</p>
              <p className="text-sm text-[#6B5B4E] mt-1">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
