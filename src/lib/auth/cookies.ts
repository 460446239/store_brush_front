// lib/auth/cookies.ts
import { cookies } from 'next/headers'
export const AUTH_COOKIE_NAME = 'auth-session'
export const REFRESH_COOKIE_NAME = 'refresh-token'

export async function getAuthCookies() {
    const cookieStore = await cookies()
    return {
        session: cookieStore.get(AUTH_COOKIE_NAME)?.value,
        refresh: cookieStore.get(REFRESH_COOKIE_NAME)?.value
    }
}

export async function setAuthCookies(
    sessionToken: string,
    refreshToken?: string,
    rememberMe: boolean = false
) {
    const cookieStore = await cookies()
    const sessionMaxAge = 24 * 60 * 60 // 24 hours
    const refreshMaxAge = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60 // 7 days or 24 hours

    cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: sessionMaxAge,
        path: '/',
        sameSite: 'lax',
    })

    if (refreshToken) {
        cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: refreshMaxAge,
            path: '/',
            sameSite: 'lax',
        })
    }
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME)
    cookieStore.delete(REFRESH_COOKIE_NAME)
}