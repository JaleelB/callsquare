import { type NextRequest, NextResponse } from 'next/server';
import { absoluteUrl } from './utils/absoluteUrl';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {

  const session = await getToken({ req });

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
