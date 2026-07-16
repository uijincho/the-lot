import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import OnboardingModal from '../onboarding/OnboardingModal'
import FloatingChat from '../chat/FloatingChat'
import AuthModal from '../auth/AuthModal'
import { useAuth } from '../../context/AuthContext'

export default function Layout() {
  const { isAuthenticated, isLoading } = useAuth()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAuthPrompt(true)
    }
  }, [isLoading, isAuthenticated])

  const initialMode = localStorage.getItem('the_lot_has_account') ? 'login' : 'register'

  return (
    <div className="min-h-screen bg-bg text-text">
      <OnboardingModal />
      {showAuthPrompt && (
        <AuthModal
          onClose={() => setShowAuthPrompt(false)}
          initialMode={initialMode}
        />
      )}
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
      <FloatingChat />
    </div>
  )
}
