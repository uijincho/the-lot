import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { sendChat, fetchConversation, clearConversation } from '../lib/api'
import { useAuth } from './AuthContext'
import type { ChatMessage } from '../types'

const STORAGE_KEY = 'the_lot_chat'

interface ChatContextValue {
  messages: ChatMessage[]
  loading: boolean
  error: string | null
  send: (question: string) => Promise<void>
  clear: () => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

function loadLocal(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading: authLoading, profile } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>(loadLocal)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const prevUserIdRef = useRef<string | null>(null)

  // Sync messages with auth state once auth resolves
  useEffect(() => {
    if (authLoading) return

    const currentId = user?.id ?? null

    if (currentId === prevUserIdRef.current) return
    prevUserIdRef.current = currentId

    if (isAuthenticated) {
      // Load from server
      fetchConversation()
        .then((serverMsgs) => {
          setMessages(serverMsgs.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
            sources: m.sources,
          })))
        })
        .catch(() => {})
    } else {
      // Logged out: restore from localStorage
      setMessages(loadLocal())
    }
  }, [isAuthenticated, authLoading, user?.id])

  // Persist to localStorage for anonymous users
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages, isAuthenticated])

  const send = async (question: string) => {
    setError(null)
    setMessages((prev) => [...prev, { role: 'user', content: question }])
    setLoading(true)
    try {
      const { answer, sources } = await sendChat(question, profile)
      setMessages((prev) => [...prev, { role: 'assistant', content: answer, sources }])
    } catch {
      setError('Failed to get a response. Check that the backend is running and API keys are set.')
      // Remove the optimistically-added user message on error
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setMessages([])
    if (isAuthenticated) {
      clearConversation().catch(() => {})
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <ChatContext.Provider value={{ messages, loading, error, send, clear }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}
