'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';

const initial = {
  name: '',
  email: '',
  phone: '',
  brand: '',
  website: '',
  productType: '',
  goal: '',
  budget: '',
  date: '',
  message: '',
};

export default function SponsorInquiryForm() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const message = [
        `Marca: ${form.brand}`,
        `Web/IG: ${form.website}`,
        `Tipo de producto: ${form.productType}`,
        `Objetivo: ${form.goal}`,
        `Presupuesto estimado: ${form.budget}`,
        `Fecha deseada: ${form.date}`,
        '',
        form.message,
      ].join('\n');

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          source: 'sponsor',
          message,
        }),
      });
      if (!res.ok) throw new Error('fail');
      setDone(true);
      setForm(initial);
    } catch {
      setError('No se pudo enviar. Intenta de nuevo o escríbenos por email.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-[#E8E0D8] bg-[#FAF8F5] p-10 text-center shadow-sm">
        <p className="text-xl font-bold text-[#1A1412] mb-2">Listo. Recibimos tu solicitud.</p>
        <p className="body-text">
          Revisamos propuestas con calma. Si hace match con la comunidad, te respondemos por email.
        </p>
        <Button className="mt-8" variant="secondary" onClick={() => setDone(false)}>
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-[#E8E0D8] bg-white px-4 py-3 text-[#1A1412] placeholder:text-[#9C8B80] focus:border-[#C4472B] focus:outline-none focus:ring-2 focus:ring-[#C4472B]/25';

  return (
    <form onSubmit={onSubmit} className="rounded-2xl md:rounded-3xl border border-[#E8E0D8] bg-[#FAF8F5] p-8 md:p-10 shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-[#1A1412]">Solicitud para marcas</h2>
      <p className="body-text text-sm">
        También puedes escribir directo a{' '}
        <a className="text-[#C4472B] font-bold hover:underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
        .
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Nombre completo *</label>
          <input required name="name" value={form.name} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Email *</label>
          <input required type="email" name="email" value={form.email} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Teléfono</label>
          <input name="phone" value={form.phone} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Nombre de la marca *</label>
          <input required name="brand" value={form.brand} onChange={onChange} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Website / Instagram *</label>
          <input required name="website" value={form.website} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Tipo de producto *</label>
          <input required name="productType" value={form.productType} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Objetivo de campaña *</label>
          <input required name="goal" value={form.goal} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Presupuesto estimado *</label>
          <select required name="budget" value={form.budget} onChange={onChange} className={inputClass}>
            <option value="">Selecciona…</option>
            <option value="$1.5K–$3K">$1.5K – $3K</option>
            <option value="$3K–$8K">$3K – $8K</option>
            <option value="$8K+">$8K+</option>
            <option value="A medida / mensual">A medida / mensual</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Fecha deseada</label>
          <input name="date" value={form.date} onChange={onChange} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-[#1A1412] mb-2">Mensaje *</label>
          <textarea
            required
            name="message"
            value={form.message}
            onChange={onChange}
            rows={5}
            className={inputClass}
            placeholder="Cuéntanos qué quieres lograr, restricciones legales, y si buscas exclusividad por categoría."
          />
        </div>
      </div>
      {error && <p className="text-sm text-[#C4472B] font-bold">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Enviando…' : 'Enviar solicitud'}
      </Button>
    </form>
  );
}
