import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authGetMe, authLogin, authRegister, authUpdateMe } from '../lib/api'
import type { User, UserProfile } from '../types'

const TOKEN_KEY = 'auth_token'
const SKIP_KEY = 'the_lot_skipped'

function userToProfile(user: User): UserProfile {
  return {
    name: user.name ?? '',
    instruments: user.instruments ?? [],
    age: user.age != null ? String(user.age) : '',
    experience: (user.experience as UserProfile['experience']) ?? 'rookie',
    corpsHistory: user.corps_history ?? [],
    states: user.states ?? [],
  }
}

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  saveProfile: (data: UserProfile) => Promise<void>
  clearProfile: () => void
  // UserProfileContext-compatible surface
  profile: UserProfile | null
  isFirstVisit: boolean
  skipOnboarding: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [skipped, setSkipped] = useState(() => sessionStorage.getItem(SKIP_KEY) === '1')

  // On mount, try to rehydrate from saved token
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) { setIsLoading(false); return }
    authGetMe()
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authLogin(email, password)
    localStorage.setItem(TOKEN_KEY, res.access_token)
    setUser(res.user)
    setSkipped(false)
  }

  const register = async (email: string, password: string) => {
    const res = await authRegister(email, password)
    localStorage.setItem(TOKEN_KEY, res.access_token)
    localStorage.setItem('the_lot_has_account', '1')
    setUser(res.user)
    setSkipped(false)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  const saveProfile = async (data: UserProfile) => {
    const updated = await authUpdateMe(data)
    setUser(updated)
  }

  const clearProfile = async () => {
    const cleared = await authUpdateMe({
      name: '',
      instruments: [],
      age: '',
      experience: 'rookie',
      corpsHistory: [],
      states: [],
    })
    setUser(cleared)
  }

  const skipOnboarding = () => {
    sessionStorage.setItem(SKIP_KEY, '1')
    setSkipped(true)
  }

  const profile = user ? userToProfile(user) : null

  // Show onboarding when authenticated but no instruments set yet
  const isFirstVisit = !!(user && !user.instruments?.length && !skipped)

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        saveProfile,
        clearProfile,
        profile,
        isFirstVisit,
        skipOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
