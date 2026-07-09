import { useEffect, useState } from 'react'
import { fetchCorps } from '../lib/api'
import { useProfile } from '../context/UserProfileContext'
import { geocode, haversineDistance } from '../lib/geo'
import CorpsCard from '../components/dashboard/CorpsCard'
import type { Corps } from '../types'

const EXPERIENCE_LABELS: Record<string, string> = {
  'first-time': 'First-time auditionee',
  '1-2 seasons': '1–2 seasons',
  '3+ seasons': '3+ seasons',
  'age-out': 'Age-out member',
}

export default function Dashboard() {
  const { profile } = useProfile()
  const [corps, setCorps] = useState<Corps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredCorps, setFilteredCorps] = useState<Corps[]>([])
  const [filtering, setFiltering] = useState(false)

  useEffect(() => {
    fetchCorps()
      .then(setCorps)
      .catch(() => setError('Failed to load corps. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!corps.length) return

    const applyFilters = async () => {
      if (!profile || profile.locationRadius === 'any' || !profile.lat) {
        setFilteredCorps(corps)
        return
      }

      setFiltering(true)
      const radius = parseInt(profile.locationRadius)
      const results = await Promise.all(
        corps.map(async (c) => {
          if (!c.audition_location) return c
          const coords = await geocode(c.audition_location)
          if (!coords) return c
          const dist = haversineDistance(profile.lat!, profile.lng!, coords.lat, coords.lng)
          return dist <= radius ? c : null
        }),
      )
      setFilteredCorps(results.filter(Boolean) as Corps[])
      setFiltering(false)
    }

    applyFilters()
  }, [corps, profile])

  const recommended = profile?.instrument
    ? filteredCorps.filter((c) => c.instruments?.includes(profile.instrument))
    : []
  const recommendedIds = new Set(recommended.map((c) => c.id))
  const others = filteredCorps.filter((c) => !recommendedIds.has(c.id))
  const filteredOut = corps.length - filteredCorps.length

  return (
    <div>
      {profile ? (
        <div className="mb-8">
          <div className="bg-brand-surface border border-brand-border rounded-xl px-6 py-5 mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white mb-1">
                Hey {profile.name}, here's what we found for you.
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-2.5 py-1 rounded-full font-medium">
                  {profile.instrument}
                </span>
                <span className="text-xs bg-brand-dark border border-brand-border text-gray-400 px-2.5 py-1 rounded-full">
                  {EXPERIENCE_LABELS[profile.experience]}
                </span>
                {profile.location && (
                  <span className="text-xs bg-brand-dark border border-brand-border text-gray-400 px-2.5 py-1 rounded-full">
                    📍 {profile.location}
                    {profile.locationRadius !== 'any' && ` · within ${profile.locationRadius} mi`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {filteredOut > 0 && (
            <p className="text-xs text-gray-500 mb-4">
              {filteredOut} corps outside your {profile.locationRadius}-mile radius are hidden.
            </p>
          )}
        </div>
      ) : (
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Audition Dashboard</h1>
          <p className="text-gray-400">Browse DCI corps audition dates, locations, and requirements.</p>
        </div>
      )}

      {(loading || filtering) && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {!loading && !filtering && !error && (
        <>
          {recommended.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-brand-gold font-bold text-sm uppercase tracking-wider">⭐ Recommended for You</span>
                <span className="text-xs text-gray-500">· matches your section</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommended.map((c) => (
                  <div key={c.id} className="relative">
                    <div className="absolute -top-2 -right-2 z-10 bg-brand-gold text-black text-xs font-bold px-2 py-0.5 rounded-full">
                      Match
                    </div>
                    <CorpsCard corps={c} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {others.length > 0 && (
            <div>
              {recommended.length > 0 && (
                <p className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">All Corps</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {others.map((c) => (
                  <CorpsCard key={c.id} corps={c} />
                ))}
              </div>
            </div>
          )}

          {filteredCorps.length === 0 && corps.length > 0 && (
            <p className="text-gray-500 text-center py-16">
              No corps match your location radius. Try expanding your range.
            </p>
          )}

          {corps.length === 0 && (
            <p className="text-gray-500 text-center py-16">No corps found. Seed the database to get started.</p>
          )}
        </>
      )}
    </div>
  )
}
