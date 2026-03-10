import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 text-white mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-montserrat text-xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">El Gordito del Sabor</h3>
            <p className="font-lora text-gray-400 text-sm leading-relaxed">
              Recetas auténticas puertorriqueñas con un toque gourmet. Aprende a cocinar con pasión y sabor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/recetas" className="hover:text-amber-400 transition">Recetas</Link></li>
              <li><Link href="/categorias" className="hover:text-amber-400 transition">Categorías</Link></li>
              <li><Link href="/tienda" className="hover:text-amber-400 transition">Tienda</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-amber-400 transition">Sobre Nosotros</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-poppins font-semibold mb-4 text-white">Categorías</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/categorias/comida-criolla" className="hover:text-amber-400 transition">Comida Criolla</Link></li>
              <li><Link href="/categorias/carnes" className="hover:text-amber-400 transition">Carnes</Link></li>
              <li><Link href="/categorias/marisco" className="hover:text-amber-400 transition">Marisco</Link></li>
              <li><Link href="/categorias/postres" className="hover:text-amber-400 transition">Postres</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold mb-4 text-white">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@gorditodelsabor.com</li>
              <li>Teléfono: +1 (787) XXX-XXXX</li>
              <li className="pt-2">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-amber-400 transition">Facebook</a>
                  <a href="#" className="hover:text-amber-400 transition">Instagram</a>
                  <a href="#" className="hover:text-amber-400 transition">YouTube</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {currentYear} El Gordito del Sabor. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacidad" className="hover:text-amber-400 transition">Política de Privacidad</Link>
              <Link href="/terminos" className="hover:text-amber-400 transition">Términos y Condiciones</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
