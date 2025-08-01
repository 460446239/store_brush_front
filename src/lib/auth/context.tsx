// lib/auth/context.tsx
'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContextType, User, Session } from './types'
import { getAuthCookies } from './cookies'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ 
  children,
  initialUser 
}: { 
  children: React.ReactNode
  initialUser: User | null
}) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const signIn = useCallback(async (credentials: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || '登录失败')
      }

      setUser(data.user)
      setSession(data.session)
      router.refresh()
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const signUp = useCallback(async (credentials: { email: string; password: string; name?: string }) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || '注册失败')
      }

      setUser(data.user)
      setSession(data.session)
      router.refresh()
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      setSession(null)
      router.refresh()
    } catch (error) {
      console.error('退出登录失败:', error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh')
      const data = await response.json()
      
      if (response.ok) {
        setUser(data.user)
        setSession(data.session)
      } else {
        // 刷新失败，清除会话
        setUser(null)
        setSession(null)
      }
    } catch (error) {
      console.error('刷新会话失败:', error)
    }
  }, [])

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    signUp,
    refreshSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}