import type { Metadata } from 'next';
import {
  ComfortHomeHero,
  ComfortHomeProduct,
  ComfortHomeRecetas,
  ComfortHomeTrust,
} from '@/components/sections/comfort/ComfortHome';
import { papaProductName } from '@/lib/papa-event';

export const metadata: Metadata = {
  title: `El Gordito del Sabor | ${papaProductName}`,
  description:
    'Recetas boricuas con sazón de verdad y delantal personalizado hecho en Puerto Rico.',
  openGraph: {
    title: `El Gordito del Sabor`,
    description: 'Recetas, comunidad y delantal personalizado.',
    type: 'website',
    locale: 'es_PR',
  },
};

export default function Home() {
  return (
    <>
      <ComfortHomeHero />
      <ComfortHomeProduct />
      <ComfortHomeRecetas />
      <ComfortHomeTrust />
    </>
  );
}
