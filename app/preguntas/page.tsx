import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FaqByCategory, { HelpCards } from '@/components/preguntas/FaqByCategory';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Preguntas y ayuda | El Gordito del Sabor',
  description:
    'Respuestas claras sobre el delantal de Papá, envíos, pagos con Stripe y cómo ordenar. Contacto y soporte.',
};

export default function PreguntasPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <section className="border-b border-[#E8E0D8] bg-[#F2EDE6] py-10 md:py-14">
        <div className="container-custom max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-8 transition-colors nav-text"
          >
            <ArrowLeft size={22} />
            Volver al inicio
          </Link>
          <p className="comfort-eyebrow text-[#6B5B4E] mb-3">Ayuda</p>
          <h1 className="heading-section-comfort text-[#1A1412] mb-4">
            Preguntas frecuentes
          </h1>
          <p className="body-text text-xl max-w-2xl">
            Respuestas claras, sin rodeo. Si no ves tu caso, escríbenos y te ayudamos.
          </p>
        </div>
      </section>

      <section className="section-spacing-comfort">
        <div className="container-custom max-w-5xl mx-auto">
          <FaqByCategory />
          <HelpCards />

          <div className="mt-14 rounded-3xl border-2 border-[#C4472B]/30 bg-[#1A1412] p-8 md:p-12 text-center">
            <h2 className="heading-section-comfort text-[#FAF8F5] mb-4">
              ¿Listo para ordenar el delantal de papá?
            </h2>
            <p className="text-xl text-[#C4B8AE] max-w-2xl mx-auto mb-8 leading-relaxed">
              Solo 100 unidades. Elige tu oferta, escribe el nombre a bordar y paga seguro en línea.
            </p>
            <Button href="/el-sabor-de-papa#ordenar" size="lg">
              Ordenar delantal ahora
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
