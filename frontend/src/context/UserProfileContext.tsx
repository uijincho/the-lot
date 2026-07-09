import { createContext, useContext, type ReactNode } from 'react'
import { useUserProfile } from '../hooks/useUserProfile'
import type { UserProfile } from '../types'

interface UserProfileContextValue {
  profile: UserProfile | null
  saveProfile: (data: UserProfile) => void
  skipOnboarding: () => void
  clearProfile: () => void
  isFirstVisit: boolean
}

const UserProfileContext = createContext<UserProfileContextValue | null>(null)

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const value = useUserProfile()
  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
}

export function useProfile() {
  const ctx = useContext(UserProfileContext)
  if (!ctx) throw new Error('useProfile must be used within UserProfileProvider')
  return ctx
}
