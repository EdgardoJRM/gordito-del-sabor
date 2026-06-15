import type { Metadata } from 'next';
import {
  ComfortHomeHero,
  ComfortHomeWhy,
  ComfortHomeHow,
  ComfortHomeTrust,
} from '@/components/sections/comfort/ComfortHome';

export const metadata: Metadata = {
  title: 'El Gordito del Sabor | El Sabor de Papá — Delantal personalizado',
  description:
    'Regala un legado, no solo un delantal. Edición Día de los Padres: 100 unidades, bordado con nombre, recogida garantizada en Área Metro y pago seguro.',
  openGraph: {
    title: 'El Sabor de Papá | Delantal personalizado',
    description: 'Solo 100 unidades. Bordado a mano. Recogida garantizada antes del Domingo.',
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
