import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/update-session';

export default async function middleware(request: NextRequest) {
  // Allow access to login page without a session
  if (request.nextUrl.pathname === '/auth/jwt/login') {
    return NextResponse.next();
  }

  // Check for session on protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return await updateSession(request);
  }

  // For all other routes, proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/jwt/login'],
};
