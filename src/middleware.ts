import { type NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { type IncomingHttpHeaders } from 'http';
import { absoluteUrl } from './utils/absoluteUrl';

export async function middleware(req: NextRequest) {
  // Convert the Headers object into an IncomingHttpHeaders object
  const headers: IncomingHttpHeaders = {};
  req.headers.forEach((value, name) => {
    headers[name] = value;
  });

  // Create a new request object compatible with `getSession`
  const compatibleReq = {
    headers,
    method: req.method,
    url: req.nextUrl.href,
  };

  const session = await getSession({ req: compatibleReq });

  const isAuth = !!session;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');

  if (isAuthPage && isAuth) {
    return NextResponse.redirect('/calls');
  }

  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(absoluteUrl(`/login?from=${encodeURIComponent(req.nextUrl.pathname)}`));
  }

  // If the user is authenticated and they're not trying to access an auth page, let them proceed
  if (isAuth && !isAuthPage) {
    return NextResponse.next();
  }

  // If the user is not authenticated and they're trying to access an auth page, let them proceed
  if (!isAuth && isAuthPage) {
    return NextResponse.next();
  }
}


export const config = {
  matcher: ['/calls/:path*'],
};