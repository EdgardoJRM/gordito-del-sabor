import { siteConfig } from '@/lib/site-config';

export type PapaBundleId = 'premium' | 'vip' | 'legado';

export type PapaBundle = {
  id: PapaBundleId;
  title: string;
  price: number;
  priceLabel: string;
  apronCount: number;
  badge?: string;
  recommended?: boolean;
  bullets: string[];
};

export const PAPA_EVENT_ID = 'el-sabor-de-papa-2026';

export const papaEvent = {
  id: PAPA_EVENT_ID,
  slug: '/el-sabor-de-papa',
  totalAprons: 100,
  maxEmbroideryChars: 15,
  orderDeadlineLabel: '14 de junio de 2026',
  fathersDayLabel: '15 de junio de 2026 (Día de los Padres)',
  socialProof: `${siteConfig.stats.instagram} seguidores confían en nuestro sabor`,
} as const;

export const papaBundles: Record<PapaBundleId, PapaBundle> = {
  premium: {
    id: 'premium',
    title: 'Premium',
    price: 49.99,
    priceLabel: '$49.99',
    apronCount: 1,
    bullets: [
      'Delantal personalizado con bordado',
      'Recetario digital de El Gordito (PDF)',
      'Envío por USPS Priority Mail en PR',
    ],
  },
  vip: {
    id: 'vip',
    title: 'VIP',
    price: 59.99,
    priceLabel: '$59.99',
    apronCount: 1,
    badge: 'Más popular',
    recommended: true,
    bullets: [
      'Delantal personalizado con bordado',
      'Recetario digital de El Gordito',
      'Video de saludo personalizado de El Gordito para papá',
      'Envío prioritario en Puerto Rico',
    ],
  },
  legado: {
    id: 'legado',
    title: 'Legado',
    price: 84.99,
    priceLabel: '$84.99',
    apronCount: 2,
    bullets: [
      '2 delantales personalizados (papá e hijo/a)',
      'Recetario digital de El Gordito',
      'Ideal para regalar en pareja — mismo sazón, dos nombres',
      'Envío por USPS Priority Mail en PR',
    ],
  },
};

export const papaBenefits = [
  {
    icon: 'pencil' as const,
    title: 'Personalización total',
    text: 'Bordamos el nombre de papá o su frase favorita (máx. 15 caracteres).',
  },
  {
    icon: 'shield' as const,
    title: 'Calidad premium',
    text: 'Tela resistente al calor y las manchas, hecha para durar en la cocina.',
  },
  {
    icon: 'heart' as const,
    title: 'Regalo con alma',
    text: 'No es un objeto más. Es reconocimiento a su sazón y su legado.',
  },
  {
    icon: 'clock' as const,
    title: 'Envío garantizado',
    text: `Ordena antes del ${papaEvent.orderDeadlineLabel} para recibirlo antes del domingo.`,
  },
];

export const papaSteps = [
  { step: 1, title: 'Elige tu bundle', text: 'Premium, VIP o Legado — según el regalo que quieras darle.' },
  { step: 2, title: 'Escribe el nombre', text: 'Indica exactamente qué quieres que bordemos (máx. 15 caracteres).' },
  { step: 3, title: 'Nosotros hacemos la magia', text: 'Bordamos y empacamos con amor desde Puerto Rico.' },
  { step: 4, title: 'Papá lo recibe', text: `Sorpréndelo este ${papaEvent.fathersDayLabel.split(' ')[0]} con un regalo único.` },
];

export const papaTestimonials = [
  {
    id: 'maria',
    quote:
      'Compré el delantal el año pasado y a mi papá le encantó. Este año voy por el personalizado.',
    author: 'María S.',
    location: 'San Juan, PR',
  },
];

export const papaFaqs = [
  {
    id: 'deadline',
    question: '¿Llega antes del Día de los Padres?',
    answer: `Sí, si ordenas antes del ${papaEvent.orderDeadlineLabel}. Enviamos por USPS Priority Mail en todo Puerto Rico.`,
  },
  {
    id: 'text',
    question: '¿Qué puedo escribir en el bordado?',
    answer: 'Nombres, apodos o frases cortas. Máximo 15 caracteres por delantal. En el bundle Legado puedes poner dos nombres distintos.',
  },
  {
    id: 'shipping',
    question: '¿Hacen envíos a todo PR?',
    answer: 'Sí. Cubrimos todo Puerto Rico con USPS Priority Mail. El costo de envío se calcula en el checkout de Stripe.',
  },
  {
    id: 'stock',
    question: '¿Por qué solo 100 unidades?',
    answer: 'Es una edición ultra-limitada para el Día de los Padres. Cuando se agoten los 100 delantales, no habrá más en esta edición.',
  },
  {
    id: 'payment',
    question: '¿El pago es seguro?',
    answer: 'Sí. Procesamos pagos con Stripe. Aceptamos tarjetas principales y verás el cargo como El Gordito del Sabor.',
  },
];

export function getBundle(id: PapaBundleId): PapaBundle {
  return papaBundles[id];
}

export function validateEmbroideryNames(bundleId: PapaBundleId, names: string[]): string | null {
  const bundle = getBundle(bundleId);
  if (names.length !== bundle.apronCount) {
    return bundle.apronCount === 1
      ? 'Escribe el nombre a bordar.'
      : 'Escribe los dos nombres a bordar (papá e hijo/a).';
  }

  for (const name of names) {
    const trimmed = name.trim();
    if (!trimmed) return 'El nombre no puede estar vacío.';
    if (trimmed.length > papaEvent.maxEmbroideryChars) {
      return `Máximo ${papaEvent.maxEmbroideryChars} caracteres por nombre.`;
    }
  }

  return null;
}
