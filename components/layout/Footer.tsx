import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_URLS } from '@/lib/social-links';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1412] border-t border-[#2D2220] text-[#FAF8F5] mt-12">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src={siteConfig.logoPath}
                alt={siteConfig.brandName}
                width={72}
                height={72}
                className="h-16 w-16 md:h-[4.5rem] md:w-[4.5rem] object-contain"
              />
            </Link>
            <p className="body-text text-[#C4B8AE] text-lg leading-relaxed max-w-md">
              Sazón boricua de verdad. Gracias por ser parte de esta familia.
            </p>
            <p className="mt-4 text-lg text-[#9C8B80]">
              {siteConfig.stats.instagram} en Instagram
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-5 text-[#FAF8F5]">¿Necesitas ayuda para ordenar?</h4>
            <ul className="space-y-4 text-lg text-[#C4B8AE]">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[#C4472B] transition underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="hover:text-[#C4472B] transition"
                >
                  Soporte: {siteConfig.supportEmail}
                </a>
              </li>
              <li>
                <Link href="/preguntas" className="hover:text-[#C4472B] transition font-bold">
                  Ver preguntas frecuentes
                </Link>
              </li>
            </ul>
            <div className="flex flex-wrap gap-5 mt-6 text-base">
              <a href={SOCIAL_URLS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#C4472B]">
                Facebook
              </a>
              <a href={SOCIAL_URLS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#C4472B]">
                Instagram
              </a>
              <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-[#C4472B]">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2D2220] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-base text-[#9C8B80]">
          <p>
            &copy; {currentYear} {siteConfig.brandName}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/el-sabor-de-papa" className="hover:text-[#C4472B] font-bold">
              Delantal de Papá
            </Link>
            <Link href="/recetas" className="hover:text-[#C4472B]">
              Recetas
            </Link>
            <Link href="/privacidad" className="hover:text-[#C4472B]">
              Privacidad
            </Link>
            <Link href="/contacto" className="hover:text-[#C4472B]">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
