import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth/jwt';

const I18n = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    const response = I18n(request);
    // 定义受保护路由
    const protectedRoutes = ['/teams', '/brush', '/record', '/profile'];
    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    const sessionCookie = request.cookies.get('auth-session')?.value;
    const { valid } = await verifyToken(sessionCookie ?? '');
    if (isProtectedRoute && !valid) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone();
        url.searchParams.append("redirect", url.pathname);
        url.pathname = '/signin';
        const next = NextResponse.redirect(url);
        next.cookies.delete('auth-session')
        next.cookies.delete('refresh-token')
        return next;
    } else if (valid && ['/signin', '/signup', '/forgot'].some(route => request.nextUrl.pathname.startsWith(route))) {
        const url = request.nextUrl.clone();
        const redirect = url.searchParams.get('redirect');
        if (redirect) {
            url.searchParams.delete('redirect');
            url.pathname = redirect;
        } else {
            url.pathname = '/';
        }
        return NextResponse.redirect(url);
    }
    return response;
}

export const config = {
    matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};