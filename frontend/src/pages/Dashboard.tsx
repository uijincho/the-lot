import { useEffect, useState } from 'react'
import { fetchCorps } from '../lib/api'
import { useProfile } from '../context/UserProfileContext'
import CorpsCard from '../components/dashboard/CorpsCard'
import DashboardFilters, { type ClassFilter } from '../components/dashboard/DashboardFilters'
import type { Corps } from '../types'

export default function Dashboard() {
  const { profile } = useProfile()
  const [corps, setCorps] = useState<Corps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // filters — states init from profile
  const [showRecommended, setShowRecommended] = useState(true)
  const [filterClass, setFilterClass] = useState<ClassFilter>('all')
  const [filterStates, setFilterStates] = useState<string[]>([])

  useEffect(() => {
    fetchCorps()
      .then(setCorps)
      .catch(() => setError('Failed to load corps. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  // init state filter from profile once corps load
  useEffect(() => {
    if (corps.length && profile?.states?.length) setFilterStates(profile.states)
  }, [corps.length])

  const toggleState = (code: string) =>
    setFilterStates((prev) =>
      prev.includes(code) ? prev.filter((s) => s !== code) : [...prev, code],
    )

  // apply class filter
  const byClass =
    filterClass === 'all' ? corps : corps.filter((c) => c.corps_class === filterClass)

  // apply state filter
  const filtered =
    filterStates.length > 0
      ? byClass.filter((c) => filterStates.some((code) => c.audition_location?.includes(code)))
      : byClass

  const recommendedIds = new Set(
    profile?.instruments?.length
      ? filtered
          .filter((c) => profile.instruments.some((i) => c.instruments?.includes(i)))
          .map((c) => c.id)
      : [],
  )

  const hasRecommended = recommendedIds.size > 0

  return (
    <div>
      {/* Welcome banner */}
      {profile ? (
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
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">Audition Dashboard</h1>
          <p className="text-gray-400">Browse DCI corps audition dates, locations, and requirements.</p>
        </div>
      )}

      {/* Filters */}
      {!loading && !error && corps.length > 0 && (
        <DashboardFilters
          corps={corps}
          showRecommended={showRecommended}
          onToggleRecommended={() => setShowRecommended((v) => !v)}
          filterClass={filterClass}
          onFilterClass={setFilterClass}
          filterStates={filterStates}
          onToggleState={toggleState}
          onClearStates={() => setFilterStates([])}
          hasRecommended={hasRecommended}
        />
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
          {showRecommended && hasRecommended && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand-gold font-bold text-sm uppercase tracking-wider">⭐ Recommended for You</span>
              <span className="text-xs text-gray-500">· matches your section</span>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <div key={c.id} className="relative">
                  {showRecommended && recommendedIds.has(c.id) && (
                    <div className="absolute -top-2 -right-2 z-10 bg-brand-gold text-black text-xs font-bold px-2 py-0.5 rounded-full">
                      Match
                    </div>
                  )}
                  <CorpsCard corps={c} />
                </div>
              ))}
            </div>
          ) : corps.length > 0 ? (
            <p className="text-gray-500 text-center py-16">
              No corps match the current filters.
            </p>
          ) : (
            <p className="text-gray-500 text-center py-16">No corps found. Seed the database to get started.</p>
          )}
        </>
      )}
    </div>
  )
}
