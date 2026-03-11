import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | El Gordito del Sabor',
  description: 'Términos y condiciones de uso del sitio web y servicios de El Gordito del Sabor.',
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-black">
      <section className="bg-black border-b border-gray-900 py-8">
        <div className="container-custom">
          <Link href="/" className="inline-flex items-center gap-2 text-[#A1A1A6] hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span className="nav-text">Volver al inicio</span>
          </Link>
          <h1 className="heading-section text-white mb-6">Términos y Condiciones</h1>
          <p className="body-text text-[#A1A1A6]">Última actualización: {new Date().toLocaleDateString('es-PR')}</p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom max-w-3xl">
          <div className="body-text text-[#A1A1A6] space-y-8">
            <div>
              <h2 className="text-white font-bold text-lg mb-2">1. Aceptación</h2>
              <p>Al acceder y usar el sitio web de El Gordito del Sabor («el Sitio») aceptas estos términos y condiciones. Si no estás de acuerdo, no uses el Sitio.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">2. Uso del Sitio</h2>
              <p>El Sitio ofrece recetas, contenido culinario, suscripción a boletín, descarga de materiales (p. ej. recetario) y, en su caso, compra de productos. Te comprometes a usar el Sitio de forma lícita, sin dañar el servicio ni a otros usuarios.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">3. Contenido y propiedad intelectual</h2>
              <p>Los textos, recetas, imágenes y demás contenido del Sitio son propiedad de El Gordito del Sabor o se usan con licencia. No está permitida la reproducción, distribución o uso comercial sin autorización previa.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">4. Cuenta y registro</h2>
              <p>Si creas una cuenta, eres responsable de mantener la confidencialidad de tus credenciales y de las actividades realizadas con tu cuenta. Debes proporcionar información veraz y actualizada.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">5. Compras y pagos</h2>
              <p>Las compras realizadas en el Sitio están sujetas a disponibilidad y a las condiciones indicadas en el proceso de compra. Los pagos se procesan mediante proveedores seguros. Las políticas de envío, devolución o reembolso se indicarán en la tienda o al contactarnos.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">6. Limitación de responsabilidad</h2>
              <p>El contenido del Sitio (recetas, consejos, etc.) tiene fines informativos y de entretenimiento. No nos hacemos responsables de daños derivados del uso del Sitio o de la aplicación de las recetas. Para temas de salud o alergias, consulta siempre a un profesional.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">7. Modificaciones</h2>
              <p>Podemos modificar estos términos en cualquier momento. Los cambios entrarán en vigor al publicarlos en el Sitio. El uso continuado del Sitio tras los cambios implica la aceptación de los nuevos términos.</p>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg mb-2">8. Contacto</h2>
              <p>Para dudas sobre estos términos: info@gorditodelsabor.com.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
