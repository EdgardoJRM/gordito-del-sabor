'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Settings, Menu, X, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';

type NavbarProps = {
  /** Estilo oscuro sobre el hero de la home (transparente + texto claro) */
  overlayHero?: boolean;
};

export default function Navbar({ overlayHero = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const onDark = overlayHero;

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'El Sabor de Papá', href: '/el-sabor-de-papa' },
    { label: 'La Bóveda', href: '/la-boveda' },
    { label: 'Libro', href: '/las-20-recetas-favoritas' },
    { label: 'Sobre nosotros', href: '/sobre-nosotros' },
    { label: 'Patrocinadores', href: '/patrocinadores' },
    { label: 'Preguntas', href: '/preguntas' },
    { label: 'Recetas', href: '/recetas' },
    { label: 'Recetario gratis', href: '/recetario' },
  ];

  return (
    <nav
      className={
        onDark
          ? 'sticky top-0 z-50 bg-[#1A1412]/45 backdrop-blur-md border-b border-white/10 transition-colors duration-300'
          : 'sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-lg border-b border-[#E8E0D8] transition-colors duration-300'
      }
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image
              src={siteConfig.logoPath}
              alt={siteConfig.brandName}
              width={200}
              height={46}
              className="h-9 w-auto max-w-[200px] object-contain"
              priority
            />
            <span className="sr-only">{siteConfig.brandName}</span>
          </Link>

          <div className="hidden xl:flex gap-6 items-center flex-wrap justify-end">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  onDark
                    ? 'nav-text text-[#FAF8F5]/90 hover:text-[#FAF8F5] transition-colors whitespace-nowrap'
                    : 'nav-text text-[#6B5B4E] hover:text-[#1A1412] transition-colors whitespace-nowrap'
                }
              >
                {item.label}
              </Link>
            ))}
            <Button href="/el-sabor-de-papa" size="sm" className="!px-6">
              Ordenar ahora
            </Button>
          </div>

          <div className="flex items-center gap-3 xl:gap-4">
            {(((session?.user as { role?: string })?.role === 'admin') ||
              session?.user?.email === 'admin@gordito.com') && (
              <Link
                href="/admin/dashboard"
                className="text-[#C4472B] hover:text-[#A8381F] font-bold flex items-center gap-1"
              >
                <Settings size={20} />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {session ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/perfil"
                  className={
                    onDark
                      ? 'flex items-center gap-2 text-[#FAF8F5] hover:text-white transition-colors'
                      : 'flex items-center gap-2 text-[#1A1412] hover:text-[#6B5B4E] transition-colors'
                  }
                >
                  <User size={20} />
                  <span className="nav-text font-bold max-w-[120px] truncate">{session.user?.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                  className="text-[#C4472B] hover:text-[#A8381F]"
                  aria-label="Salir"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:inline-block bg-[#C4472B] hover:bg-[#A8381F] text-white px-4 py-2 rounded-full transition-all font-bold text-sm"
              >
                Iniciar sesión
              </Link>
            )}

            <button
              type="button"
              className={onDark ? 'xl:hidden text-[#FAF8F5]' : 'xl:hidden text-[#1A1412]'}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className={
              onDark
                ? 'xl:hidden pb-4 border-t border-white/15 bg-[#1A1412]/98'
                : 'xl:hidden pb-4 border-t border-[#E8E0D8] bg-[#FAF8F5]'
            }
          >
            <div className="flex flex-col gap-1 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    onDark
                      ? 'nav-text block py-2.5 px-1 text-[#FAF8F5]/90 hover:text-[#FAF8F5]'
                      : 'nav-text block py-2.5 px-1 text-[#6B5B4E] hover:text-[#1A1412]'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3">
                <Button href="/el-sabor-de-papa" className="w-full" onClick={() => setIsOpen(false)}>
                  Ordenar ahora
                </Button>
              </div>
            </div>
            {session ? (
              <div
                className={
                  onDark
                    ? 'pt-4 border-t border-white/15 mt-4 space-y-2'
                    : 'pt-4 border-t border-[#E8E0D8] mt-4 space-y-2'
                }
              >
                <Link
                  href="/perfil"
                  className={
                    onDark
                      ? 'flex items-center gap-2 text-[#FAF8F5] hover:text-white py-2 transition-colors'
                      : 'flex items-center gap-2 text-[#1A1412] hover:text-[#6B5B4E] py-2 transition-colors'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} />
                  <span className="font-bold truncate">{session.user?.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut({ redirect: true, callbackUrl: '/' });
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-[#C4472B] hover:text-[#A8381F] py-2 font-bold flex items-center gap-2"
                >
                  <LogOut size={20} />
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className={
                  onDark
                    ? 'block py-3 text-[#E8A090] hover:text-[#FAF8F5] font-bold mt-4 pt-4 border-t border-white/15'
                    : 'block py-3 text-[#C4472B] hover:text-[#A8381F] font-bold mt-4 pt-4 border-t border-[#E8E0D8]'
                }
                onClick={() => setIsOpen(false)}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
