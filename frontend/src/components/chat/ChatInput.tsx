import { useState, type KeyboardEvent } from 'react'

interface Props {
  onSend: (question: string) => void
  disabled: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')

  const MAX_LEN = 1000

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed.slice(0, MAX_LEN))
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-surface p-4">
      <div className="flex items-end gap-3">
        <textarea
          className="flex-1 bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-text-dim resize-none focus:outline-none focus:border-accent transition-colors"
          placeholder="Ask about audition requirements, dates, repertoire..."
          rows={2}
          value={value}
          maxLength={MAX_LEN}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="bg-accent text-accent-text font-bold px-5 py-3 rounded-xl text-sm hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
        >
          Send
        </button>
      </div>
      <p className="text-text-dim text-xs mt-2 px-1">Press Enter to send · Shift+Enter for new line</p>
    </div>
  )
}
