import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contacto | El Gordito del Sabor',
  description: 'Ponte en contacto con nosotros. Nos encantaría escuchar tus preguntas y sugerencias.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="heading-1 text-amber-900 mb-4">Contacto</h1>
          <p className="subheading text-gray-600">
            Nos encantaría escuchar de ti
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
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
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 ml-11 whitespace-pre-line">{item.content}</p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Síguenos</h3>
                <div className="flex gap-4">
                  {[
                    { name: 'Facebook', emoji: '👍' },
                    { name: 'Instagram', emoji: '📸' },
                    { name: 'YouTube', emoji: '▶️' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl hover:bg-amber-200 transition"
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
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="¿Cuál es tu pregunta?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Cuéntanos más..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Enviar Mensaje
                </button>
              </form>

              {/* FAQ */}
              <div className="mt-12 pt-12 border-t border-gray-200">
                <h3 className="heading-3 text-amber-900 mb-6">Preguntas Frecuentes</h3>
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
                    <div key={index} className="bg-amber-50 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-900 mb-2">{faq.q}</h4>
                      <p className="text-gray-700">{faq.a}</p>
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
