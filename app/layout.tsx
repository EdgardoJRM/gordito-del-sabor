import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';
import NavbarWrapper from '@/components/NavbarWrapper';
import FloatingEbookCTA from '@/components/FloatingEbookCTA';

// Clash Display - Para headings
const clashDisplay = localFont({
  src: [
    {
      path: '../public/images/fonts/ClashDisplay-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-clash',
  display: 'swap',
});

// General Sans - Para texto/UI
const generalSans = localFont({
  src: [
    {
      path: '../public/images/fonts/GeneralSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/images/fonts/GeneralSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/images/fonts/GeneralSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-general',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'El Gordito del Sabor | Recetas Auténticas Puertorriqueñas',
  description: 'Descubre recetas auténticas puertorriqueñas, desde comida criolla hasta platos gourmet. Aprende a cocinar con El Gordito del Sabor.',
  keywords: 'recetas puertorriqueñas, comida criolla, recetas fáciles, cocina puertorriqueña',
  openGraph: {
    title: 'El Gordito del Sabor | Recetas Auténticas Puertorriqueñas',
    description: 'Descubre recetas auténticas puertorriqueñas, desde comida criolla hasta platos gourmet.',
    type: 'website',
    locale: 'es_PR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${generalSans.className} ${clashDisplay.variable} ${generalSans.variable}`}>
        <AuthProvider>
          <NavbarWrapper />
          <FloatingEbookCTA />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
