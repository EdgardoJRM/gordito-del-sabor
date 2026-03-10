import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';
import NavbarWrapper from '@/components/NavbarWrapper';

// Clash Display alternative - Inter Bold para headings
const clashDisplay = Inter({ 
  subsets: ['latin'], 
  weight: ['700'],
  variable: '--font-clash' 
});

// General Sans alternative - DM Sans para texto/UI
const generalSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  variable: '--font-general' 
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
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
