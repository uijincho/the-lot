import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from '../components/auth/AuthModal'
import ProfileForm, { EMPTY_PROFILE } from '../components/profile/ProfileForm'
import type { UserProfile } from '../types'

export default function Profile() {
  const { isAuthenticated, profile, saveProfile, clearProfile, isLoading } = useAuth()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  if (isLoading) {
    return <div className="text-text-dim text-sm">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        <div className="max-w-lg mx-auto text-center py-20">
          <h1 className="text-2xl font-display font-extrabold text-text mb-3">Your Profile</h1>
          <p className="text-text-dim text-sm mb-6">Sign in to save your profile and personalize your experience.</p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-accent text-accent-text font-bold px-6 py-2.5 rounded-xl text-sm hover:brightness-110 transition-all"
          >
            Sign in or create account
          </button>
        </div>
      </>
    )
  }

  const initialValues: UserProfile = profile ?? EMPTY_PROFILE

  const handleSave = async (data: UserProfile) => {
    await saveProfile(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleClear = async () => {
    await clearProfile()
    navigate('/')
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-extrabold text-text mb-1">Your Profile</h1>
        <p className="text-text-dim text-sm">Update your preferences to keep recommendations and chat answers personalized.</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8">
        <ProfileForm
          initialValues={initialValues}
          onSave={handleSave}
          submitLabel="Save changes"
        />
      </div>

      {saved && (
        <div className="mt-4 bg-structure-soft border border-structure text-structure rounded-lg px-4 py-3 text-sm text-center">
          Profile saved ✓
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-border">
        {confirmClear ? (
          <div className="flex items-center justify-between bg-red-900/20 border border-red-800 rounded-xl px-4 py-3">
            <p className="text-sm text-red-300">Clear your profile and all preferences?</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmClear(false)} className="text-sm text-text-dim hover:text-text transition-colors">
                Cancel
              </button>
              <button onClick={handleClear} className="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors">
                Clear
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmClear(true)} className="text-sm text-text-dim hover:text-red-400 transition-colors">
            Clear profile
          </button>
        )}
      </div>
    </div>
  )
}
