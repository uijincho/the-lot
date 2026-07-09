import { useEffect, useRef } from 'react'
import type { ChatMessage } from '../../types'
import MessageBubble from './MessageBubble'

interface Props {
  messages: ChatMessage[]
  loading: boolean
}

export default function MessageList({ messages, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-y-auto py-6 space-y-6 px-4">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-16">
          <p className="text-4xl">🥁</p>
          <p className="text-gray-300 font-semibold">Ask anything about DCI auditions</p>
          <p className="text-gray-500 text-sm max-w-sm">
            Upload corps audition documents first, then ask about requirements, dates, repertoire, and more.
          </p>
        </div>
      )}
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-brand-surface border border-brand-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
