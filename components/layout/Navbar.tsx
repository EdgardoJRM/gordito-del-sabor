'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Settings, Menu, X, User, LogOut, CircleHelp, type LucideIcon } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';
import BrandLogo from '@/components/shared/BrandLogo';
import { siteConfig } from '@/lib/site-config';

type NavbarProps = {
  overlayHero?: boolean;
  /** false cuando el nav va dentro del shell sticky con la barra de inventario */
  pinOnScroll?: boolean;
};

const navItems: { label: string; href: string; icon?: LucideIcon }[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Delantal de Papá', href: '/el-sabor-de-papa' },
  { label: 'Recetas', href: '/recetas' },
  { label: 'Preguntas', href: '/preguntas', icon: CircleHelp },
];

export default function Navbar({ overlayHero = false, pinOnScroll = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const onDark = overlayHero;
  const positionClass = pinOnScroll ? 'sticky top-0 z-50' : 'relative';

  return (
    <nav
      className={
        onDark
          ? `${positionClass} bg-[#1A1412]/45 backdrop-blur-md border-b border-white/10 transition-colors duration-300`
          : `${positionClass} bg-[#FAF8F5]/95 backdrop-blur-lg border-b border-[#E8E0D8] transition-colors duration-300`
      }
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <BrandLogo
              width={64}
              height={64}
              className="h-14 w-14 md:h-16 md:w-16"
              imageClassName="h-full w-full object-contain"
              priority
            />
            <span className="sr-only">{siteConfig.brandName}</span>
          </Link>

          <div className="hidden lg:flex gap-8 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  onDark
                    ? 'nav-text inline-flex items-center gap-1.5 text-[#FAF8F5]/90 hover:text-[#FAF8F5] transition-colors'
                    : 'nav-text inline-flex items-center gap-1.5 text-[#6B5B4E] hover:text-[#1A1412] transition-colors'
                }
              >
                {Icon ? <Icon size={18} aria-hidden /> : null}
                {item.label}
              </Link>
            );
            })}
            <Button href="/el-sabor-de-papa" size="lg">
              Ordenar delantal
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {(((session?.user as { role?: string })?.role === 'admin') ||
              session?.user?.email === 'admin@gordito.com') && (
              <Link
                href="/admin/dashboard"
                className="text-[#C4472B] hover:text-[#A8381F] font-bold flex items-center gap-1"
                aria-label="Panel de administración"
              >
                <Settings size={22} />
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
                  <User size={22} />
                  <span className="nav-text font-bold max-w-[140px] truncate">{session.user?.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                  className="nav-text text-[#C4472B] hover:text-[#A8381F] font-bold flex items-center gap-1"
                >
                  <LogOut size={22} />
                  <span>Salir</span>
                </button>
              </div>
            ) : null}

            <button
              type="button"
              className={onDark ? 'lg:hidden text-[#FAF8F5] p-2' : 'lg:hidden text-[#1A1412] p-2'}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className={
              onDark
                ? 'lg:hidden pb-6 border-t border-white/15 bg-[#1A1412]/98'
                : 'lg:hidden pb-6 border-t border-[#E8E0D8] bg-[#FAF8F5]'
            }
          >
            <div className="flex flex-col gap-1 pt-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    onDark
                      ? 'nav-text flex items-center gap-2 py-3 px-2 text-[#FAF8F5] hover:bg-white/5 rounded-lg'
                      : 'nav-text flex items-center gap-2 py-3 px-2 text-[#1A1412] hover:bg-[#F2EDE6] rounded-lg'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {Icon ? <Icon size={20} aria-hidden /> : null}
                  {item.label}
                </Link>
              );
              })}
              <div className="pt-4">
                <Button href="/el-sabor-de-papa" size="lg" className="w-full" onClick={() => setIsOpen(false)}>
                  Ordenar delantal
                </Button>
              </div>
            </div>
            {session && (
              <div className="pt-4 mt-4 border-t border-[#E8E0D8] space-y-2">
                <Link
                  href="/perfil"
                  className="nav-text flex items-center gap-2 py-3 text-[#1A1412]"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={22} />
                  {session.user?.name}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    signOut({ redirect: true, callbackUrl: '/' });
                    setIsOpen(false);
                  }}
                  className="nav-text w-full text-left text-[#C4472B] py-3 font-bold flex items-center gap-2"
                >
                  <LogOut size={22} />
                  Salir
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
