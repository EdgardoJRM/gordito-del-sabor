import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Download, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Descarga Confirmada | El Gordito del Sabor',
  description: 'Tu recetario está en camino. Revisa tu email para descargar Las 20 Recetas Favoritas del Sabor.',
};

export default function DescargaPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Success Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="container-custom max-w-2xl">
          <div className="text-center space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-[#C4472B]/20 rounded-full flex items-center justify-center">
                <Check size={48} className="text-[#C4472B]" />
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-4">
              <h1 className="heading-section text-[#1A1412]">
                ¡Listo!
              </h1>
              <p className="body-text text-2xl text-[#6B5B4E]">
                Tu recetario está en camino
              </p>
            </div>

            {/* Email Confirmation */}
            <div className="bg-white border border-[#E8E0D8] rounded-2xl p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mail size={24} className="text-[#C4472B]" />
                <p className="body-text text-lg text-[#1A1412]">Revisa tu email</p>
              </div>
              <p className="body-text text-[#6B5B4E]">
                Hemos enviado un email con tu recetario "Las 20 Recetas Favoritas del Sabor" 
                a tu bandeja de entrada. Si no lo ves en los próximos minutos, revisa tu carpeta de spam.
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-[#F2EDE6] border border-[#E8E0D8] rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#1A1412]">Tu recetario incluye:</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Check size={24} className="text-[#C4472B] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-[#1A1412]">20 Recetas Auténticas</p>
                    <p className="body-text text-[#6B5B4E] text-sm">Las favoritas del Gordito, seleccionadas por popularidad y sabor</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check size={24} className="text-[#C4472B] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-[#1A1412]">Instrucciones Claras</p>
                    <p className="body-text text-[#6B5B4E] text-sm">Paso a paso, ingredientes accesibles, sin complicaciones</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Check size={24} className="text-[#C4472B] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-[#1A1412]">Sabor Boricua Auténtico</p>
                    <p className="body-text text-[#6B5B4E] text-sm">Recetas tradicionales puertorriqueñas con sazón casero</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Download Button */}
            <div className="space-y-4">
              <p className="body-text text-[#6B5B4E]">
                ¿No recibiste el email? Descarga directamente aquí:
              </p>
              <a
                href="/ebooks/recetario.pdf"
                download="Las-20-Recetas-Favoritas-del-Sabor.pdf"
                className="inline-flex items-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105"
              >
                <Download size={20} />
                Descargar PDF
              </a>
            </div>

            {/* Next Steps */}
            <div className="bg-[#FAF8F5] border border-[#C4472B]/25 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-bold text-[#1A1412]">Próximos pasos:</h3>
              <ol className="body-text text-[#6B5B4E] space-y-3 text-left">
                <li className="flex gap-3">
                  <span className="font-bold text-[#C4472B] flex-shrink-0">1.</span>
                  <span>Abre el PDF en tu dispositivo favorito</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#C4472B] flex-shrink-0">2.</span>
                  <span>Elige una receta que te llame la atención</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#C4472B] flex-shrink-0">3.</span>
                  <span>Cocina con sazón y disfruta con tu familia</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#C4472B] flex-shrink-0">4.</span>
                  <span>Comparte tus resultados en redes sociales</span>
                </li>
              </ol>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/recetas"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F2EDE6] text-[#1A1412] font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 border border-[#E8E0D8]"
              >
                Ver Más Recetas
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105"
              >
                Volver al Inicio
              </Link>
            </div>

            {/* Support */}
            <div className="pt-8 border-t border-[#E8E0D8]">
              <p className="body-text text-[#9C8B80] text-sm">
                ¿Tienes preguntas? <Link href="/contacto" className="text-[#C4472B] hover:text-[#A8381F] font-bold">Contáctanos</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
