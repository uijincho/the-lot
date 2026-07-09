import { useEffect, useState } from 'react'
import { fetchCorps } from '../lib/api'
import { useProfile } from '../context/UserProfileContext'
import CorpsCard from '../components/dashboard/CorpsCard'
import type { Corps } from '../types'

export default function Dashboard() {
  const { profile } = useProfile()
  const [corps, setCorps] = useState<Corps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCorps()
      .then(setCorps)
      .catch(() => setError('Failed to load corps. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  const corpsInStates =
    profile?.states && profile.states.length > 0
      ? corps.filter((c) =>
          profile.states.some((code) => c.audition_location?.includes(code))
        )
      : corps

  const recommendedIds = new Set(
    profile?.instruments?.length
      ? corpsInStates
          .filter((c) => profile.instruments.some((i) => c.instruments?.includes(i)))
          .map((c) => c.id)
      : [],
  )
  const filteredOut = corps.length - corpsInStates.length

  return (
    <div>
      {profile ? (
        <div className="mb-8">
          <div className="bg-brand-surface border border-brand-border rounded-xl px-6 py-5 mb-6">
            <h1 className="text-2xl font-extrabold text-white mb-1">
              {profile.name ? `Hey ${profile.name}, here's` : "Here's"} what we found for you.
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.instruments?.map((inst) => (
                <span key={inst} className="text-xs bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-2.5 py-1 rounded-full font-medium">
                  {inst}
                </span>
              ))}
              <span className="text-xs bg-brand-dark border border-brand-border text-gray-400 px-2.5 py-1 rounded-full">
                {profile.experience === 'first-time' ? 'First-time auditionee' : 'Experienced member'}
              </span>
              {profile.states.length > 0 && (
                <span className="text-xs bg-brand-dark border border-brand-border text-gray-400 px-2.5 py-1 rounded-full">
                  📍 {profile.states.join(', ')}
                </span>
              )}
            </div>
          </div>

          {filteredOut > 0 && (
            <p className="text-xs text-gray-500 mb-4">
              {filteredOut} corps outside your selected states are hidden.
            </p>
          )}
        </div>
      ) : (
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Audition Dashboard</h1>
          <p className="text-gray-400">Browse DCI corps audition dates, locations, and requirements.</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {corpsInStates.length > 0 && (
            <div>
              {recommendedIds.size > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-brand-gold font-bold text-sm uppercase tracking-wider">⭐ Recommended for You</span>
                  <span className="text-xs text-gray-500">· matches your section</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {corpsInStates.map((c) => (
                  <div key={c.id} className="relative">
                    {recommendedIds.has(c.id) && (
                      <div className="absolute -top-2 -right-2 z-10 bg-brand-gold text-black text-xs font-bold px-2 py-0.5 rounded-full">
                        Match
                      </div>
                    )}
                    <CorpsCard corps={c} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {corpsInStates.length === 0 && corps.length > 0 && (
            <p className="text-gray-500 text-center py-16">
              No corps match your selected states. Try adding more states or clearing your filter.
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
