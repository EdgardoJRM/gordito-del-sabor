import { siteConfig } from '@/lib/site-config';

/** Descarga pública en /recetario. Desactivado: el PDF va con la compra del delantal. */
export function isRecetarioGratisEnabled(): boolean {
  const env = process.env.RECETARIO_GRATIS_ENABLED?.trim().toLowerCase();
  if (env === 'true') return true;
  if (env === 'false') return false;
  return siteConfig.recetarioGratisEnabled;
}
