/**
 * Configuración central del sitio — edita aquí URLs de checkout, métricas y contacto.
 */
export const siteConfig = {
  brandName: 'El Gordito del Sabor',
  brandNameShort: 'El Gordito',
  tagline: 'Esto es bello',
  /** Email visible en footer y páginas de venta (preventa / sponsors). */
  email: 'elgorditodelsaborshop@gmail.com',
  /** Email de soporte existente en el proyecto (API leads, contacto). */
  supportEmail: 'info@gorditodelsabor.com',
  instagram: 'https://www.instagram.com/elgorditodelsaborpr',
  facebook: 'https://www.facebook.com/profile.php?id=100084882467280',
  tiktok: 'https://www.tiktok.com/@elgorditodelsaborpr',
  /** Grupo de WhatsApp para dudas del delantal. */
  whatsappGroup:
    'https://chat.whatsapp.com/FqBwOTdgyW4Llib1qImkGb?s=cl&p=i&ilr=2',
  /** Comunidad Del Sabor — incluida en el email de compra. */
  whatsappCommunity: 'https://chat.whatsapp.com/HrUVCpLw4u931hNvvTFe1P',
  logoPath: '/images/brand/logo-gordito.png',
  mascotPath: '/images/brand/mascot-chef-gordito.svg',
  /** false = el recetario solo va con compra del delantal (email post-pago). */
  recetarioGratisEnabled: false,
  /** Placeholders: reemplaza con URLs reales de Stripe, Shopify, etc. */
  checkout: {
    delantal: 'PEGAR_URL_DEL_CHECKOUT_DELANTAL',
    fundadores: 'PEGAR_URL_DEL_CHECKOUT_FUNDADORES',
    boveda: 'PEGAR_URL_DEL_CHECKOUT_BOVEDA',
    libro: 'PEGAR_URL_DEL_CHECKOUT_LIBRO',
  },
  /** Métricas editables — confirma números reales antes de campañas pagadas. */
  stats: {
    instagram: '163K+',
    facebook: '72K+',
    tiktok: '15K+',
    engagementMeta: '3.92%',
    engagementTikTok: '4.97%',
    /** Placeholder: sustituir por dato verificado o quitar si no aplica. */
    monthlyImpressions: '1.8M+',
    /** Placeholder de audiencia activa — editable. */
    audienceActiveNote: '90% audiencia activa (confirmar)',
  },
  presale: {
    /** Días de ventana de preventa mostrados en badges (ajustable). */
    badgeDays: 10,
    /** Entrega estimada en semanas — storytelling honesto. */
    deliveryWeeksApprox: 4,
  },
} as const;

export type SiteConfig = typeof siteConfig;
