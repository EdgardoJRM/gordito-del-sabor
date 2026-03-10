import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto | El Gordito del Sabor',
  description: 'Ponte en contacto con nosotros. Nos encantaría escuchar tus preguntas y sugerencias.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="bg-black border-b border-gray-900 py-8">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#A1A1A6] hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-white mb-6">Contacto</h1>
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
                    title: 'Dirección',
                    content: 'San Juan, Puerto Rico',
                    emoji: '📍',
                  },
                  {
                    title: 'Teléfono',
                    content: '+1 (787) XXX-XXXX',
                    emoji: '📞',
                  },
                  {
                    title: 'Email',
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
                      <h3 className="font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="body-text ml-12 whitespace-pre-line">{item.content}</p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-gray-900">
                <h3 className="font-bold text-white mb-6">Síguenos</h3>
                <div className="flex gap-4">
                  {[
                    { name: 'Facebook', emoji: '👍' },
                    { name: 'Instagram', emoji: '📸' },
                    { name: 'YouTube', emoji: '▶️' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="w-14 h-14 bg-[#1C1C1E] border border-gray-900 rounded-full flex items-center justify-center text-2xl hover:border-gray-800 hover:scale-110 transition-all"
                      title={social.name}
                    >
                      {social.emoji}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-6 py-4 bg-[#1C1C1E] border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-6 py-4 bg-[#1C1C1E] border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-6 py-4 bg-[#1C1C1E] border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                    placeholder="¿Cuál es tu pregunta?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-6 py-4 bg-[#1C1C1E] border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                    placeholder="Cuéntanos más..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-text w-full bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 rounded-full transition-all transform hover:scale-105"
                >
                  Enviar Mensaje
                </button>
              </form>

              {/* FAQ */}
              <div className="mt-16 pt-12 border-t border-gray-900">
                <h3 className="text-3xl font-bold text-white mb-8">Preguntas Frecuentes</h3>
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
                    <div key={index} className="bg-[#1C1C1E] border border-gray-900 rounded-2xl p-6 hover:border-gray-800 transition-all">
                      <h4 className="font-bold text-white mb-3">{faq.q}</h4>
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
