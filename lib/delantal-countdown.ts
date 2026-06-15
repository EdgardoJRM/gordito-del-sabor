/** Ruta única visible mientras el countdown está activo. */
export const DELANTAL_COUNTDOWN_PATH = '/delantal-proximamente';

/** Cookie para bypass de preview (solo quien tenga el secreto). */
export const DELANTAL_PREVIEW_COOKIE = 'delantal_preview';

const DEFAULT_LAUNCH_ISO = '2026-06-15T18:07:00.000Z';

export function getDelantalPreviewSecret(): string | null {
  const secret = process.env.DELANTAL_PREVIEW_SECRET?.trim();
  return secret || null;
}

export function isValidDelantalPreviewToken(token: string | null | undefined): boolean {
  const secret = getDelantalPreviewSecret();
  if (!secret || !token) return false;
  return token === secret;
}

export function getDelantalLaunchAtIso(): string {
  return (
    process.env.DELANTAL_COUNTDOWN_END ??
    process.env.NEXT_PUBLIC_DELANTAL_COUNTDOWN_END ??
    DEFAULT_LAUNCH_ISO
  );
}

export function getDelantalLaunchAtMs(): number {
  return new Date(getDelantalLaunchAtIso()).getTime();
}

export function isDelantalCountdownEnabled(): boolean {
  return process.env.DELANTAL_COUNTDOWN_ENABLED !== 'false';
}

/** true = sitio bloqueado, solo página de countdown. */
export function isDelantalCountdownActive(): boolean {
  if (!isDelantalCountdownEnabled()) return false;
  const launchMs = getDelantalLaunchAtMs();
  if (Number.isNaN(launchMs)) return false;
  return Date.now() < launchMs;
}

export function isCountdownAllowedPath(pathname: string): boolean {
  if (pathname === DELANTAL_COUNTDOWN_PATH) return true;
  if (pathname === '/icon.svg' || pathname === '/robots.txt') return true;
  if (pathname.startsWith('/api/leads')) return true;
  if (pathname.startsWith('/api/webhooks/')) return true;
  return false;
}
