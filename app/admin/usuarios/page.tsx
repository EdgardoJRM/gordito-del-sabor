'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, Mail, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdminUsuarios() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setChecking(false);
      return;
    }

    if (status === 'authenticated') {
      const checkAdmin = async () => {
        try {
          const res = await fetch('/api/admin/check');
          const data = await res.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin:', error);
          setIsAdmin(false);
        } finally {
          setChecking(false);
        }
      };

      checkAdmin();
    }
  }, [status]);

  if (status === 'loading' || checking) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated' || !isAdmin) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Acceso Denegado</h1>
          <Link href="/" className="text-amber-600 hover:text-amber-700">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6">
            <ArrowLeft size={20} />
            Volver al Dashboard
          </Link>
          <h1 className="font-montserrat text-3xl font-bold text-amber-900">Gestión de Usuarios</h1>
        </div>
      </header>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h2 className="font-montserrat text-2xl font-bold text-amber-900 mb-6">Usuarios Registrados</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Nombre</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Fecha de Registro</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">
                      <div className="font-poppins font-semibold">Sin datos</div>
                      <p className="text-sm text-gray-600">Los usuarios aparecerán aquí</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">--</td>
                    <td className="px-6 py-4 text-gray-600">--</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-lora text-blue-800">
                💡 <span className="font-semibold">Nota:</span> Los datos de usuarios se guardarán cuando se conecte a una base de datos. 
                Actualmente, los usuarios se almacenan en memoria durante la sesión.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
