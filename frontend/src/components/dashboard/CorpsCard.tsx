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
    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 flex flex-col gap-4 hover:border-brand-gold transition-colors">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold text-white">{corps.name}</h2>
        {corps.website_url && (
          <a
            href={corps.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-gold hover:underline shrink-0"
          >
            Website ↗
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Home Base</p>
          <p className="text-gray-200">{corps.location ?? '—'}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Audition Date</p>
          <p className="text-brand-gold font-semibold">{formattedDate}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Audition Location</p>
          <p className="text-gray-200">{corps.audition_location ?? '—'}</p>
        </div>
      </div>

      {corps.instruments && corps.instruments.length > 0 && (
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Sections</p>
          <div className="flex flex-wrap gap-1.5">
            {corps.instruments.map((inst) => (
              <span
                key={inst}
                className="text-xs bg-brand-dark border border-brand-border text-gray-300 px-2 py-0.5 rounded-full"
              >
                {inst}
              </span>
            ))}
          </div>
        </div>
      )}

      {corps.requirements && (
        <p className="text-xs text-gray-400 leading-relaxed border-t border-brand-border pt-4">
          {corps.requirements}
        </p>
      )}
    </div>
  )
}
