'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const lead = searchParams.get('lead');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(
    lead === 'ebook' ? 'Descargar recetario: Las 20 Recetas Favoritas del Sabor' : ''
  );
  const [message, setMessage] = useState(
    lead === 'ebook'
      ? 'Quiero recibir el recetario con las 20 recetas favoritas del Gordito.'
      : ''
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone: lead === 'ebook' ? phone : undefined,
          source: lead === 'ebook' ? 'ebook' : 'contact',
          message: lead === 'ebook' ? undefined : `${subject}\n\n${message}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError('Ocurrió un error al enviar tu información. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const isEbookLead = lead === 'ebook';

  return (
    <div className="lg:col-span-2">
      {isEbookLead && (
        <div className="mb-8 rounded-2xl border border-[#FF3B30]/40 bg-[#1C1C1E] px-6 py-4">
          <p className="body-text text-sm">
            Estás a un paso de recibir el recetario{' '}
            <span className="text-white font-bold">"Las 20 Recetas Favoritas del Sabor"</span>.
            Déjanos tu nombre, correo y teléfono y te lo enviamos por email.
          </p>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {isEbookLead ? (
          // Ebook form - simplified with name, email, phone
          <>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-white mb-3 uppercase tracking-wide">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-6 py-4 bg-[#1C1C1E] border border-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF3B30] focus:border-transparent text-white placeholder-[#6E6E73]"
                placeholder="+1 (787) XXX-XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        ) : (
          // Contact form - full form with subject and message
          <>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </>
        )}

        {error && (
          <p className="text-[#FF3B30] body-text text-sm">
            {error}
          </p>
        )}

        {submitted && !error && (
          <p className="text-green-400 body-text text-sm">
            ¡Gracias! Hemos recibido tu información. {isEbookLead && 'Revisa tu email para descargar el recetario.'}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-text w-full bg-[#FF3B30] hover:bg-[#FF453A] text-white py-4 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? 'Enviando...' : isEbookLead ? 'Recibir recetario' : 'Enviar Mensaje'}
        </button>
      </form>
    </div>
  );
}
