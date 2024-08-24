import { NextRequest, NextResponse } from 'next/server';

const locales: string[] = ['en-US', 'nl-NL', 'nl', 'ar'];

// Define the function signature for getLocale
function getLocale(request: NextRequest): string {
  // Placeholder implementation; replace with your actual locale logic
  // This should return a supported locale, e.g., 'en-US'
  return 'en-US'; // Default locale or logic to determine locale
}

export function middleware(request: NextRequest): NextResponse | undefined {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
