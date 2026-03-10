'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Settings, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/lib/cart-store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const cartItems = useCartStore((state) => state.items);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Recetas', href: '/recetas' },
    { label: 'Categorías', href: '/categorias' },
    { label: 'Tienda', href: '/tienda' },
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-900">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-white font-bold text-xl tracking-tight">
              El Gordito del Sabor
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-text text-[#A1A1A6] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Cart and Auth */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/carrito" className="relative text-[#A1A1A6] hover:text-white">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF3B30] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Admin Link */}
            {session?.user?.email === 'admin@gordito.com' && (
              <Link href="/admin/dashboard" className="text-[#FF3B30] hover:text-[#FF453A] font-bold flex items-center gap-1">
                <Settings size={20} />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {/* Auth */}
            {session ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/perfil" className="flex items-center gap-2 text-white hover:text-[#A1A1A6] transition-colors">
                  <User size={20} />
                  <span className="nav-text font-bold">{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                  className="text-[#FF3B30] hover:text-[#FF453A]"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:inline-block bg-[#FF3B30] hover:bg-[#FF453A] text-white px-6 py-2 rounded-full transition-all font-bold text-sm"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-900">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-text block py-2 text-[#A1A1A6] hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <div className="pt-4 border-t border-gray-900 mt-4 space-y-2">
                <Link href="/perfil" className="flex items-center gap-2 text-white hover:text-[#A1A1A6] py-2 transition-colors">
                  <User size={20} />
                  <span className="font-bold">{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => {
                    signOut({ redirect: true, callbackUrl: '/' });
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-[#FF3B30] hover:text-[#FF453A] py-2 font-bold flex items-center gap-2"
                >
                  <LogOut size={20} />
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="block py-2 text-[#FF3B30] hover:text-[#FF453A] font-bold mt-4 pt-4 border-t border-gray-900"
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
