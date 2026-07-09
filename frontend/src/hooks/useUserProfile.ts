import { useState } from 'react'
import type { UserProfile } from '../types'

const COOKIE_NAME = 'the_lot_profile'
const SKIP_KEY = 'the_lot_skipped'

function getCookie(name: string): string | null {
  const match = document.cookie.split('; ').find((row) => row.startsWith(name + '='))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function readProfile(): UserProfile | null {
  const raw = getCookie(COOKIE_NAME)
  if (!raw) return null
  try {
    return JSON.parse(raw) as UserProfile
  } catch {
    return null
  }
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(readProfile)

  const skipped = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SKIP_KEY) === '1'
  const isFirstVisit = profile === null && !skipped

  const saveProfile = (data: UserProfile) => {
    setCookie(COOKIE_NAME, JSON.stringify(data), 365)
    setProfile(data)
  }

  const skipOnboarding = () => {
    sessionStorage.setItem(SKIP_KEY, '1')
    setProfile(null)
  }

  const clearProfile = () => {
    setCookie(COOKIE_NAME, '', -1)
    setProfile(null)
  }

  return { profile, saveProfile, skipOnboarding, clearProfile, isFirstVisit }
}
