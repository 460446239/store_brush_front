import { cache } from 'react'
import { getCurrentUser } from './auth-service'
import { User } from './types'

// 缓存的用户获取函数
export const getUser = cache(async (): Promise<User | null> => {
    return await getCurrentUser()
})

// 服务端中间件认证
export async function requireAuth(): Promise<{ user: User } | { error: string; status: number }> {
    const user = await getCurrentUser()

    if (!user) {
        return {
            error: 'Unauthorized',
            status: 401
        }
    }

    return { user }
}

// 检查用户是否已认证（不强制）
export async function getOptionalUser(): Promise<User | null> {
    return await getCurrentUser()
}