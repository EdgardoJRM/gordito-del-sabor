import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Download, Users, Star } from 'lucide-react';
import EbookDownloadForm from '@/components/ebook/EbookDownloadForm';

export const metadata: Metadata = {
  title: 'Las 20 Recetas Favoritas del Sabor | El Gordito del Sabor',
  description: 'Descarga el recetario digital con las 20 recetas más populares del Gordito. Recetas boricuas auténticas, fáciles de seguir, perfectas para cocinar en casa.',
  openGraph: {
    title: 'Las 20 Recetas Favoritas del Sabor',
    description: 'Descarga gratis el recetario con las 20 recetas más populares del Gordito.',
    type: 'website',
  },
};

export default function RecetarioPage() {
  const features = [
    {
      icon: '📖',
      title: '20 Recetas Auténticas',
      description: 'Las favoritas del Gordito, seleccionadas por popularidad y sabor.',
    },
    {
      icon: '👨‍🍳',
      title: 'Fáciles de Seguir',
      description: 'Instrucciones claras, ingredientes accesibles, sin complicaciones.',
    },
    {
      icon: '⏱️',
      title: 'Tiempos Realistas',
      description: 'Desde 20 minutos hasta 2 horas. Recetas para cualquier ocasión.',
    },
    {
      icon: '🇵🇷',
      title: 'Boricua de Verdad',
      description: 'Recetas tradicionales puertorriqueñas con sazón casero.',
    },
  ];

  const recipes = [
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
  ];

  const testimonials = [
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
      text: 'Aprendí a cocinar boricano con este recetario. ¡Recomendado!',
      avatar: '👩‍🎓',
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#F2EDE6] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F2EDE6] to-[#C4472B]/10 opacity-90" />
        
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#C4472B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#B8860B]/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4">
          <div className="inline-block">
            <span className="text-xs tracking-widest uppercase text-[#6B5B4E] bg-white px-4 py-2 rounded-full border border-[#E8E0D8] shadow-sm">
              📚 Recetario Digital Gratuito
            </span>
          </div>

          <h1 className="heading-hero text-[#1A1412]">
            Las 20 Recetas<br />
            Favoritas del Sabor
          </h1>

          <p className="subheadline text-xl md:text-2xl max-w-2xl mx-auto">
            Recetas boricuas auténticas, fáciles de seguir, perfectas para cocinar en casa con sazón de verdad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#6B5B4E] pt-4">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#C4472B]" />
              <span>Más de 160,000 personas ya cocinan con el Gordito</span>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/contacto?lead=ebook"
              className="btn-text inline-flex items-center gap-3 bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
            >
              <Download size={20} />
              Descargar Recetario Gratis
            </Link>
          </div>

          <p className="text-xs text-[#9C8B80] pt-4">
            Formato PDF • Descarga instantánea • Sin spam
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#1A1412] mb-6">
              Descarga tu recetario ahora
            </h2>
            <p className="body-text text-xl text-[#6B5B4E]">
              Completa el formulario y recibirás el PDF directamente en tu email
            </p>
          </div>

          <div className="bg-white border border-[#E8E0D8] rounded-3xl p-8 md:p-12 shadow-sm">
            <EbookDownloadForm />
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-section text-[#1A1412] mb-6">
              ¿Qué incluye el recetario?
            </h2>
            <p className="body-text text-xl text-[#6B5B4E] max-w-2xl mx-auto">
              Todo lo que necesitas para cocinar como el Gordito desde tu propia cocina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-[#FAF8F5] border border-[#E8E0D8] rounded-2xl p-8 hover:border-[#C4472B]/30 transition-colors shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-[#1A1412] font-bold text-lg mb-3">{feature.title}</h3>
                <p className="body-text text-[#6B5B4E]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-section text-[#1A1412] mb-6">
              Las 20 Recetas
            </h2>
            <p className="body-text text-xl text-[#6B5B4E] max-w-2xl mx-auto">
              Desde clásicos como el Pernil hasta favoritos como el Mofongo. Todas las recetas que necesitas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe, idx) => (
              <div key={idx} className="bg-white border border-[#E8E0D8] rounded-lg p-4 flex items-center gap-3 hover:border-[#C4472B]/25 transition-colors shadow-sm">
                <Check size={20} className="text-[#C4472B] flex-shrink-0" />
                <span className="body-text text-[#1A1412]">{recipe}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-section text-[#1A1412] mb-6">
              Lo que dicen nuestros cocineros
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white border border-[#E8E0D8] rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="text-[#1A1412] font-bold">{testimonial.name}</p>
                    <p className="text-sm text-[#6B5B4E]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="body-text text-[#6B5B4E] italic">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#C4472B] text-[#C4472B]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#1A1412] mb-6">
              ¿Por qué descargar este recetario?
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Recetas probadas',
                desc: 'Cada receta ha sido cocinada miles de veces por nuestra comunidad.',
              },
              {
                title: 'Instrucciones claras',
                desc: 'Paso a paso detallado, sin jerga de cocina. Perfecto para principiantes.',
              },
              {
                title: 'Ingredientes accesibles',
                desc: 'Nada complicado. Ingredientes que encuentras en cualquier supermercado.',
              },
              {
                title: 'Tiempos realistas',
                desc: 'Sabemos cuánto tiempo toma realmente cada receta. Sin sorpresas.',
              },
              {
                title: 'Formato digital',
                desc: 'Descarga instantánea. Accede desde tu teléfono, tablet o computadora.',
              },
              {
                title: 'Totalmente gratis',
                desc: 'Sin costo, sin suscripción. Solo descarga y empieza a cocinar.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <Check size={24} className="text-[#C4472B] mt-1" />
                </div>
                <div>
                  <h3 className="text-[#1A1412] font-bold mb-1">{item.title}</h3>
                  <p className="body-text text-[#6B5B4E]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-gradient-to-br from-[#F2EDE6] via-[#FAF8F5] to-[#C4472B]/5 border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl text-center space-y-8">
          <h2 className="heading-section text-[#1A1412]">
            ¿Listo para cocinar?
          </h2>

          <p className="body-text text-xl text-[#6B5B4E]">
            Descarga el recetario ahora y empieza a preparar las 20 recetas favoritas del Gordito. Totalmente gratis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contacto?lead=ebook"
              className="btn-text inline-flex items-center justify-center gap-2 bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
            >
              <Download size={20} />
              Descargar Recetario
            </Link>
            <Link
              href="/recetas"
              className="btn-text inline-flex items-center justify-center gap-2 border-2 border-[#1A1412] text-[#1A1412] py-5 px-12 rounded-full hover:bg-[#1A1412] hover:text-[#FAF8F5] transition-all transform hover:scale-105"
            >
              Ver Todas las Recetas
              <ArrowRight size={20} />
            </Link>
          </div>

          <p className="text-xs text-[#9C8B80] pt-4">
            Descarga instantánea • Formato PDF • Compatible con todos los dispositivos
          </p>
        </div>
      </section>

      <section className="section-spacing bg-[#F2EDE6] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="heading-section text-[#1A1412] mb-6">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: '¿Cuánto cuesta el recetario?',
                a: 'Es completamente gratis. Solo necesitas tu email para descargarlo.',
              },
              {
                q: '¿En qué formato viene?',
                a: 'Es un archivo PDF que puedes descargar, guardar e imprimir. Compatible con todos los dispositivos.',
              },
              {
                q: '¿Puedo compartir el recetario?',
                a: 'Claro, comparte con tu familia y amigos. Queremos que más personas cocinen con sazón.',
              },
              {
                q: '¿Incluye videos o solo recetas?',
                a: 'El recetario es principalmente recetas con instrucciones claras. Pero puedes ver videos en nuestro canal de YouTube.',
              },
              {
                q: '¿Hay recetas vegetarianas?',
                a: 'Sí, incluimos opciones vegetarianas y adaptaciones para diferentes dietas.',
              },
              {
                q: '¿Qué pasa después de descargar?',
                a: 'Recibirás el PDF en tu email. Opcionalmente, puedes suscribirte a nuestro boletín para más recetas.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-[#E8E0D8] rounded-lg p-6 shadow-sm">
                <h3 className="text-[#1A1412] font-bold mb-3">{item.q}</h3>
                <p className="body-text text-[#6B5B4E]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#FAF8F5] border-t border-[#E8E0D8]">
        <div className="container-custom max-w-2xl text-center space-y-8">
          <h2 className="heading-section text-[#1A1412]">
            Empieza tu viaje culinario hoy
          </h2>

          <p className="body-text text-lg text-[#6B5B4E]">
            Únete a más de 160,000 personas que ya cocinan con el Gordito. Descarga el recetario gratis y descubre por qué nuestras recetas son las favoritas.
          </p>

          <Link
            href="/contacto?lead=ebook"
            className="btn-text inline-flex items-center gap-3 bg-[#C4472B] hover:bg-[#A8381F] text-white py-5 px-12 rounded-full transition-all transform hover:scale-105"
          >
            <Download size={20} />
            Descargar Ahora
          </Link>

          <p className="text-xs text-[#9C8B80]">
            Descarga instantánea • Sin spam • Totalmente gratis
          </p>
        </div>
      </section>
    </main>
  );
}
