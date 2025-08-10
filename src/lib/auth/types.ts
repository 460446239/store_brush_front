export interface User {
    uid: number
    avatar: string
    email: string
    nickname: string
    invite_code: string
    now_money: string
    credit_score: number
}

export interface Session {
    user: User
    accessToken: string
    refreshToken?: string
    expiresAt: number
}

export interface AuthTokens {
    accessToken: string
    refreshToken?: string
}

export interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
}