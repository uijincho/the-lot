import axios from 'axios'
import type { Corps, Source, UserProfile, User, TokenResponse } from '../types'

const api = axios.create({ baseURL: '/' })

// Attach JWT on every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Corps ─────────────────────────────────────────────────────────────────────

export async function fetchCorps(): Promise<Corps[]> {
  const res = await api.get<{ corps: Corps[]; total: number }>('/corps')
  return res.data.corps
}

export async function fetchCorpsById(id: string): Promise<Corps> {
  const res = await api.get<Corps>(`/corps/${id}`)
  return res.data
}

// ── Chat ──────────────────────────────────────────────────────────────────────

export async function sendChat(
  question: string,
  profile?: UserProfile | null,
): Promise<{ answer: string; sources: Source[] }> {
  const body: Record<string, unknown> = { question }
  if (profile) {
    body.user_context = {
      name: profile.name || undefined,
      instruments: profile.instruments?.length ? profile.instruments : undefined,
      age: profile.age || undefined,
      experience: profile.experience,
      corpsHistory: profile.corpsHistory?.length ? profile.corpsHistory : undefined,
      states: profile.states?.length ? profile.states : undefined,
    }
  }
  const res = await api.post<{ answer: string; sources: Source[] }>('/chat', body)
  return res.data
}

// ── Documents ─────────────────────────────────────────────────────────────────

export async function uploadDocument(file: File, corpsId?: string): Promise<{ id: string; filename: string; chunk_count: number }> {
  const form = new FormData()
  form.append('file', file)
  if (corpsId) form.append('corps_id', corpsId)
  const res = await api.post('/documents/upload', form)
  return res.data
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function authRegister(email: string, password: string): Promise<TokenResponse> {
  const res = await api.post<TokenResponse>('/auth/register', { email, password })
  return res.data
}

export async function authLogin(email: string, password: string): Promise<TokenResponse> {
  const res = await api.post<TokenResponse>('/auth/login', { email, password })
  return res.data
}

export async function authGetMe(): Promise<User> {
  const res = await api.get<User>('/auth/me')
  return res.data
}

export async function authUpdateMe(profile: Partial<UserProfile>): Promise<User> {
  const body = {
    name: profile.name || null,
    instruments: profile.instruments?.length ? profile.instruments : null,
    age: profile.age ? parseInt(profile.age) : null,
    experience: profile.experience || null,
    corps_history: profile.corpsHistory?.length ? profile.corpsHistory : null,
    states: profile.states?.length ? profile.states : null,
  }
  const res = await api.put<User>('/auth/me', body)
  return res.data
}
