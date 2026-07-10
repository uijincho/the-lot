import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../auth/AuthModal'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [showAuth, setShowAuth] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold tracking-wide transition-colors ${
      isActive ? 'text-accent' : 'text-text-dim hover:text-text'
    }`

  return (
    <>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <nav className="border-b border-border bg-surface sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-text font-display font-extrabold text-xl tracking-tight">THE LOT</span>
            <span className="text-text-dim text-xs font-medium hidden sm:block">All your drum corps, in one place</span>
          </NavLink>
          <div className="flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
            <NavLink to="/chat" className={linkClass}>Ask Lucas</NavLink>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((v) => !v)}
                  className="text-sm font-semibold text-text-dim hover:text-text transition-colors flex items-center gap-1.5"
                >
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-bold">
                    {(user?.name || user?.email || '?')[0].toUpperCase()}
                  </span>
                  <span>{user?.name || user?.email}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-surface border border-border rounded-xl shadow-xl z-20 py-1"
                    onMouseLeave={() => setShowUserMenu(false)}>
                    <NavLink to="/profile" onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-text hover:bg-bg transition-colors">
                      Profile
                    </NavLink>
                    <button onClick={() => { logout(); setShowUserMenu(false) }}
                      className="w-full text-left px-4 py-2 text-sm text-text-dim hover:bg-bg hover:text-text transition-colors">
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-sm font-semibold text-text-dim hover:text-text transition-colors"
              >
                Sign in
              </button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  )
}
