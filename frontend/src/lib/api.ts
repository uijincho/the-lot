import axios from 'axios'
import type { Corps, Source, UserProfile } from '../types'

const api = axios.create({ baseURL: '/' })

export async function fetchCorps(): Promise<Corps[]> {
  const res = await api.get<{ corps: Corps[]; total: number }>('/corps')
  return res.data.corps
}

export async function fetchCorpsById(id: string): Promise<Corps> {
  const res = await api.get<Corps>(`/corps/${id}`)
  return res.data
}

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

export async function uploadDocument(file: File, corpsId?: string): Promise<{ id: string; filename: string; chunk_count: number }> {
  const form = new FormData()
  form.append('file', file)
  if (corpsId) form.append('corps_id', corpsId)
  const res = await api.post('/documents/upload', form)
  return res.data
}
