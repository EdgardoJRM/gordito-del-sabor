import { siteConfig } from '@/lib/site-config';

export type PapaBundleId = 'premium' | 'vip' | 'legado';
export type PapaDeliveryMethod = 'pickup' | 'mail';

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

/** Fotos reales del Gordito/equipo para la landing. */
export const papaTeamPhotos = {
  hero: '/images/team/gordito-photos/IMG_3572.jpg',
  problem: '/images/team/gordito-photos/IMG_3526.jpg',
  solution: '/images/team/gordito-photos/IMG_3531.jpg',
  trust: '/images/team/gordito-photos/IMG_3571.jpg',
  gallery: [
    '/images/team/gordito-photos/IMG_3527.jpg',
    '/images/team/gordito-photos/IMG_3569.jpg',
  ],
} as const;

export const papaEvent = {
  id: PAPA_EVENT_ID,
  slug: '/el-sabor-de-papa',
  totalAprons: 100,
  maxEmbroideryChars: 15,
  orderDeadlineLabel: '14 de junio de 2026',
  fathersDayLabel: 'Domingo 21 de junio de 2026',
  pickupFriday: 'Viernes 20 de junio (4pm–8pm)',
  pickupSaturday: 'Sábado 21 de junio (10am–2pm)',
  pickupLocation: 'Área Metro, San Juan',
  socialProof: `${siteConfig.stats.instagram} seguidores confían en nuestro sabor`,
} as const;

export const papaHero = {
  eyebrow: `Solo ${papaEvent.totalAprons} unidades · Día de los Padres`,
  headline: 'Regala un legado, no solo un delantal',
  subheadline:
    'El único delantal personalizado con el nombre de papá bordado a mano. Solo 100 disponibles en toda PR.',
  cta: 'Asegura tu delantal',
} as const;

export const papaProblem = {
  title: '¿Qué regalarle a papá este domingo?',
  lines: [
    'Camisetas. Corbatas. Herramientas.',
    'Siempre lo mismo.',
    'Papá merece algo diferente.',
    'Algo que diga: "Te veo. Te valoro. Eres especial."',
  ],
  closing:
    'Un delantal con su nombre bordado. Cada vez que lo use, pensará en ti.',
} as const;

export const papaSolution = {
  title: 'Presentamos: El Sabor de Papá',
  subtitle: 'El delantal que hace que papá se sienta como el chef que siempre fue.',
  bullets: [
    'Su nombre bordado a mano en la pechera',
    'Tela premium 100% algodón — resiste lavadas sin perder forma',
    'Bolsillos reforzados para sus herramientas favoritas',
    'Hecho en Puerto Rico con amor',
    'Garantizado antes del Día de los Padres (con recogida)',
  ],
  closing:
    'Esto no es un delantal. Es un reconocimiento. Es decirle a papá: "Tú eres el jefe de esta cocina."',
} as const;

export const papaBundles: Record<PapaBundleId, PapaBundle> = {
  premium: {
    id: 'premium',
    title: 'Premium',
    price: 49.99,
    priceLabel: '$49.99',
    apronCount: 1,
    bullets: [
      '1 delantal personalizado con bordado',
      'Recetario digital "Sabores de El Gordito"',
      'Recogida o envío por correo (tú eliges)',
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
      '1 delantal personalizado con bordado',
      'Recetario digital + video exclusivo de El Gordito',
      'Acceso a grupo privado de WhatsApp',
      'Recogida o envío por correo (tú eliges)',
    ],
  },
  legado: {
    id: 'legado',
    title: 'Legado',
    price: 84.99,
    priceLabel: '$84.99',
    apronCount: 2,
    badge: 'Para regalos dobles',
    bullets: [
      '2 delantales personalizados (papá e hijo/a)',
      'Recetario digital + video exclusivo',
      'Acceso a grupo privado de WhatsApp',
      'Recogida o envío por correo (tú eliges)',
    ],
  },
};

/** Payment Links de Stripe — cobro directo en Stripe (no API checkout). */
export function getPapaStripePaymentLink(bundleId: PapaBundleId): string | null {
  const links: Record<PapaBundleId, string | undefined> = {
    premium: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM,
    vip: process.env.NEXT_PUBLIC_STRIPE_LINK_VIP,
    legado: process.env.NEXT_PUBLIC_STRIPE_LINK_LEGADO,
  };
  const url = links[bundleId]?.trim();
  return url || null;
}

export function buildPapaStripeCheckoutUrl(
  bundleId: PapaBundleId,
  options: { email?: string } = {}
): string | null {
  const base = getPapaStripePaymentLink(bundleId);
  if (!base) return null;

  try {
    const url = new URL(base);
    if (options.email) {
      url.searchParams.set('prefilled_email', options.email.trim());
    }
    return url.toString();
  } catch {
    return base;
  }
}

export const papaDeliveryOptions: Record<
  PapaDeliveryMethod,
  {
    id: PapaDeliveryMethod;
    title: string;
    subtitle: string;
    recommended?: boolean;
    bullets: string[];
    warnings?: string[];
  }
> = {
  pickup: {
    id: 'pickup',
    title: 'Recogida en punto de encuentro',
    subtitle: 'Recomendado · Garantizado antes del domingo',
    recommended: true,
    bullets: [
      `Ubicación: ${papaEvent.pickupLocation}`,
      `${papaEvent.pickupFriday} o ${papaEvent.pickupSaturday}`,
      'Sin riesgo de retrasos del correo',
      'Conoces a El Gordito en persona',
    ],
  },
  mail: {
    id: 'mail',
    title: 'Envío por correo',
    subtitle: 'Comodidad en casa — con riesgo de retraso',
    warnings: [
      'Puede llegar después del Domingo',
      '3–5 días hábiles — riesgo del correo postal',
      'No recomendado si papá lo necesita el Domingo',
    ],
    bullets: ['Envío gratis a toda Puerto Rico', 'Recibes en la puerta de tu casa'],
  },
};

export const papaEmbroideryExamples = ['PAPÁ', 'CHEF PAPÁ', 'JEFE DE COCINA', 'PAPÁ 2026'] as const;

export const papaBenefits = [
  {
    icon: 'pencil' as const,
    title: 'Bordado a mano',
    text: 'Su nombre o frase favorita en la pechera (máx. 15 caracteres).',
  },
  {
    icon: 'shield' as const,
    title: 'Calidad premium',
    text: 'Tela resistente al calor y las manchas, hecha para durar en la cocina.',
  },
  {
    icon: 'heart' as const,
    title: 'Hecho en PR',
    text: 'Bordado y empacado con amor desde Puerto Rico.',
  },
  {
    icon: 'clock' as const,
    title: 'A tiempo para papá',
    text: `Recogida garantizada antes del ${papaEvent.fathersDayLabel}.`,
  },
];

export const papaSteps = [
  {
    step: 1,
    title: 'Elige tu oferta',
    text: 'Premium, VIP o Legado — según el regalo que quieras darle.',
  },
  {
    step: 2,
    title: 'Asegura tu delantal',
    text: 'En el siguiente paso completas bordado, entrega y datos. Pago seguro con Stripe.',
  },
  {
    step: 3,
    title: 'Nosotros bordamos',
    text: 'Nuestro equipo borda a mano en 24–48 horas.',
  },
  {
    step: 4,
    title: 'Tú recibes',
    text: `Recogida: ${papaEvent.pickupFriday} o ${papaEvent.pickupSaturday}. Correo: 3–5 días hábiles.`,
  },
];

export const papaTestimonials = [
  {
    id: 'maria',
    quote:
      'Mi papá lloró cuando lo vio. Mejor regalo que he hecho.',
    author: 'María',
    location: 'San Juan',
    isReal: false,
  },
  {
    id: 'carlos',
    quote:
      'La calidad es increíble. El bordado perfecto. Papá no se lo quita.',
    author: 'Carlos',
    location: 'Ponce',
    isReal: false,
  },
  {
    id: 'ana',
    quote: '¡Esto es bello! El Gordito hizo un trabajo perfecto.',
    author: 'Ana',
    location: 'Mayagüez',
    isReal: false,
  },
];

export const papaGuarantees = [
  'Garantía de calidad en el bordado',
  'Garantía de entrega a tiempo (solo con recogida)',
  'Hecho en Puerto Rico con amor',
  'Pagos seguros con Stripe',
] as const;

export const papaFaqs = [
  {
    id: 'deadline',
    question: '¿Cuándo llegará?',
    answer: `Depende de tu opción de entrega. Recogida en punto de encuentro: GARANTIZADO antes del Domingo (${papaEvent.pickupFriday} o ${papaEvent.pickupSaturday}). Envío por correo: puede llegar después del Domingo (3–5 días). Recomendación: elige recogida si quieres garantía 100%.`,
  },
  {
    id: 'pickup-location',
    question: '¿Dónde es el punto de encuentro?',
    answer: `${papaEvent.pickupLocation}. Te enviaremos la ubicación exacta después de comprar. Puedes recoger en cualquier momento del Viernes 20 al Sábado 21.`,
  },
  {
    id: 'change-delivery',
    question: '¿Puedo cambiar de recogida a correo después de comprar?',
    answer: 'Sí, sin problema. Avísanos por email o WhatsApp y cambiamos tu opción.',
  },
  {
    id: 'cant-pickup',
    question: '¿Qué pasa si no puedo recoger el Viernes o Sábado?',
    answer: 'Puedes elegir envío por correo, pero no garantizamos que llegue el Domingo. O coordina otra hora de recogida escribiéndonos.',
  },
  {
    id: 'mail-late',
    question: '¿Qué pasa si elijo correo y no llega el Domingo?',
    answer:
      'Al elegir envío por correo aceptas que puede llegar después del Domingo (3–5 días hábiles). Por eso recomendamos recogida si lo necesitas para ese día. No hay reembolsos por retrasos del correo postal.',
  },
  {
    id: 'pickup-cost',
    question: '¿Hay costo adicional por recogida?',
    answer: 'No. Recogida es GRATIS. Envío por correo también es GRATIS.',
  },
  {
    id: 'text',
    question: '¿Qué puedo escribir en el bordado?',
    answer: 'Nombres, apodos o frases cortas. Máximo 15 caracteres por delantal. En el bundle Legado puedes poner dos nombres distintos.',
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

export function getDeliveryLabel(method: PapaDeliveryMethod): string {
  return method === 'pickup' ? 'Recogida Área Metro' : 'Envío por correo';
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

export function validateDeliveryMethod(method: string | undefined): method is PapaDeliveryMethod {
  return method === 'pickup' || method === 'mail';
}
