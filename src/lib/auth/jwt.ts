import { jwtVerify, type ProduceJWT, SignJWT } from 'jose'
import { nanoid } from 'nanoid'

interface JWTPayload {
    uid: number
    [key: string]: any
}

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'jBtmyyyC6kvsDgiZ4OYh7oOAbm3YPQ6nEdjJ8qGtWPU'
)


export async function signToken(payload: JWTPayload, expiresIn: string = '24h') {
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + (expiresIn === '24h' ? 24 * 60 * 60 : 7 * 24 * 60 * 60)

    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .setJti(nanoid())
        .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify<JWTPayload>(token, JWT_SECRET)
        return { payload, valid: true }
    } catch (error) {
        return { payload: null, valid: false, error }
    }
}