export interface Corps {
  id: string
  name: string
  location: string | null
  audition_date: string | null
  audition_location: string | null
  website_url: string | null
  instruments: string[] | null
  requirements: string | null
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
  experience: 'first-time' | 'experienced'
  corpsHistory: CorpsHistoryEntry[]
  states: string[]
}
