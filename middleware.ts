import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RECETARIO = '/recetario';

/** Rutas que no deben redirigir al funnel (API, estáticos, flujo ebook, admin, auth). */
function allowPath(pathname: string): boolean {
  if (pathname.startsWith('/api')) return true;
  if (pathname.startsWith('/_next')) return true;
  if (pathname === '/favicon.ico' || pathname === '/robots.txt' || pathname === '/sitemap.xml') return true;
  if (/\.(ico|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|eot|pdf|txt|xml|json)$/i.test(pathname)) return true;
  if (pathname === RECETARIO || pathname.startsWith(`${RECETARIO}/`)) return true;
  if (pathname.startsWith('/ebook')) return true;
  if (pathname.startsWith('/auth')) return true;
  if (pathname.startsWith('/admin')) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (allowPath(pathname)) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = RECETARIO;
  url.hash = '';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
