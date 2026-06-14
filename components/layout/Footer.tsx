import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_URLS } from '@/lib/social-links';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1412] border-t border-[#2D2220] text-[#FAF8F5] mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src={siteConfig.logoPath}
                alt={siteConfig.brandName}
                width={220}
                height={50}
                className="h-10 w-auto object-contain brightness-0 invert opacity-95"
              />
            </Link>
            <p className="body-text text-sm text-[#C4B8AE] leading-relaxed">
              Cocinamos con amor, sazón y orgullo boricua. Gracias por ser parte de esta familia.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#FAF8F5]">Tienda y digital</h4>
            <ul className="space-y-2 text-sm text-[#9C8B80]">
              <li>
                <Link href="/el-sabor-de-papa" className="hover:text-[#C4472B] transition">
                  Delantal oficial
                </Link>
              </li>
              <li>
                <Link href="/la-boveda" className="hover:text-[#C4472B] transition">
                  La Bóveda del Sabor
                </Link>
              </li>
              <li>
                <Link href="/las-20-recetas-favoritas" className="hover:text-[#C4472B] transition">
                  Las 20 recetas favoritas
                </Link>
              </li>
              <li>
                <Link href="/recetario" className="hover:text-[#C4472B] transition">
                  Recetario gratis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#FAF8F5]">Marca</h4>
            <ul className="space-y-2 text-sm text-[#9C8B80]">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-[#C4472B] transition">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/patrocinadores" className="hover:text-[#C4472B] transition">
                  Patrocinadores
                </Link>
              </li>
              <li>
                <Link href="/preguntas" className="hover:text-[#C4472B] transition">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/recetas" className="hover:text-[#C4472B] transition">
                  Recetas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#FAF8F5]">Contacto</h4>
            <ul className="space-y-2 text-sm text-[#9C8B80]">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#C4472B] transition">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-[#C4472B] transition">
                  Soporte: {siteConfig.supportEmail}
                </a>
              </li>
              <li className="pt-2">
                <div className="flex flex-wrap gap-4">
                  <a
                    href={SOCIAL_URLS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C4472B] transition"
                  >
                    Facebook
                  </a>
                  <a
                    href={SOCIAL_URLS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C4472B] transition"
                  >
                    Instagram
                  </a>
                  <a
                    href={siteConfig.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C4472B] transition"
                  >
                    TikTok
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2D2220] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#9C8B80] gap-4">
            <p>
              &copy; {currentYear} {siteConfig.brandName}. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/privacidad" className="hover:text-[#C4472B] transition">
                Política de privacidad
              </Link>
              <Link href="/terminos" className="hover:text-[#C4472B] transition">
                Términos y condiciones
              </Link>
              <Link href="/contacto" className="hover:text-[#C4472B] transition">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
