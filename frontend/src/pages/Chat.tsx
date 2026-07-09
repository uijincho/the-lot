import { useState } from 'react'
import { sendChat } from '../lib/api'
import { useProfile } from '../context/UserProfileContext'
import type { ChatMessage } from '../types'
import MessageList from '../components/chat/MessageList'
import ChatInput from '../components/chat/ChatInput'

export default function Chat() {
  const { profile } = useProfile()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async (question: string) => {
    setError(null)
    setMessages((prev) => [...prev, { role: 'user', content: question }])
    setLoading(true)

    try {
      const { answer, sources } = await sendChat(question, profile)
      setMessages((prev) => [...prev, { role: 'assistant', content: answer, sources }])
    } catch {
      setError('Failed to get a response. Check that the backend is running and API keys are set.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-bg rounded-2xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h1 className="text-lg font-display font-bold text-text">Ask Lucas</h1>
        <p className="text-text-dim text-sm">Your DCI audition assistant</p>
      </div>

      <MessageList messages={messages} loading={loading} />

      {error && (
        <div className="mx-4 mb-2 bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-2 text-xs">
          {error}
        </div>
      )}

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  )
}
