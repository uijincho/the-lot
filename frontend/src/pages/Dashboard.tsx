import { useEffect, useState } from 'react'
import { fetchCorps } from '../lib/api'
import { useProfile } from '../context/UserProfileContext'
import CorpsCard from '../components/dashboard/CorpsCard'
import CorpsListRow from '../components/dashboard/CorpsListRow'
import DashboardFilters, { type ClassFilter, type ViewMode } from '../components/dashboard/DashboardFilters'
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
  const [viewMode, setViewMode] = useState<ViewMode>('card')

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

  const worldCorps = filtered.filter((c) => c.corps_class !== 'Open')
  const openCorps = filtered.filter((c) => c.corps_class === 'Open')

  return (
    <div>
      {/* Welcome banner */}
      {profile ? (
        <div className="bg-surface border border-border rounded-xl px-6 py-5 mb-6">
          <h1 className="text-2xl font-display font-extrabold text-text mb-1">
            {profile.name ? `Hey ${profile.name}, here's` : "Here's"} what we found for you.
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.instruments?.map((inst) => (
              <span key={inst} className="text-xs bg-accent-muted text-accent border border-accent px-2.5 py-1 rounded-full font-medium">
                {inst}
              </span>
            ))}
            <span className="text-xs bg-bg border border-border text-text-dim px-2.5 py-1 rounded-full">
              {profile.experience === 'rookie' ? 'Rookie' : 'Experienced member'}
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="text-3xl font-display font-extrabold text-text mb-2">Audition Dashboard</h1>
          <p className="text-text-dim">Browse DCI corps audition dates, locations, and requirements.</p>
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
          viewMode={viewMode}
          onViewMode={setViewMode}
        />
      )}

      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <p className="text-text-dim text-center py-16">
              {corps.length > 0 ? 'No corps match the current filters.' : 'No corps found. Seed the database to get started.'}
            </p>
          ) : (
            <div className="flex flex-col gap-10">
              {[{ label: 'World Class', items: worldCorps }, { label: 'Open Class', items: openCorps }]
                .filter(({ items }) => items.length > 0)
                .map(({ label, items }) => (
                  <section key={label}>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-sm font-display font-bold uppercase tracking-widest text-text-dim">{label}</h2>
                      <span className="text-xs font-mono text-text-dim opacity-60">{items.length} corps</span>
                      <div className="flex-1 yard-rule" />
                    </div>
                    {viewMode === 'card' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {items.map((c) => (
                          <div key={c.id} className="relative">
                            {showRecommended && recommendedIds.has(c.id) && (
                              <div className="absolute -top-2 -right-2 z-10 bg-accent text-accent-text text-xs font-bold px-2 py-0.5 rounded-full">
                                Match
                              </div>
                            )}
                            <CorpsCard corps={c} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {items.map((c) => (
                          <CorpsListRow
                            key={c.id}
                            corps={c}
                            isMatch={recommendedIds.has(c.id)}
                            showMatch={showRecommended}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
