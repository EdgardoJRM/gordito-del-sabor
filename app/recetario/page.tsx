import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Download, Star } from 'lucide-react';
import RecetarioFunnel from '@/components/ebook/RecetarioFunnel';

export const metadata: Metadata = {
  title: 'Las 20 Recetas Favoritas Del Sabor | El Gordito del Sabor',
  description:
    'Descarga el recetario digital con las 20 recetas más populares del Gordito. Recetas boricuas auténticas, fáciles de seguir, perfectas para cocinar en casa.',
  openGraph: {
    title: 'Las 20 Recetas Favoritas Del Sabor',
    description: 'Descarga gratis el recetario con las 20 recetas más populares del Gordito.',
    type: 'website',
  },
};

/** Vista previa de platos del recetario (misma lista que el email de descarga). */
const RECIPES = [
  'Arroz con Gandules',
  'Pernil Asado',
  'Mofongo',
  'Camarones al Ajillo',
  'Pollo Guisado',
  'Bistec Encebollado',
  'Alcapurrias',
  'Pasteles',
  'Ropa Vieja',
  'Tostones',
  'Bacalao a la Vizcaína',
  'Arroz con Pollo',
  'Carne Guisada',
  'Empanadillas',
  'Sorullitos',
  'Habichuelas Guisadas',
  'Chuletas Fritas',
  'Yuca con Mojo',
  'Ensalada de Pulpo',
  'Flan Casero',
] as const;

const TESTIMONIALS = [
  {
    name: 'María García',
    role: 'Cocinera casera',
    text: 'Finalmente puedo cocinar como mi abuela. Las recetas son claras y los resultados son increíbles.',
    avatar: '👩‍🍳',
  },
  {
    name: 'Carlos López',
    role: 'Padre de familia',
    text: 'Mi familia adora estas recetas. Es como tener al Gordito en mi cocina.',
    avatar: '👨‍👩‍👧‍👦',
  },
  {
    name: 'Ana Rodríguez',
    role: 'Estudiante',
    text: 'Aprendí a cocinar boricua con este recetario. Recomendado.',
    avatar: '👩‍🎓',
  },
];

const FAQ = [
  {
    q: '¿Cuánto cuesta el recetario?',
    a: 'Es completamente gratis. Solo necesitas tu email para enviártelo.',
  },
  {
    q: '¿En qué formato viene?',
    a: 'PDF: lo descargas, guardas o imprimes. Sirve en cualquier dispositivo.',
  },
  {
    q: '¿Puedo compartir el recetario?',
    a: 'Sí, con familia y amigos. Queremos que más gente cocine con sazón.',
  },
  {
    q: '¿Incluye videos o solo recetas?',
    a: 'El PDF es recetas con pasos claros. Para videos, mira nuestro canal de YouTube.',
  },
  {
    q: '¿Qué pasa después de descargar?',
    a: 'Recibes el archivo por email. Si quieres, luego puedes unirte al boletín para más recetas.',
  },
];

export default function RecetarioPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Funnel estilo Russell Brunson: hook → historia → value stack → opt-in */}
      <RecetarioFunnel />

      {/* Prueba social + lista (refuerzo después del formulario para quien baja el scroll) */}
      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]" aria-labelledby="lista-recetas">
        <div className="container-custom">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 id="lista-recetas" className="heading-section text-[#1A1412] mb-4 text-3xl md:text-5xl">
              Las 20 recetas dentro del PDF
            </h2>
            <p className="body-text text-lg">
              Misma lista que verás en el recetario. Nada escondido.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {RECIPES.map((recipe) => (
              <div
                key={recipe}
                className="bg-[#FAF8F5] border border-[#E8E0D8] rounded-lg p-4 flex items-center gap-3 shadow-sm"
              >
                <Check size={20} className="text-[#C4472B] flex-shrink-0" aria-hidden />
                <span className="body-text text-[#1A1412]">{recipe}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-10">
            <Link
              href="#recetario-optin"
              className="btn-text inline-flex items-center gap-2 text-[#C4472B] font-bold hover:text-[#A8381F]"
            >
              Volver al formulario
              <ArrowRight size={18} />
            </Link>
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom">
          <h2 className="heading-section text-[#1A1412] mb-12 text-center text-3xl md:text-5xl">
            Lo que dicen quienes ya cocinaron con el Gordito
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-[#E8E0D8] rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl" aria-hidden>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[#1A1412] font-bold">{t.name}</p>
                    <p className="text-sm text-[#6B5B4E]">{t.role}</p>
                  </div>
                </div>
                <p className="body-text text-[#6B5B4E] italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex gap-1 mt-4" aria-label="5 de 5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#C4472B] text-[#C4472B]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section text-[#1A1412] mb-10 text-center text-3xl md:text-5xl">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-white border border-[#E8E0D8] rounded-lg p-6 shadow-sm">
                <h3 className="text-[#1A1412] font-bold mb-2">{item.q}</h3>
                <p className="body-text text-[#6B5B4E]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-gradient-to-br from-[#1A1412] to-[#2a211d] border-t border-[#E8E0D8] text-[#FAF8F5]">
        <div className="container-custom max-w-2xl text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">¿Listo para la sazón de verdad?</h2>
          <p className="text-[#E8E0D8] text-lg">
            Un clic y el recetario va a tu correo. Gratis.
          </p>
          <Link
            href="#recetario-optin"
            className="btn-text inline-flex items-center gap-3 bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
          >
            <Download size={20} />
            Ir al formulario
          </Link>
        </div>
      </section>
    </main>
  );
}
