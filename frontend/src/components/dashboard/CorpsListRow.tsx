import type { Corps } from '../../types'

interface Props {
  corps: Corps
  isMatch?: boolean
  showMatch?: boolean
}

export default function CorpsListRow({ corps, isMatch, showMatch }: Props) {
  const formattedDate = corps.audition_date
    ? new Date(corps.audition_date + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'TBA'

  return (
    <div className="bg-surface border border-border rounded-lg px-5 py-3 flex items-center gap-4 hover:border-accent transition-colors">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="font-display font-semibold text-text truncate">{corps.name}</span>
        {corps.corps_class && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
            corps.corps_class === 'Open'
              ? 'bg-structure-soft text-structure border border-structure-line'
              : 'bg-accent-soft text-accent border border-accent'
          }`}>
            {corps.corps_class}
          </span>
        )}
        {showMatch && isMatch && (
          <span className="text-xs bg-accent text-accent-text font-bold px-2 py-0.5 rounded-full shrink-0">
            Match
          </span>
        )}
      </div>

      <span className="text-sm text-text-dim shrink-0 w-44 truncate hidden sm:block">
        {corps.location ?? '—'}
      </span>

      <span className="font-mono text-sm text-accent font-semibold shrink-0 w-28 hidden md:block">
        {formattedDate}
      </span>

      {corps.website_url ? (
        <a
          href={corps.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent hover:underline shrink-0"
        >
          🔗
        </a>
      ) : (
        <span className="w-14 shrink-0 hidden sm:block" />
      )}
    </div>
  )
}
