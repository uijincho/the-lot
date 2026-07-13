import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { useChat } from '../../context/ChatContext'
import type { ChatMessage } from '../../types'

const INTRO_CONTENT = "Hey! I'm **Lucas**, your DCI audition assistant. Ask me anything about corps, audition prep, or what to expect on tour."

const mdComponents: Components = {
  p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="list-disc list-inside mb-1.5 space-y-0.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside mb-1.5 space-y-0.5">{children}</ol>,
  li: ({ children }) => <li className="text-text">{children}</li>,
  h3: ({ children }) => <h3 className="text-xs font-display font-semibold text-accent mb-1 mt-1.5">{children}</h3>,
  code: ({ children }) => <code className="bg-bg rounded px-1 text-accent font-mono">{children}</code>,
  blockquote: ({ children }) => <blockquote className="border-l-2 border-accent pl-2 text-text-dim italic">{children}</blockquote>,
}

function AssistantBubble({ content }: { content: string }) {
  return (
    <div className="max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed bg-surface border border-border text-text rounded-bl-sm">
      <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
    </div>
  )
}

function LotMark() {
  return (
    <div className="w-7 h-7 rounded bg-structure flex items-center justify-center gap-[3px] shrink-0">
      <span className="w-px h-4 bg-accent rounded-full" />
      <span className="w-px h-4 bg-accent rounded-full" />
    </div>
  )
}

export default function FloatingChat() {
  const { messages, loading, send } = useChat()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [open, messages])

  async function handleSend() {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    await send(q)
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 flex flex-col bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
          style={{ height: '480px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg/60">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-display font-bold text-text leading-none">Lucas</p>
                <p className="text-xs text-text-dim leading-none mt-0.5">DCI Assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-text-dim hover:text-text transition-colors p-1"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {/* Static intro — always shown, never saved */}
            {messages.length === 0 && (
              <div className="flex justify-start">
                <AssistantBubble content={INTRO_CONTENT} />
              </div>
            )}

            {messages.map((msg: ChatMessage, i: number) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-accent-text font-medium rounded-br-sm'
                    : 'bg-surface border border-border text-text rounded-bl-sm'
                }`}>
                  {msg.role === 'user' ? msg.content : (
                    <ReactMarkdown components={mdComponents}>{msg.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-bg border border-border rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-2 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 1000))}
              onKeyDown={handleKey}
              placeholder="Ask Lucas anything…"
              rows={1}
              className="flex-1 resize-none bg-transparent text-text text-xs placeholder-text-dim outline-none py-1.5 max-h-20 leading-relaxed"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="mb-1 p-1.5 rounded-lg bg-accent text-accent-text disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all shrink-0"
              aria-label="Send"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L1 7l5 2 2 5 5-13z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-accent text-accent-text font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
        aria-label={open ? 'Close Lucas' : 'Open Lucas'}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <span className="font-black text-base">L</span>
        )}
      </button>
    </div>
  )
}
