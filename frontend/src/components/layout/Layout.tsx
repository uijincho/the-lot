import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import OnboardingModal from '../onboarding/OnboardingModal'
import FloatingChat from '../chat/FloatingChat'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <OnboardingModal />
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
      <FloatingChat />
    </div>
  )
}
