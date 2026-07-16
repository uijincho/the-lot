import { useState } from 'react'
import { STATE_NAMES } from '../profile/ProfileForm'
import type { Corps } from '../../types'

export type ClassFilter = 'all' | 'World' | 'Open'
export type ViewMode = 'card' | 'list'

interface Props {
  corps: Corps[]
  showRecommended: boolean
  onToggleRecommended: () => void
  filterClass: ClassFilter
  onFilterClass: (c: ClassFilter) => void
  filterStates: string[]
  onToggleState: (code: string) => void
  onClearStates: () => void
  hasRecommended: boolean
  viewMode: ViewMode
  onViewMode: (m: ViewMode) => void
}

const TOP_N = 3

export default function DashboardFilters({
  corps,
  showRecommended,
  onToggleRecommended,
  filterClass,
  onFilterClass,
  filterStates,
  onToggleState,
  onClearStates,
  hasRecommended,
  viewMode,
  onViewMode,
}: Props) {
  const [statesExpanded, setStatesExpanded] = useState(false)

  const stateCounts = new Map<string, number>()
  corps.forEach((c) => {
    if (!c.audition_location) return
    Object.keys(STATE_NAMES).forEach((code) => {
      if (code !== 'Remote' && c.audition_location!.includes(code))
        stateCounts.set(code, (stateCounts.get(code) ?? 0) + 1)
    })
  })

  const topStates = Array.from(stateCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_N)
    .map(([code]) => code)

  const allStatesSorted = Array.from(stateCounts.keys()).sort()
  const stateOptions = statesExpanded ? allStatesSorted : topStates

  return (
    <div className="bg-surface border border-border rounded-xl px-4 py-3 mb-6 flex flex-wrap items-center gap-4">
      {/* Recommendations toggle */}
      {hasRecommended && (
        <button
          type="button"
          onClick={onToggleRecommended}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
            showRecommended
              ? 'bg-accent-soft border-accent text-accent'
              : 'bg-bg border-border text-text-dim'
          }`}
        >
          <span>{showRecommended ? '⭐' : '☆'}</span>
          Recommendations
        </button>
      )}

      {/* Class filter */}
      <div className="flex items-center gap-1">
        {(['all', 'World', 'Open'] as ClassFilter[]).map((cls) => (
          <button
            key={cls}
            type="button"
            onClick={() => onFilterClass(cls)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              filterClass === cls
                ? 'bg-accent-soft border-accent text-accent'
                : 'bg-bg border-border text-text-dim hover:text-text'
            }`}
          >
            {cls === 'all' ? 'All Classes' : `${cls} Class`}
          </button>
        ))}
      </div>

      {/* Location filter (states + video) */}
      {stateOptions.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-text-dim font-mono mr-0.5">Locations:</span>
          <button
            type="button"
            onClick={() => onToggleState('Remote')}
            className={`text-xs font-mono font-medium px-2.5 py-1 rounded-lg border transition-colors ${
              filterStates.includes('Remote')
                ? 'bg-accent text-accent-text border-accent'
                : 'bg-bg text-text-dim border-border hover:text-text'
            }`}
          >
            Video
          </button>
          {stateOptions.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => onToggleState(code)}
              className={`text-xs font-mono font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                filterStates.includes(code)
                  ? 'bg-accent text-accent-text border-accent'
                  : 'bg-bg text-text-dim border-border hover:text-text'
              }`}
            >
              {code}
            </button>
          ))}
          {filterStates.length > 0 && (
            <button
              type="button"
              onClick={onClearStates}
              className="text-xs text-text-dim hover:text-text ml-1 transition-colors"
            >
              Clear
            </button>
          )}
          {stateCounts.size > TOP_N && (
            <button
              type="button"
              onClick={() => setStatesExpanded((v) => !v)}
              className="text-xs text-text-dim hover:text-text ml-1 transition-colors"
            >
              {statesExpanded ? '− less' : `+${stateCounts.size - TOP_N} more`}
            </button>
          )}
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {/* {activeCount > 0 && (
          <span className="text-xs font-mono text-text-dim">{activeCount} filter{activeCount > 1 ? 's' : ''} active</span>
        )} */}
        <div className="flex items-center gap-0.5 border border-border rounded-lg overflow-hidden">
          <button
            type="button"
            title="Card view"
            onClick={() => onViewMode('card')}
            className={`p-1.5 transition-colors ${viewMode === 'card' ? 'bg-accent-muted text-accent' : 'text-text-dim hover:text-text'}`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor"/>
            </svg>
          </button>
          <button
            type="button"
            title="List view"
            onClick={() => onViewMode('list')}
            className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-accent-muted text-accent' : 'text-text-dim hover:text-text'}`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="2" rx="1" fill="currentColor"/>
              <rect x="1" y="6" width="12" height="2" rx="1" fill="currentColor"/>
              <rect x="1" y="10" width="12" height="2" rx="1" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
