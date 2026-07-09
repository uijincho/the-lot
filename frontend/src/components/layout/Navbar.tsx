import { NavLink } from 'react-router-dom'
import { useProfile } from '../../context/UserProfileContext'

export default function Navbar() {
  const { profile } = useProfile()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold tracking-wide transition-colors ${
      isActive ? 'text-brand-gold' : 'text-gray-400 hover:text-white'
    }`

  return (
    <nav className="border-b border-brand-border bg-brand-surface sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-brand-gold font-extrabold text-xl tracking-tight">THE LOT</span>
          <span className="text-gray-500 text-xs font-medium hidden sm:block">DCI Audition Assistant</span>
        </NavLink>
        <div className="flex items-center gap-8">
          <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/chat" className={linkClass}>Ask Lucas</NavLink>
          <NavLink to="/profile" className={linkClass}>
            {profile?.name ? profile.name : 'Profile'}
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
