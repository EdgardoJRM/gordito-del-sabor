'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Settings, Menu, X, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

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
    { label: 'Recetas', href: '/recetas' },
    { label: 'Recetario', href: '/recetario' },
    { label: 'Categorías', href: '/categorias' },
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Contacto', href: '/contacto' },
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={
                onDark
                  ? 'text-[#FAF8F5] font-bold text-xl tracking-tight'
                  : 'text-[#1A1412] font-bold text-xl tracking-tight'
              }
            >
              El Gordito del Sabor
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  onDark
                    ? 'nav-text text-[#FAF8F5]/90 hover:text-[#FAF8F5] transition-colors'
                    : 'nav-text text-[#6B5B4E] hover:text-[#1A1412] transition-colors'
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side — Auth (tienda/carrito ocultos: sitio informativo + leads) */}
          <div className="flex items-center gap-4">
            {/* Admin Link */}
            {(((session?.user as any)?.role === 'admin') || session?.user?.email === 'admin@gordito.com') && (
              <Link href="/admin/dashboard" className="text-[#C4472B] hover:text-[#A8381F] font-bold flex items-center gap-1">
                <Settings size={20} />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {/* Auth */}
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
                  <span className="nav-text font-bold">{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                  className="text-[#C4472B] hover:text-[#A8381F]"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:inline-block bg-[#C4472B] hover:bg-[#A8381F] text-white px-6 py-2 rounded-full transition-all font-bold text-sm"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className={onDark ? 'md:hidden text-[#FAF8F5]' : 'md:hidden text-[#1A1412]'}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={
              onDark
                ? 'md:hidden pb-4 border-t border-white/15 bg-[#1A1412]/95'
                : 'md:hidden pb-4 border-t border-[#E8E0D8]'
            }
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  onDark
                    ? 'nav-text block py-2 text-[#FAF8F5]/90 hover:text-[#FAF8F5]'
                    : 'nav-text block py-2 text-[#6B5B4E] hover:text-[#1A1412]'
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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
                >
                  <User size={20} />
                  <span className="font-bold">{session.user?.name}</span>
                </Link>
                <button
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
                    ? 'block py-2 text-[#E8A090] hover:text-[#FAF8F5] font-bold mt-4 pt-4 border-t border-white/15'
                    : 'block py-2 text-[#C4472B] hover:text-[#A8381F] font-bold mt-4 pt-4 border-t border-[#E8E0D8]'
                }
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
