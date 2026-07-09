import { NavLink } from 'react-router-dom'
import { useProfile } from '../../context/UserProfileContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { profile } = useProfile()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold tracking-wide transition-colors ${
      isActive ? 'text-accent' : 'text-text-dim hover:text-text'
    }`

  return (
    <nav className="border-b border-border bg-surface sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-text font-display font-extrabold text-xl tracking-tight">THE LOT</span>
          <span className="text-text-dim text-xs font-medium hidden sm:block">DCI Audition Database</span>
        </NavLink>
        <div className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/chat" className={linkClass}>Ask Lucas</NavLink>
          <NavLink to="/profile" className={linkClass}>
            {profile?.name ? profile.name : 'Profile'}
          </NavLink>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
