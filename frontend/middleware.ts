import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected application routes requiring active authentication
const PROTECTED_PREFIXES = [
  '/dashboard/client',
  '/dashboard/creator',
  '/admin',
  '/messages',
  '/onboarding/creator',
  '/collaboration',
  '/notifications',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('creatorhub_token')?.value;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    // Open redirect protection: store destination path safely
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/messages/:path*',
    '/onboarding/:path*',
    '/collaboration/:path*',
    '/notifications/:path*',
  ],
};
