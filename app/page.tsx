import type { Metadata } from 'next';
import {
  ComfortHomeHero,
  ComfortHomeWhy,
  ComfortHomeHow,
  ComfortHomeTrust,
} from '@/components/sections/comfort/ComfortHome';

export const metadata: Metadata = {
  title: 'El Gordito del Sabor | Delantal personalizado para papá',
  description:
    'Regala el delantal personalizado de El Gordito del Sabor. Edición Día de los Padres, stock en mano, bordado con nombre y pago seguro.',
  openGraph: {
    title: 'Delantal personalizado para papá | El Gordito del Sabor',
    description: 'Solo 100 unidades. Ordena hoy con bordado personalizado.',
    type: 'website',
    locale: 'es_PR',
  },
};

export default function Home() {
  return (
    <>
      <ComfortHomeHero />
      <ComfortHomeWhy />
      <ComfortHomeHow />
      <ComfortHomeTrust />
    </>
  );
}
