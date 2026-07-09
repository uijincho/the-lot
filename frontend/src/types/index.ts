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

export interface UserProfile {
  name: string
  instrument: string
  age: string
  experience: 'first-time' | '1-2 seasons' | '3+ seasons' | 'age-out'
  location: string
  locationRadius: 'any' | '500' | '1000' | '2000'
  lat?: number
  lng?: number
}
