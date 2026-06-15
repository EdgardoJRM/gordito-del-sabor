import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  DELANTAL_COUNTDOWN_PATH,
  DELANTAL_PREVIEW_COOKIE,
  isCountdownAllowedPath,
  isDelantalCountdownActive,
  isValidDelantalPreviewToken,
} from '@/lib/delantal-countdown';

export function middleware(request: NextRequest) {
  if (!isDelantalCountdownActive()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const previewParam = request.nextUrl.searchParams.get('preview');
  const previewCookie = request.cookies.get(DELANTAL_PREVIEW_COOKIE)?.value;
  const hasPreview =
    isValidDelantalPreviewToken(previewParam) || isValidDelantalPreviewToken(previewCookie);

  if (isCountdownAllowedPath(pathname) || hasPreview) {
    const response = NextResponse.next();

    if (isValidDelantalPreviewToken(previewParam)) {
      response.cookies.set(DELANTAL_PREVIEW_COOKIE, previewParam, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }

    return response;
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
