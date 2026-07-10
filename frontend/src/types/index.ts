export interface Corps {
  id: string
  name: string
  location: string | null
  audition_date: string | null
  audition_location: string | null
  website_url: string | null
  instruments: string[] | null
  requirements: string | null
  corps_class: string | null
  created_at: string
}

export interface Source {
  filename: string
  text_snippet: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
}

export interface CorpsHistoryEntry {
  corps: string
  year: string
}

export interface UserProfile {
  name: string
  instruments: string[]
  age: string
  experience: 'rookie' | 'experienced'
  corpsHistory: CorpsHistoryEntry[]
  states: string[]
}

export interface User {
  id: string
  email: string
  name: string | null
  instruments: string[] | null
  age: number | null
  experience: string | null
  corps_history: CorpsHistoryEntry[] | null
  states: string[] | null
}

export interface TokenResponse {
  access_token: string
  token_type: string
  user: User
}

export interface Recommendation {
  corps: Corps
  score: number
  stars: 1 | 2 | 3
  reasons: string[]
  returning?: boolean
}
