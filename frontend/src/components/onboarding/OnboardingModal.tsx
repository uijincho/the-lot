import { useAuth } from '../../context/AuthContext'
import ProfileForm, { EMPTY_PROFILE } from '../profile/ProfileForm'

export default function OnboardingModal() {
  const { isFirstVisit, saveProfile, skipOnboarding } = useAuth()

  if (!isFirstVisit) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-lg p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-6">
          <p className="text-accent text-xs font-mono font-bold uppercase tracking-widest mb-1">Welcome to</p>
          <h2 className="text-2xl font-display font-extrabold text-text">The Lot</h2>
          <p className="text-text-dim text-sm mt-1">Tell us about yourself to personalize your audition experience.</p>
        </div>
        <ProfileForm
          initialValues={EMPTY_PROFILE}
          onSave={saveProfile}
          submitLabel="Let's go →"
          secondaryAction={{ label: 'Skip for now', onClick: skipOnboarding }}
        />
      </div>
    </div>
  )
}
