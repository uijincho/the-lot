import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../context/UserProfileContext'
import ProfileForm, { EMPTY_PROFILE } from '../components/profile/ProfileForm'
import type { UserProfile } from '../types'

export default function Profile() {
  const { profile, saveProfile, clearProfile } = useProfile()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  const initialValues: UserProfile = profile ?? EMPTY_PROFILE

  const handleSave = (data: UserProfile) => {
    saveProfile(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleClear = () => {
    clearProfile()
    navigate('/')
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white mb-1">Your Profile</h1>
        <p className="text-gray-400 text-sm">Update your preferences to keep recommendations and chat answers personalized.</p>
      </div>

      <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
        <ProfileForm
          initialValues={initialValues}
          onSave={handleSave}
          submitLabel="Save changes"
        />
      </div>

      {saved && (
        <div className="mt-4 bg-green-900/30 border border-green-700 text-green-300 rounded-lg px-4 py-3 text-sm text-center">
          Profile saved ✓
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-brand-border">
        {confirmClear ? (
          <div className="flex items-center justify-between bg-red-900/20 border border-red-800 rounded-xl px-4 py-3">
            <p className="text-sm text-red-300">Clear your profile and all preferences?</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmClear(false)} className="text-sm text-gray-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={handleClear} className="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors">
                Clear
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmClear(true)} className="text-sm text-gray-600 hover:text-red-400 transition-colors">
            Clear profile
          </button>
        )}
      </div>
    </div>
  )
}
