'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Filter } from 'lucide-react';

type Lead = {
  _id: string;
  name?: string;
  email: string;
  source: 'ebook' | 'contact' | 'newsletter';
  message?: string;
  createdAt?: string;
};

const sourceLabels: Record<Lead['source'], string> = {
  ebook: 'Ebook',
  contact: 'Contacto',
  newsletter: 'Newsletter',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Lead['source']>('all');

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const res = await fetch('/api/admin/leads');
        const data = await res.json();
        setLeads(data.leads || []);
      } catch (error) {
        console.error('Error loading leads:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  const filteredLeads =
    filter === 'all' ? leads : leads.filter((lead) => lead.source === filter);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="container-custom py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-amber-900">Leads</h1>
          <Link href="/admin/dashboard" className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-2">
            <ArrowLeft size={20} />
            Volver al panel
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter size={18} />
              <span className="font-semibold text-sm">Filtrar por origen</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'ebook', label: 'Ebook' },
                { id: 'newsletter', label: 'Newsletter' },
                { id: 'contact', label: 'Contacto' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFilter(option.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    filter === option.id
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4" />
              <p className="text-gray-600">Cargando leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Mail size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No hay leads registrados aún.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Nombre</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Origen</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Fecha</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Mensaje (resumen)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-b border-gray-200 hover:bg-gray-50 align-top"
                    >
                      <td className="px-6 py-4 text-gray-900">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-amber-700 hover:text-amber-900 underline-offset-2 hover:underline"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {lead.name || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lead.source === 'ebook'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : lead.source === 'newsletter'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-green-50 text-green-700 border border-green-200'
                          }`}
                        >
                          {sourceLabels[lead.source]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 text-sm">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString('es-ES')
                          : '—'}
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm max-w-md">
                        {lead.message
                          ? lead.message.split('\n').slice(0, 2).join(' ').slice(0, 140) +
                            (lead.message.length > 140 ? '…' : '')
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

