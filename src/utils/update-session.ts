import { NextRequest, NextResponse } from 'next/server';

const SESSION_PERIOD = 60 * 60 * 1000;

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const user = request.cookies.get('user')?.value;

  if (session && user) {
    // Refresh the session so it doesn't expire
    const expires = new Date(Date.now() + SESSION_PERIOD);
    const res = NextResponse.next();
    res.cookies.set({
      name: 'session',
      value: session,
      expires: expires,
    });
    res.cookies.set({
      name: 'user',
      value: user,
      expires: expires,
    });
    return res;
  }

  // Add the original URL as a query parameter
  const loginUrl = new URL('/auth/jwt/login', request.url);
  loginUrl.searchParams.set('returnTo', request.url);
  return NextResponse.redirect(loginUrl);
}
