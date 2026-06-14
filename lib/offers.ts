import { siteConfig } from '@/lib/site-config';

export type OfferId = 'delantal' | 'fundadores' | 'bovedaDigital' | 'bovedaFundador' | 'club' | 'libro';

export type Offer = {
  id: OfferId;
  title: string;
  subtitle?: string;
  priceLabel: string;
  /** Texto debajo del precio, ej. + envío */
  priceNote?: string;
  badge?: string;
  recommended?: boolean;
  bullets: string[];
  ctaLabel: string;
  checkoutKey: keyof typeof siteConfig.checkout | null;
};

export const offers: Record<OfferId, Offer> = {
  delantal: {
    id: 'delantal',
    title: 'Delantal oficial “Esto es bello”',
    subtitle: 'Preventa — primera producción para la comunidad',
    priceLabel: '$29.99',
    priceNote: '+ envío',
    bullets: [
      'Diseño exclusivo de la marca',
      'Material resistente y cómodo para cocinar seguido',
      'Ebook digital de cortesía al completar la orden',
      '10% OFF en tu próxima compra oficial',
      `Entrega aproximada: ${siteConfig.presale.deliveryWeeksApprox} semanas (producción por ronda)`,
    ],
    ctaLabel: 'Reservar mi delantal ahora',
    checkoutKey: 'delantal',
  },
  fundadores: {
    id: 'fundadores',
    title: 'Edición Fundadores',
    subtitle: 'Delantal + acceso fundador + beneficios de comunidad',
    priceLabel: '$57',
    priceNote: '+ envío',
    badge: 'Más valor — recomendado',
    recommended: true,
    bullets: [
      'Todo lo del Delantal oficial',
      'Acceso fundador a La Bóveda del Sabor (recetas organizadas, listas, contenido premium)',
      'Ebook digital y prioridad en futuros lanzamientos',
      '10% OFF en productos oficiales',
      `Misma ventana de entrega del delantal (~${siteConfig.presale.deliveryWeeksApprox} semanas)`,
    ],
    ctaLabel: 'Quiero la Edición Fundadores',
    checkoutKey: 'fundadores',
  },
  bovedaDigital: {
    id: 'bovedaDigital',
    title: 'La Bóveda — digital solo',
    subtitle: 'Recetas y guías en un solo lugar',
    priceLabel: '$27',
    priceNote: 'precio fundador (ajustable)',
    bullets: [
      '20 recetas favoritas en formato digital + estructura para crecer',
      'Listas de compra por receta',
      'Tips y notas del Gordito',
      'Acceso desde celular, tablet o computadora',
    ],
    ctaLabel: 'Acceso digital',
    checkoutKey: 'boveda',
  },
  bovedaFundador: {
    id: 'bovedaFundador',
    title: 'Acceso Fundador',
    subtitle: 'La Bóveda del Sabor — edición inicial',
    priceLabel: '$37',
    priceNote: 'luego $67',
    badge: 'Fundadores',
    recommended: false,
    bullets: [
      'Todo lo del plan digital',
      'Videos paso a paso (lanzamiento progresivo)',
      'Actualizaciones y recetas bonus',
      '10% OFF en delantal oficial al comprar bundle',
    ],
    ctaLabel: 'Quiero acceso fundador',
    checkoutKey: 'boveda',
  },
  club: {
    id: 'club',
    title: 'Club Esto es bello',
    subtitle: 'Comunidad + contenido premium (próximamente)',
    priceLabel: 'Por anunciar',
    bullets: [
      'Contenido recurrente y sazón de verdad',
      'Prioridad en lanzamientos',
      'Beneficios para quienes ya cocinan con nosotros',
    ],
    ctaLabel: 'Avísame cuando abra',
    checkoutKey: null,
  },
  libro: {
    id: 'libro',
    title: 'Las 20 Recetas Favoritas del Sabor',
    subtitle: 'Libro / ebook digital',
    priceLabel: '$19.99',
    priceNote: 'o $27 según campaña',
    bullets: [
      '20 recetas con pasos claros',
      'Ingredientes accesibles',
      'PDF para cocinar donde sea',
      'Compatible con bundle del delantal',
    ],
    ctaLabel: 'Quiero el libro ahora',
    checkoutKey: 'libro',
  },
};

export function checkoutHref(key: keyof typeof siteConfig.checkout): string {
  const url = siteConfig.checkout[key];
  if (!url || url.startsWith('PEGAR_')) return '#checkout';
  return url;
}
