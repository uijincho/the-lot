import { useEffect, useState } from 'react'
import { fetchCorps } from '../lib/api'
import CorpsCard from '../components/dashboard/CorpsCard'
import type { Corps } from '../types'

export default function Dashboard() {
  const [corps, setCorps] = useState<Corps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCorps()
      .then(setCorps)
      .catch(() => setError('Failed to load corps. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">Audition Dashboard</h1>
        <p className="text-gray-400">Browse DCI corps audition dates, locations, and requirements.</p>
      </div>

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

      {!loading && !error && corps.length === 0 && (
        <p className="text-gray-500 text-center py-16">No corps found. Seed the database to get started.</p>
      )}

      {!loading && !error && corps.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {corps.map((c) => (
            <CorpsCard key={c.id} corps={c} />
          ))}
        </div>
      )}
    </div>
  )
}
