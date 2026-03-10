import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat, Poppins, Lora } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';
import NavbarWrapper from '@/components/NavbarWrapper';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

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
      <body className={`${inter.className} ${playfair.variable} ${montserrat.variable} ${poppins.variable} ${lora.variable}`}>
        <AuthProvider>
          <NavbarWrapper />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
