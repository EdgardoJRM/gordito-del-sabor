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
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-playfair font-bold text-lg">G</span>
            </div>
            <span className="font-playfair font-bold text-xl text-amber-900 hidden sm:inline">
              El Gordito del Sabor
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Cart and Auth */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/carrito" className="relative text-gray-700 hover:text-amber-600">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Admin Link */}
            {session?.user?.email === 'admin@gordito.com' && (
              <Link href="/admin/dashboard" className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1">
                <Settings size={20} />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {/* Auth */}
            {session ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/perfil" className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors">
                  <User size={20} />
                  <span className="font-semibold text-sm">{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden md:inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all font-semibold text-sm"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-amber-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <div className="pt-4 border-t mt-4 space-y-2">
                <Link href="/perfil" className="flex items-center gap-2 text-amber-900 hover:text-amber-700 py-2 transition-colors">
                  <User size={20} />
                  <span className="font-semibold">{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => {
                    signOut({ redirect: true, callbackUrl: '/' });
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-red-600 hover:text-red-700 py-2 font-semibold flex items-center gap-2"
                >
                  <LogOut size={20} />
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="block py-2 text-amber-600 hover:text-amber-700 font-semibold mt-4 pt-4 border-t"
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
