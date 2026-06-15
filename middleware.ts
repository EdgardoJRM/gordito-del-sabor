import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  DELANTAL_COUNTDOWN_PATH,
  isCountdownAllowedPath,
  isDelantalCountdownActive,
} from '@/lib/delantal-countdown';

export function middleware(request: NextRequest) {
  if (!isDelantalCountdownActive()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (isCountdownAllowedPath(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'Las órdenes del delantal abren pronto. Vuelve cuando termine la cuenta regresiva.' },
      { status: 503 }
    );
  }

  const url = request.nextUrl.clone();
  url.pathname = DELANTAL_COUNTDOWN_PATH;
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|eot|pdf|txt|xml|json)$).*)'],
};
