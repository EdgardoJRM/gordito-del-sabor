import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad | El Gordito del Sabor',
  description: 'Política de privacidad y protección de datos de El Gordito del Sabor.',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-black">
      <section className="bg-black border-b border-gray-900 py-8">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#A1A1A6] hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-white mb-6">Política de Privacidad</h1>
          <p className="body-text text-[#A1A1A6]">Última actualización: {new Date().toLocaleDateString('es-PR')}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom max-w-3xl">
          <div className="body-text text-[#A1A1A6] space-y-8">
            <div>
              <h2 className="text-white font-bold text-lg mb-2">1. Responsable del tratamiento</h2>
              <p>El Gordito del Sabor («nosotros», «nuestro») es el responsable del tratamiento de los datos personales que nos proporciones al usar este sitio web, registrarte, suscribirte al boletín o contactarnos.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">2. Datos que recogemos</h2>
              <p>Podemos recoger: nombre, correo electrónico, datos de acceso (si creas cuenta), preferencias (por ejemplo recetas favoritas) y datos de uso del sitio. En compras, los datos de pago los procesa nuestro proveedor de pagos (Stripe) y no almacenamos datos completos de tarjeta.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">3. Uso de los datos</h2>
              <p>Utilizamos tus datos para: gestionar tu cuenta, enviar el boletín o el recetario si lo solicitas, procesar pedidos, responder contacto y mejorar el sitio. No vendemos tus datos a terceros.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">4. Cookies y tecnologías similares</h2>
              <p>El sitio puede usar cookies y almacenamiento local para sesión, preferencias y análisis. Puedes configurar tu navegador para limitar o bloquear cookies.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">5. Tus derechos</h2>
              <p>Puedes solicitar acceso, rectificación, supresión o portabilidad de tus datos, o limitar su tratamiento, contactándonos a info@gorditodelsabor.com. Si consideras que el tratamiento no es correcto, tienes derecho a presentar una reclamación ante la autoridad de protección de datos que corresponda.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">6. Contacto</h2>
              <p>Para cualquier duda sobre esta política: info@gorditodelsabor.com.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
