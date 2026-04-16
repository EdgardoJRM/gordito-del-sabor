import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto | El Gordito del Sabor',
  description: 'Ponte en contacto con nosotros. Nos encantaría escuchar tus preguntas y sugerencias.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <section className="bg-[#FAF8F5] border-b border-[#E8E0D8] py-8">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#6B5B4E] hover:text-[#1A1412] mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-[#1A1412] mb-6">Contacto</h1>
          <p className="body-text text-xl">
            Nos encantaría escuchar de ti
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {[
                  {
                    title: 'Ubicación',
                    content: 'San Juan, Puerto Rico',
                    emoji: '📍',
                  },
                  {
                    title: 'Contacto principal',
                    content: 'info@gorditodelsabor.com',
                    emoji: '✉️',
                  },
                  {
                    title: 'Horario',
                    content: 'Lunes a Viernes: 9AM - 6PM\nSábado: 10AM - 4PM',
                    emoji: '🕐',
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <h3 className="font-bold text-[#1A1412]">{item.title}</h3>
                    </div>
                    <p className="body-text ml-12 whitespace-pre-line">{item.content}</p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-[#E8E0D8]">
                <h3 className="font-bold text-[#1A1412] mb-6">Síguenos</h3>
                <p className="body-text text-sm mb-4">
                  Pronto enlaces directos a redes. Mientras tanto, escríbenos a{' '}
                  <a href="mailto:info@gorditodelsabor.com" className="text-[#C4472B] font-semibold hover:underline">
                    info@gorditodelsabor.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form className="space-y-6 bg-white border border-[#E8E0D8] rounded-3xl p-8 md:p-10 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-[#1A1412] mb-3 uppercase tracking-wide">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-6 py-4 bg-white border border-[#E8E0D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4472B] focus:border-transparent text-[#1A1412] placeholder-[#9C8B80]"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-[#1A1412] mb-3 uppercase tracking-wide">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-6 py-4 bg-white border border-[#E8E0D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4472B] focus:border-transparent text-[#1A1412] placeholder-[#9C8B80]"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-[#1A1412] mb-3 uppercase tracking-wide">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-6 py-4 bg-white border border-[#E8E0D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4472B] focus:border-transparent text-[#1A1412] placeholder-[#9C8B80]"
                    placeholder="¿Cuál es tu pregunta?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[#1A1412] mb-3 uppercase tracking-wide">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-6 py-4 bg-white border border-[#E8E0D8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4472B] focus:border-transparent text-[#1A1412] placeholder-[#9C8B80]"
                    placeholder="Cuéntanos más..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-text w-full bg-[#C4472B] hover:bg-[#A8381F] text-white py-4 rounded-full transition-all transform hover:scale-[1.01]"
                >
                  Enviar Mensaje
                </button>
                <p className="text-xs text-[#9C8B80] text-center">
                  El envío por formulario web puede conectarse a un backend más adelante. Por ahora, también puedes escribirnos directamente a info@gorditodelsabor.com
                </p>
              </form>

              {/* FAQ */}
              <div className="mt-16 pt-12 border-t border-[#E8E0D8]">
                <h3 className="text-3xl font-bold text-[#1A1412] mb-8">Preguntas Frecuentes</h3>
                <div className="space-y-4">
                  {[
                    {
                      q: '¿Puedo usar tus recetas comercialmente?',
                      a: 'Nuestras recetas son para uso personal. Para uso comercial, por favor contáctanos.',
                    },
                    {
                      q: '¿Cómo puedo sugerir una receta?',
                      a: 'Nos encantaría escuchar tus sugerencias. Envíanos un mensaje con tu idea.',
                    },
                    {
                      q: '¿Ofrecen clases de cocina?',
                      a: 'Actualmente no, pero estamos considerando ofrecerlas en el futuro.',
                    },
                  ].map((faq, index) => (
                    <div key={index} className="bg-[#F2EDE6] border border-[#E8E0D8] rounded-2xl p-6 hover:border-[#C4472B]/25 transition-all">
                      <h4 className="font-bold text-[#1A1412] mb-3">{faq.q}</h4>
                      <p className="body-text">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
