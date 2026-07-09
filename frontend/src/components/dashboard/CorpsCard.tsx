import type { Corps } from '../../types'

interface Props {
  corps: Corps
}

export default function CorpsCard({ corps }: Props) {
  const formattedDate = corps.audition_date
    ? new Date(corps.audition_date + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'TBA'

  return (
    <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-accent transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-display font-bold text-text">{corps.name}</h2>
          {corps.corps_class && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
              corps.corps_class === 'Open'
                ? 'bg-structure-soft text-structure border border-structure-line'
                : 'bg-accent-soft text-accent border border-accent'
            }`}>
              {corps.corps_class} Class
            </span>
          )}
        </div>
        {corps.website_url && (
          <a
            href={corps.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:underline shrink-0"
          >
            🔗
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-text-dim text-xs uppercase tracking-wider mb-1 font-mono">Home Base</p>
          <p className="text-text">{corps.location ?? '—'}</p>
        </div>
        <div>
          <p className="text-text-dim text-xs uppercase tracking-wider mb-1 font-mono">Audition Date</p>
          <p className="text-accent font-mono font-semibold">{formattedDate}</p>
        </div>
        <div className="col-span-2">
          <p className="text-text-dim text-xs uppercase tracking-wider mb-1 font-mono">Audition Location</p>
          <p className="text-text">{corps.audition_location ?? '—'}</p>
        </div>
      </div>
    </div>
  )
}
