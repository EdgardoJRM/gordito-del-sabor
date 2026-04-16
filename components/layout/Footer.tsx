import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1412] border-t border-[#2D2220] text-[#FAF8F5] mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-montserrat text-xl font-bold mb-4 text-[#FAF8F5]">El Gordito del Sabor</h3>
            <p className="font-lora text-[#9C8B80] text-sm leading-relaxed">
              Recetas auténticas puertorriqueñas con un toque gourmet. Aprende a cocinar con pasión y sabor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold mb-4 text-[#FAF8F5]">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-[#9C8B80]">
              <li><Link href="/recetas" className="hover:text-[#C4472B] transition">Recetas</Link></li>
              <li><Link href="/recetario" className="hover:text-[#C4472B] transition">Recetario</Link></li>
              <li><Link href="/categorias" className="hover:text-[#C4472B] transition">Categorías</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-[#C4472B] transition">Sobre Nosotros</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-poppins font-semibold mb-4 text-[#FAF8F5]">Categorías</h4>
            <ul className="space-y-2 text-sm text-[#9C8B80]">
              <li><Link href="/categorias/comida-criolla" className="hover:text-[#C4472B] transition">Comida Criolla</Link></li>
              <li><Link href="/categorias/carnes" className="hover:text-[#C4472B] transition">Carnes</Link></li>
              <li><Link href="/categorias/marisco" className="hover:text-[#C4472B] transition">Marisco</Link></li>
              <li><Link href="/categorias/postres" className="hover:text-[#C4472B] transition">Postres</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold mb-4 text-[#FAF8F5]">Contacto</h4>
            <ul className="space-y-2 text-sm text-[#9C8B80]">
              <li>Email: info@gorditodelsabor.com</li>
              <li>Teléfono: +1 (787) XXX-XXXX</li>
              <li className="pt-2">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-[#C4472B] transition">Facebook</a>
                  <a href="#" className="hover:text-[#C4472B] transition">Instagram</a>
                  <a href="#" className="hover:text-[#C4472B] transition">YouTube</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2D2220] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#9C8B80]">
            <p>&copy; {currentYear} El Gordito del Sabor. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacidad" className="hover:text-[#C4472B] transition">Política de Privacidad</Link>
              <Link href="/terminos" className="hover:text-[#C4472B] transition">Términos y Condiciones</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
