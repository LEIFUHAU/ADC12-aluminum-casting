import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 后台与 API 不走多语言重定向
  if (path.startsWith('/admin') || path.startsWith('/api/')) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|zh)/:path*', '/((?!_next|_vercel|api|admin|.*\\..*).*)'],
};
