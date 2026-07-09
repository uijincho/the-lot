import { useState } from 'react'
import { useProfile } from '../../context/UserProfileContext'
import { geocode, reverseGeocode } from '../../lib/geo'
import type { UserProfile } from '../../types'

const INSTRUMENTS = [
  'Trumpet', 'Mellophone', 'Baritone', 'Tuba',
  'Snare', 'Tenor Drums', 'Bass Drum', 'Front Ensemble', 'Color Guard',
]

const EXPERIENCE_OPTIONS: { value: UserProfile['experience']; label: string }[] = [
  { value: 'first-time', label: 'First time auditioning' },
  { value: '1-2 seasons', label: '1–2 seasons of DCI' },
  { value: '3+ seasons', label: '3+ seasons of DCI' },
  { value: 'age-out', label: 'Current member / age-out' },
]

const RADIUS_OPTIONS: { value: UserProfile['locationRadius']; label: string }[] = [
  { value: 'any', label: 'Any distance' },
  { value: '500', label: 'Within 500 mi' },
  { value: '1000', label: 'Within 1,000 mi' },
  { value: '2000', label: 'Within 2,000 mi' },
]

export default function OnboardingModal() {
  const { isFirstVisit, saveProfile, skipOnboarding } = useProfile()

  const [form, setForm] = useState<Omit<UserProfile, 'lat' | 'lng'>>({
    name: '',
    instrument: '',
    age: '',
    experience: 'first-time',
    location: '',
    locationRadius: 'any',
  })
  const [locating, setLocating] = useState(false)
  const [saving, setSaving] = useState(false)

  if (!isFirstVisit) return null

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const name = await reverseGeocode(coords.latitude, coords.longitude)
        setForm((prev) => ({ ...prev, location: name ?? `${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)}` }))
        setLocating(false)
      },
      () => setLocating(false),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.instrument) return
    setSaving(true)

    let lat: number | undefined
    let lng: number | undefined
    if (form.location) {
      const coords = await geocode(form.location)
      if (coords) { lat = coords.lat; lng = coords.lng }
    }

    saveProfile({ ...form, lat, lng })
    setSaving(false)
  }

  const inputClass = 'w-full bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold transition-colors'
  const labelClass = 'block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-brand-surface border border-brand-border rounded-2xl w-full max-w-lg p-8 shadow-2xl">
        <div className="mb-6">
          <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-1">Welcome to</p>
          <h2 className="text-2xl font-extrabold text-white">The Lot</h2>
          <p className="text-gray-400 text-sm mt-1">Tell us about yourself so we can personalize your audition experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name *</label>
              <input className={inputClass} placeholder="Your name" value={form.name} onChange={set('name')} required />
            </div>
            <div>
              <label className={labelClass}>Age</label>
              <input className={inputClass} type="number" placeholder="e.g. 19" min={14} max={22} value={form.age} onChange={set('age')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Instrument / Section *</label>
              <select className={inputClass} value={form.instrument} onChange={set('instrument')} required>
                <option value="">Select section</option>
                {INSTRUMENTS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Experience</label>
              <select className={inputClass} value={form.experience} onChange={set('experience')}>
                {EXPERIENCE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Your Location</label>
            <div className="flex gap-2">
              <input className={inputClass} placeholder="City, State (e.g. Chicago, IL)" value={form.location} onChange={set('location')} />
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={locating}
                className="shrink-0 border border-brand-border rounded-lg px-3 py-2 text-xs text-gray-400 hover:text-white hover:border-gray-400 transition-colors disabled:opacity-40"
              >
                {locating ? '...' : '📍'}
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>How far are you willing to travel?</label>
            <div className="grid grid-cols-2 gap-2">
              {RADIUS_OPTIONS.map((o) => (
                <label key={o.value} className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-sm transition-colors ${form.locationRadius === o.value ? 'border-brand-gold text-white' : 'border-brand-border text-gray-400 hover:border-gray-500'}`}>
                  <input type="radio" name="radius" value={o.value} checked={form.locationRadius === o.value} onChange={set('locationRadius')} className="accent-brand-gold" />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button type="button" onClick={skipOnboarding} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Skip for now
            </button>
            <button
              type="submit"
              disabled={saving || !form.name || !form.instrument}
              className="bg-brand-gold text-black font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : "Let's go →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
