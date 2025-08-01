import { User, Session } from './types'
import { signToken, verifyToken } from './jwt'
import { getAuthCookies, setAuthCookies } from './cookies'
import * as UserService from './user-service'

export async function createSession(user: User): Promise<Session> {
    const accessToken = await signToken({
        uid: user.uid,
    }, '24h')

    const refreshToken = await signToken({
        uid: user.uid
    }, '7d')

    return {
        user,
        accessToken,
        refreshToken,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
    }
}

export async function validateSession(token: string): Promise<User | null> {
    const { payload, valid } = await verifyToken(token)

    if (!valid || !payload?.uid) {
        return null
    }
    const { user } = await UserService.GetUserInfo(payload.uid);
    return user;
}

export async function refreshSession(refreshToken: string): Promise<User | null> {
    const { payload, valid } = await verifyToken(refreshToken)

    if (!valid || !payload?.uid) {
        return null
    }

    const { user } = await UserService.GetUserInfo(payload.uid);
    if (!user) {
        return null
    }
    const session = await createSession(user);
    await setAuthCookies(session.accessToken, session.refreshToken);
    return user;
}

export async function signIn(credentials: UserService.SignInProps): Promise<User> {
    const { user } = await UserService.SignIn(credentials);
    const session = await createSession(user);
    await setAuthCookies(session.accessToken, session.refreshToken);
    return user
}

export async function signUp(credentials: UserService.SignUpProps): Promise<User> {
    await UserService.SignUp(credentials);
    const { user } = await UserService.SignIn(credentials);
    const session = await createSession(user);
    await setAuthCookies(session.accessToken, session.refreshToken);
    return user;
}

export async function getCurrentUser(): Promise<User | null> {
    const { session } = await getAuthCookies()
    if (!session) {
        return null
    }
    return await validateSession(session)
}