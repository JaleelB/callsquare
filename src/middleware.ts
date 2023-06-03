import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { type IncomingHttpHeaders } from 'http';
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
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
      return NextResponse.redirect(`/login?from=${encodeURIComponent(req.nextUrl.pathname)}`);
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
);

export const config = {
  matcher: ['/calls', '/calls/:path*'],
};
