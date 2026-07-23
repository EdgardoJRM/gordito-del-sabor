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

/** Ruta canónica de la página de venta. */
export const papaProductSlug = '/delantal-el-gordito' as const;

/** Nombre del producto en copy y UI. */
export const papaProductName = 'Delantal El Gordito' as const;

/** Fotos reales del Gordito/equipo para la landing. */
export const papaTeamPhotos = {
  hero: '/images/team/gordito-photos/IMG_3572.jpg',
  problem: '/images/team/gordito-photos/IMG_3526.jpg',
  solution: '/images/team/gordito-photos/IMG_3531.jpg',
  trust: '/images/team/gordito-photos/IMG_3526.jpg',
  gallery: [
    '/images/team/gordito-photos/IMG_3527.jpg',
    '/images/team/gordito-photos/IMG_3569.jpg',
  ],
} as const;

export const papaEvent = {
  id: PAPA_EVENT_ID,
  slug: papaProductSlug,
  totalAprons: 100,
  maxEmbroideryChars: 15,
  pickupLocation: 'Área Metro, San Juan',
  embroideryTurnaround: '24–48 horas',
  mailDeliveryDays: '3–5 días hábiles',
  socialProof: 'Recetas boricuas y sazón de verdad desde Puerto Rico',
} as const;

export const papaHero = {
  eyebrow: `Edición limitada · ${papaEvent.totalAprons} unidades`,
  headline: 'Cocina con tu nombre en la pechera',
  subheadline:
    'Delantal personalizado con bordado a mano. Tela premium 100% algodón, hecho en Puerto Rico.',
  cta: 'Asegura tu delantal',
} as const;

export const papaHomeHero = {
  eyebrow: 'El Gordito del Sabor',
  headline: 'Sazón de verdad.',
  subheadline:
    'Recetas boricuas para tu cocina, una comunidad que crece en redes, y un delantal hecho para usarse de verdad.',
  ctaPrimary: 'Ver recetas',
  ctaPrimaryHref: '/recetas',
  ctaSecondary: 'Ordenar delantal',
  ctaSecondaryHref: `${papaProductSlug}#ordenar`,
} as const;

export const papaHighlights = [
  {
    title: 'Bordado a mano',
    text: 'Tu nombre o frase en la pechera — máximo 15 caracteres.',
  },
  {
    title: 'Tela premium',
    text: 'Algodón resistente al calor y las lavadas. Bolsillos reforzados.',
  },
  {
    title: 'Hecho en PR',
    text: 'Bordado y empacado con cuidado desde la isla.',
  },
  {
    title: 'Recogida o envío',
    text: `Área Metro o correo gratis a toda Puerto Rico.`,
  },
] as const;

export const papaStory = {
  title: 'No es merch de pasillo',
  paragraphs: [
    'Cocinas en casa, para tu familia o para tus panas. Mereces un delantal que aguante la cocina de verdad y que se vea como tú cocinas: con sazón y con orgullo.',
    'Cada pieza se borda a mano en esta edición limitada. Cuando se agoten las 100 unidades, cerramos esta ronda.',
  ],
} as const;

export const papaGuaranteeSection = {
  title: 'Calidad y confianza',
  intro: 'Respaldamos cada delantal. Si hay defecto de fabricación o bordado, lo resolvemos contigo.',
  body: 'Escríbenos a elgorditodelsaborshop@gmail.com con fotos del problema. Reemplazo o devolución, sin vueltas.',
} as const;

export const papaClose = {
  title: `¿Listo para tu ${papaProductName}?`,
  subtitle: 'Elige tu oferta abajo y completa el bordado en el checkout.',
  cta: 'Ver ofertas',
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
    badge: 'Para dos nombres',
    bullets: [
      '2 delantales personalizados (dos nombres distintos)',
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
    subtitle: 'Recomendado · Coordinamos contigo',
    recommended: true,
    bullets: [
      `Ubicación: ${papaEvent.pickupLocation}`,
      'Te confirmamos fecha y hora después de comprar',
      'Sin riesgo de retrasos del correo',
      'Conoces a El Gordito en persona',
    ],
  },
  mail: {
    id: 'mail',
    title: 'Envío por correo',
    subtitle: 'Comodidad en casa',
    warnings: [
      `${papaEvent.mailDeliveryDays} — sujeto a tiempos del correo postal`,
      'No recomendado si lo necesitas con urgencia',
    ],
    bullets: ['Envío gratis a toda Puerto Rico', 'Recibes en la puerta de tu casa'],
  },
};

export const papaEmbroideryExamples = [
  'CHEF CASERO',
  'JEFE DE COCINA',
  'BBQ MASTER',
  'SAZÓN REAL',
] as const;

export const papaSteps = [
  {
    step: 1,
    title: 'Elige tu oferta',
    text: 'Premium, VIP o Legado — según lo que quieras llevar a tu cocina.',
  },
  {
    step: 2,
    title: 'Asegura tu delantal',
    text: 'En el siguiente paso completas bordado, entrega y datos. Pago seguro con Stripe.',
  },
  {
    step: 3,
    title: 'Nosotros bordamos',
    text: `Nuestro equipo borda a mano en ${papaEvent.embroideryTurnaround}.`,
  },
  {
    step: 4,
    title: 'Tú recibes',
    text: `Recogida en ${papaEvent.pickupLocation} o envío por correo (${papaEvent.mailDeliveryDays}).`,
  },
];

export const papaSocialProof = [
  {
    id: 'instagram',
    platform: 'Instagram',
    label: 'Recetas y sazón en tu feed',
    href: siteConfig.instagram,
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    label: 'Comunidad en Meta',
    href: siteConfig.facebook,
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    label: 'Videos de cocina',
    href: siteConfig.tiktok,
  },
] as const;

export const papaGuarantees = [
  'Garantía de calidad en el bordado',
  'Reemplazo por defectos de fabricación',
  'Hecho en Puerto Rico con amor',
  'Pagos seguros con Stripe',
] as const;

export const papaFaqs = [
  {
    id: 'delivery',
    question: '¿Cuándo llegará?',
    answer: `Depende de tu opción de entrega. Recogida en ${papaEvent.pickupLocation}: coordinamos contigo después de comprar. Envío por correo: ${papaEvent.mailDeliveryDays} en Puerto Rico. Recomendación: elige recogida si lo necesitas pronto.`,
  },
  {
    id: 'pickup-location',
    question: '¿Dónde es el punto de encuentro?',
    answer: `${papaEvent.pickupLocation}. Te enviamos la ubicación exacta y horarios disponibles después de comprar.`,
  },
  {
    id: 'change-delivery',
    question: '¿Puedo cambiar de recogida a correo después de comprar?',
    answer: 'Sí, sin problema. Avísanos por email o WhatsApp y cambiamos tu opción.',
  },
  {
    id: 'cant-pickup',
    question: '¿Qué pasa si no puedo recoger en la fecha acordada?',
    answer: 'Coordina otra hora de recogida escribiéndonos, o cambia a envío por correo.',
  },
  {
    id: 'mail-late',
    question: '¿Qué pasa si el correo se retrasa?',
    answer: `Los envíos por correo toman ${papaEvent.mailDeliveryDays} y dependen del servicio postal. Por eso recomendamos recogida si lo necesitas con urgencia. No hay reembolsos por retrasos del correo postal.`,
  },
  {
    id: 'pickup-cost',
    question: '¿Hay costo adicional por recogida?',
    answer: 'No. Recogida es GRATIS. Envío por correo también es GRATIS.',
  },
  {
    id: 'text',
    question: '¿Qué puedo escribir en el bordado?',
    answer: `Nombres, apodos o frases cortas. Máximo ${papaEvent.maxEmbroideryChars} caracteres por delantal. En el bundle Legado puedes poner dos nombres distintos.`,
  },
  {
    id: 'stock',
    question: '¿Por qué solo 100 unidades?',
    answer: 'Es una edición ultra-limitada. Cada delantal se borda a mano. Cuando se agoten los 100, esta edición cierra.',
  },
  {
    id: 'payment',
    question: '¿El pago es seguro?',
    answer: 'Sí. Procesamos pagos con Stripe. Aceptamos tarjetas principales y verás el cargo como El Gordito del Sabor.',
  },
  {
    id: 'who',
    question: '¿A quién va dirigido?',
    answer: 'A cocineros caseros, fanáticos del BBQ, quien cocina para la familia y cualquiera que quiera verse bien en su cocina con un delantal personalizado hecho en PR.',
  },
  {
    id: 'difference',
    question: '¿En qué se diferencia de un delantal de Amazon?',
    answer: 'Tela premium 100% algodón, bordado a mano con tu nombre, bolsillos reforzados, hecho en Puerto Rico — y bonos digitales incluidos según tu oferta.',
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
      : 'Escribe los dos nombres a bordar.';
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
