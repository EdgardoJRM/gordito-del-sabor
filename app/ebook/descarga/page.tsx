import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Download, Mail, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Descarga Confirmada | El Gordito del Sabor',
  description:
    'Tu recetario está en camino. Revisa tu email para descargar Las 20 Recetas Favoritas Del Sabor.',
};

export default function DescargaPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Bridge page estilo funnel: confirmación + siguiente paso claro */}
      <section className="min-h-screen flex flex-col justify-center py-16 px-4">
        <div className="container-custom max-w-2xl mx-auto space-y-10">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-[#C4472B]/20 rounded-full flex items-center justify-center">
                <Check size={48} className="text-[#C4472B]" aria-hidden />
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4472B]">
              Paso completado
            </p>
            <h1 className="heading-section text-[#1A1412]">¡Pedido recibido!</h1>
            <p className="body-text text-xl text-[#6B5B4E]">
              Tu recetario va hacia tu correo. Mientras tanto, aquí va tu siguiente movimiento.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#C4472B]/30 bg-gradient-to-br from-[#F2EDE6] to-[#FAF8F5] p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <Sparkles className="text-[#C4472B] flex-shrink-0 mt-1" size={28} />
              <div>
                <h2 className="text-xl font-bold text-[#1A1412] mb-2">Paso 1: Revisa tu email</h2>
                <p className="body-text text-sm mb-4">
                  Buscá el mensaje con el PDF. Si no aparece en unos minutos, revisá spam o promociones.
                </p>
                <div className="flex items-center gap-3 rounded-xl bg-white border border-[#E8E0D8] p-4">
                  <Mail size={22} className="text-[#C4472B]" />
                  <p className="body-text text-sm text-[#1A1412]">
                    Asunto parecido a: &quot;Las 20 Recetas Favoritas Del Sabor&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E8E0D8] rounded-2xl p-8 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A1412]">Paso 2: Abrí el PDF</h2>
            <p className="body-text">
              Guardalo en el celular o imprimilo. Elegí una receta y seguí los pasos tal cual: ahí está el sazón.
            </p>
            <a
              href="/ebooks/recetario.pdf"
              download="Las-20-Recetas-Favoritas-del-Sabor.pdf"
              className="inline-flex items-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105"
            >
              <Download size={20} />
              Descargar PDF ahora (por si el email tarda)
            </a>
          </div>

          <div className="bg-[#1A1412] rounded-2xl p-8 text-[#FAF8F5] space-y-4">
            <h2 className="text-xl font-bold">Paso 3: Subí el nivel en la cocina</h2>
            <p className="text-[#E8E0D8] text-sm leading-relaxed">
              El recetario es la base. En el sitio tenés más recetas y detalles cuando quieras profundizar.
            </p>
            <Link
              href="/recetas"
              className="inline-flex items-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-4 px-8 rounded-full transition-all"
            >
              Ver todas las recetas
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="bg-[#F2EDE6] border border-[#E8E0D8] rounded-2xl p-8 space-y-4">
            <h2 className="text-lg font-bold text-[#1A1412]">Qué incluye tu recetario</h2>
            <ul className="space-y-3">
              {[
                '20 recetas auténticas, favoritas de la comunidad',
                'Pasos claros, sin vueltas',
                'Ingredientes que consigues en el súper',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 body-text text-[#6B5B4E]">
                  <Check size={20} className="text-[#C4472B] flex-shrink-0 mt-0.5" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#E8E0D8] bg-white text-[#1A1412] font-bold py-4 px-8 rounded-full hover:bg-[#F2EDE6] transition-all"
            >
              Volver al inicio
            </Link>
          </div>

          <p className="text-center body-text text-sm text-[#9C8B80] border-t border-[#E8E0D8] pt-8">
            ¿Algo falló con el email?{' '}
            <Link href="/contacto" className="text-[#C4472B] font-bold hover:underline">
              Escríbenos
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
