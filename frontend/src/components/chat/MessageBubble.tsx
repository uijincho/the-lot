import type { ChatMessage } from '../../types'

interface Props {
  message: ChatMessage
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-brand-gold text-black font-medium rounded-br-sm'
              : 'bg-brand-surface border border-brand-border text-gray-100 rounded-bl-sm'
          }`}
        >
          {message.content}
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="w-full space-y-1">
            <p className="text-xs text-gray-500 px-1">Sources</p>
            {message.sources.map((source, i) => (
              <div
                key={i}
                className="bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-xs text-gray-400"
              >
                <span className="text-gray-300 font-medium">{source.filename}</span>
                <p className="mt-0.5 line-clamp-2">{source.text_snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
