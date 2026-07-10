import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

interface AuthModalProps {
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export default function AuthModal({ onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
      onClose()
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setError(msg ?? (mode === 'login' ? 'Invalid credentials' : 'Could not create account'))
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full bg-bg border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-sm p-8 shadow-2xl">
        <div className="mb-6">
          <p className="text-accent text-xs font-mono font-bold uppercase tracking-widest mb-1">The Lot</p>
          <h2 className="text-2xl font-display font-extrabold text-text">
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </h2>
          <p className="text-text-dim text-sm mt-1">
            {mode === 'login'
              ? 'Welcome back.'
              : 'Save your profile and chat history.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-1.5">Email</label>
            <input
              className={inputCls}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-dim uppercase tracking-wider mb-1.5">Password</label>
            <input
              className={inputCls}
              type="password"
              placeholder={mode === 'register' ? 'At least 8 characters' : '••••••••'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === 'register' ? 8 : 1}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-text font-bold py-2.5 rounded-xl text-sm hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? '...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-5 flex items-center justify-between text-sm">
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
            className="text-text-dim hover:text-text transition-colors"
          >
            {mode === 'login' ? 'No account? Sign up' : 'Have an account? Sign in'}
          </button>
          <button onClick={onClose} className="text-text-dim hover:text-text transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
