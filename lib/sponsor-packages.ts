import { siteConfig } from '@/lib/site-config';

export type SponsorPackage = {
  id: string;
  name: string;
  tagline: string;
  fromPrice: string;
  recommended?: boolean;
  includes: string[];
};

export const sponsorPackages: SponsorPackage[] = [
  {
    id: 'sazon-inicial',
    name: 'Sazón inicial',
    tagline: 'Para marcas que quieren probar',
    fromPrice: '$1,500',
    includes: ['1 reel o video corto', '3 stories', 'Mención de marca', 'Link básico', 'Reporte básico'],
  },
  {
    id: 'receta-patrocinada',
    name: 'Receta patrocinada',
    tagline: 'Integración fuerte con la comunidad',
    fromPrice: '$3,500',
    recommended: true,
    includes: [
      '1 reel IG + FB',
      'Collab tag',
      '5 stories',
      'Página de receta patrocinada',
      'Link o cupón rastreable',
      'Reporte de resultados',
    ],
  },
  {
    id: 'serie-del-sabor',
    name: 'Serie del sabor',
    tagline: 'Campaña con más piezas',
    fromPrice: '$7,500',
    includes: [
      '2 reels',
      '10 stories',
      '2 páginas de recetas',
      '1 email a la lista',
      'Reporte completo',
    ],
  },
  {
    id: 'marca-de-la-casa',
    name: 'Marca de la casa',
    tagline: 'A medida — media brand',
    fromPrice: 'A medida',
    includes: [
      'Campaña mensual',
      'Integraciones recurrentes',
      'Exclusividad por categoría (opcional, precio aparte)',
      'Reporte mensual',
      'Reunión estratégica',
    ],
  },
];

export const sponsorDeliverables = [
  'Reels patrocinados',
  'Stories y menciones',
  'Recetas patrocinadas',
  'Email placement',
  'Links rastreables',
  'Reportes claros (no humo)',
];

export const sponsorProcess = [
  { step: '1', title: 'Estrategia', text: 'Objetivo, mensaje y encaje con la comunidad.' },
  { step: '2', title: 'Concepto', text: 'Idea de receta o integración que se sienta natural.' },
  { step: '3', title: 'Producción', text: 'Grabación, edición y revisión con la marca.' },
  { step: '4', title: 'Distribución', text: 'Publicación en redes + página si aplica.' },
  { step: '5', title: 'Reporte', text: 'Métricas y aprendizajes para la siguiente ronda.' },
];

export const sponsorMetricsDisplay = [
  { label: 'Instagram', value: siteConfig.stats.instagram },
  { label: 'Facebook', value: siteConfig.stats.facebook },
  { label: 'TikTok', value: siteConfig.stats.tiktok },
  { label: 'Engagement (Meta)', value: siteConfig.stats.engagementMeta },
  { label: 'Engagement (TikTok)', value: siteConfig.stats.engagementTikTok },
  { label: 'Impresiones mensuales (est.)', value: siteConfig.stats.monthlyImpressions },
];
