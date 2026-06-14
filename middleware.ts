import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Antes: todo el sitio público redirigía a `/recetario` (funnel forzado).
 * Ahora: sin redirección global — cada ruta responde normalmente.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
