import ReactMarkdown from 'react-markdown'
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
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
                li: ({ children }) => <li className="text-gray-200">{children}</li>,
                h1: ({ children }) => <h1 className="text-base font-bold text-white mb-1 mt-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-sm font-bold text-white mb-1 mt-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-semibold text-brand-gold mb-1 mt-2">{children}</h3>,
                code: ({ children }) => <code className="bg-brand-dark rounded px-1 py-0.5 text-xs font-mono text-brand-gold">{children}</code>,
                pre: ({ children }) => <pre className="bg-brand-dark border border-brand-border rounded-lg p-3 overflow-x-auto text-xs font-mono mb-2">{children}</pre>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-brand-gold pl-3 text-gray-400 italic mb-2">{children}</blockquote>,
                hr: () => <hr className="border-brand-border my-2" />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
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
