import { useEffect, useMemo, useState } from 'react'
import { fetchCorps } from '../lib/api'
import { useProfile } from '../context/UserProfileContext'
import CorpsCard from '../components/dashboard/CorpsCard'
import CorpsListRow from '../components/dashboard/CorpsListRow'
import DashboardFilters, { type ClassFilter, type ViewMode } from '../components/dashboard/DashboardFilters'
import { getRecommendations } from '../lib/recommendation'
import { getAllLocations, getLocationsForCaption, instrumentsToCaption } from '../lib/auditionLocations'
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

  const userCaption = profile ? instrumentsToCaption(profile.instruments ?? []) : null

  // apply state filter — check all locations across all captions
  const filtered =
    filterStates.length > 0
      ? byClass.filter((c) => {
          const locs = getAllLocations(c)
          return filterStates.some((code) =>
            code === 'Remote'
              ? locs.some((l) => l.toLowerCase().includes('remote')) ||
                c.requirements?.toLowerCase().includes('video')
              : locs.some((l) => l.includes(code)) || c.location?.includes(code),
          )
        })
      : byClass

  // Build per-card location hint scoped to the user's caption when possible.
  const auditionHints = new Map<string, string>()
  if (filterStates.length) {
    for (const c of filtered) {
      if (filterStates.some((code) => c.location?.includes(code))) continue
      const locs = getLocationsForCaption(c, userCaption)
      const matched = locs.filter((loc) =>
        filterStates.some((code) => code === 'Remote' ? loc.toLowerCase().includes('remote') : loc.includes(code))
      )
      if (matched.length) auditionHints.set(c.id, matched.join('; '))
    }
  }

  const recommendations = useMemo(
    () => (profile ? getRecommendations(filtered, profile) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filtered, profile],
  )
  const recMap = useMemo(
    () => new Map(recommendations.map((r) => [r.corps.id, r])),
    [recommendations],
  )

  const hasRecommended = recommendations.length > 0

  // When recommendations are active, sort all corps by match quality then alpha.
  // Otherwise split into World / Open sections.
  const sortedForRec = useMemo(() => {
    if (!showRecommended || !hasRecommended) return null
    const starScore = (id: string) => recMap.get(id)?.stars ?? 0
    return [...filtered].sort((a, b) => {
      const diff = starScore(b.id) - starScore(a.id)
      return diff !== 0 ? diff : a.name.localeCompare(b.name)
    })
  }, [showRecommended, hasRecommended, filtered, recMap])

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
            {profile.corpsHistory?.length ? (
              profile.corpsHistory.map((e, i) => (
                <span key={i} className="text-xs bg-bg border border-border text-text-dim px-2.5 py-1 rounded-full">
                  {e.corps} &apos;{String(e.year).slice(-2)}
                </span>
              ))
            ) : (
              <span className="text-xs bg-bg border border-border text-text-dim px-2.5 py-1 rounded-full">
                Rookie
              </span>
            )}
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
          ) : sortedForRec ? (
            // ── Recommendation-sorted flat view ──────────────────────────────
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-display font-bold uppercase tracking-widest text-text-dim">Sorted for you</h2>
                <span className="text-xs font-mono text-text-dim opacity-60">{sortedForRec.length} corps</span>
                <div className="flex-1 yard-rule" />
              </div>
              {viewMode === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedForRec.map((c) => (
                    <CorpsCard key={c.id} corps={c} stars={recMap.get(c.id)?.stars} auditionHint={auditionHints.get(c.id)} showAuditionSection={auditionHints.size > 0} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {sortedForRec.map((c) => (
                    <CorpsListRow key={c.id} corps={c} stars={recMap.get(c.id)?.stars} auditionHint={auditionHints.get(c.id)} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // ── Default World / Open class sections ──────────────────────────
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
                          <CorpsCard key={c.id} corps={c} stars={recMap.get(c.id)?.stars} auditionHint={auditionHints.get(c.id)} showAuditionSection={auditionHints.size > 0} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {items.map((c) => (
                          <CorpsListRow key={c.id} corps={c} stars={recMap.get(c.id)?.stars} auditionHint={auditionHints.get(c.id)} />
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
