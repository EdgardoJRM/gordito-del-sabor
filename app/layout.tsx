import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';
import NavbarWrapper from '@/components/layout/NavbarWrapper';
import FloatingEbookCTA from '@/components/ebook/FloatingEbookCTA';

// Clash Display — headings (300–700)
const clashDisplay = localFont({
  src: [
    {
      path: '../public/images/fonts/ClashDisplay-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/images/fonts/ClashDisplay-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/images/fonts/ClashDisplay-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/images/fonts/ClashDisplay-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-clash',
  display: 'swap',
});

// General Sans — texto / UI + italic
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
      path: '../public/images/fonts/GeneralSans-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/images/fonts/GeneralSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/images/fonts/GeneralSans-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/images/fonts/GeneralSans-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
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
