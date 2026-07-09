import { useState } from 'react'
import { STATE_NAMES } from '../profile/ProfileForm'
import type { Corps } from '../../types'

export type ClassFilter = 'all' | 'World' | 'Open'

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
}: Props) {
  const [statesExpanded, setStatesExpanded] = useState(false)

  // derive state options from loaded corps
  const stateCounts = new Map<string, number>()
  corps.forEach((c) => {
    if (!c.audition_location) return
    Object.keys(STATE_NAMES).forEach((code) => {
      if (c.audition_location!.includes(code)) stateCounts.set(code, (stateCounts.get(code) ?? 0) + 1)
    })
  })

  const topStates = Array.from(stateCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_N)
    .map(([code]) => code)

  const allStatesSorted = Array.from(stateCounts.keys()).sort()

  const stateOptions = statesExpanded ? allStatesSorted : topStates

  const activeCount = (filterStates.length > 0 ? 1 : 0) + (filterClass !== 'all' ? 1 : 0) + (!showRecommended ? 1 : 0)

  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl px-4 py-3 mb-6 flex flex-wrap items-center gap-4">
      {/* Recommendations toggle */}
      {hasRecommended && (
        <button
          type="button"
          onClick={onToggleRecommended}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
            showRecommended
              ? 'bg-brand-gold/10 border-brand-gold text-brand-gold'
              : 'bg-brand-dark border-brand-border text-gray-500'
          }`}
        >
          <span>{showRecommended ? '⭐' : '☆'}</span>
          Matches
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
                ? 'bg-brand-gold/10 border-brand-gold text-brand-gold'
                : 'bg-brand-dark border-brand-border text-gray-500 hover:border-gray-400'
            }`}
          >
            {cls === 'all' ? 'All Classes' : `${cls} Class`}
          </button>
        ))}
      </div>

      {/* State filter */}
      {stateOptions.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-gray-500 mr-0.5">States:</span>
          {stateOptions.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => onToggleState(code)}
              className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                filterStates.includes(code)
                  ? 'bg-brand-gold text-black border-brand-gold'
                  : 'bg-brand-dark text-gray-500 border-brand-border hover:border-gray-400'
              }`}
            >
              {code}
            </button>
          ))}
          {filterStates.length > 0 && (
            <button
              type="button"
              onClick={onClearStates}
              className="text-xs text-gray-600 hover:text-gray-400 ml-1 transition-colors"
            >
              Clear
            </button>
          )}
          {stateCounts.size > TOP_N && (
            <button
              type="button"
              onClick={() => setStatesExpanded((v) => !v)}
              className="text-xs text-gray-500 hover:text-gray-300 ml-1 transition-colors"
            >
              {statesExpanded ? '− less' : `+${stateCounts.size - TOP_N} more`}
            </button>
          )}
        </div>
      )}

      {activeCount > 0 && (
        <span className="ml-auto text-xs text-gray-600">{activeCount} filter{activeCount > 1 ? 's' : ''} active</span>
      )}
    </div>
  )
}
