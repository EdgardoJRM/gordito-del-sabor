import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://gorditodelsabor.com'),
  title: {
    default: 'El Gordito del Sabor | Recetas Auténticas Puertorriqueñas',
    template: '%s | El Gordito del Sabor',
  },
  description: 'Descubre recetas auténticas puertorriqueñas, desde comida criolla hasta platos gourmet. Aprende a cocinar con El Gordito del Sabor.',
  keywords: [
    'recetas puertorriqueñas',
    'comida criolla',
    'recetas fáciles',
    'cocina puertorriqueña',
    'mofongo',
    'arroz con gandules',
    'recetas caribeñas',
  ],
  authors: [{ name: 'El Gordito del Sabor' }],
  creator: 'El Gordito del Sabor',
  publisher: 'El Gordito del Sabor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_PR',
    url: 'https://gorditodelsabor.com',
    siteName: 'El Gordito del Sabor',
    title: 'El Gordito del Sabor | Recetas Auténticas Puertorriqueñas',
    description: 'Descubre recetas auténticas puertorriqueñas, desde comida criolla hasta platos gourmet.',
    images: [
      {
        url: 'https://gorditodelsabor.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'El Gordito del Sabor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Gordito del Sabor | Recetas Auténticas Puertorriqueñas',
    description: 'Descubre recetas auténticas puertorriqueñas, desde comida criolla hasta platos gourmet.',
    images: ['https://gorditodelsabor.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
