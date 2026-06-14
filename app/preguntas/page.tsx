import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import FaqByCategory, { HelpCards } from '@/components/preguntas/FaqByCategory';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes y ayuda | El Gordito del Sabor',
  description:
    'Respuestas sobre preventa del delantal, La Bóveda, envíos, pagos y patrocinadores. Contacto y soporte.',
};

export default function PreguntasPage() {
  return (
    <main className="min-h-screen bg-[#F2EDE6]">
      <section className="border-b border-[#E8E0D8] bg-[#FAF8F5] py-8">
        <div className="container-custom">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <SectionHeader
            align="left"
            eyebrow="Ayuda"
            title="Preguntas frecuentes"
            subtitle="Objeciones claras, sin rodeo. Si no ves tu caso, escríbenos."
          />
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom max-w-6xl mx-auto">
          <FaqByCategory />
          <HelpCards />
          <div className="mt-16 rounded-2xl border border-[#E8E0D8] bg-[#1A1412] p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF8F5] mb-4">Con tu preventa recibes esto</h2>
            <p className="body-text text-[#C4B8AE] max-w-2xl mx-auto mb-8">
              Ebook digital de cortesía, narrativa honesta de entrega por ronda, y cupón del 10% para tu próxima compra
              oficial (según tu flujo de checkout).
            </p>
            <Link
              href="/delantal"
              className="btn-text inline-flex items-center justify-center rounded-full bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 px-10 transition-colors"
            >
              Ir al delantal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
