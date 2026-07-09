import { useEffect, useState } from 'react'
import { fetchCorps } from '../../lib/api'
import type { CorpsHistoryEntry, UserProfile } from '../../types'

// ── constants ────────────────────────────────────────────────────────────────

export const SECTIONS: Record<string, string[]> = {
  Brass: ['Trumpet', 'Mellophone', 'Baritone', 'Euphonium', 'Contra'],
  Drumline: ['Snare', 'Tenor', 'Bass', 'Cymbal'],
  'Front Ensemble': ['Marimba', 'Vibraphone', 'Xylophone', 'Synthesizer', 'Timpani', 'Aux Percussion'],
  'Color Guard': ['Rifle', 'Sabre', 'Flag', 'General Effect'],
}

export const DCI_CORPS = [
  'Blue Devils', 'Santa Clara Vanguard', 'Bluecoats', 'Carolina Crown',
  'The Cadets', 'Cavaliers', 'Phantom Regiment', 'Boston Crusaders',
  'Blue Stars', 'Madison Scouts', 'Colts', 'Blue Knights',
  'Spirit of Atlanta', 'Crossmen', 'Genesis', 'Music City',
  'Pacific Crest', 'Mandarins', 'Troopers', 'Oregon Crusaders',
  'Seattle Cascades', 'Gold', 'Jersey Surf', 'Pioneer',
  'River City Rhythm', 'Raiders', 'Southwind', 'Legends',
  '7th Regiment', 'Racine Scouts', 'Guardians',
]

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
  ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
  TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
}

const CURRENT_YEAR = 2026
const YEARS = Array.from({ length: CURRENT_YEAR - 2009 }, (_, i) => String(CURRENT_YEAR - i))

// ── corps history panel ───────────────────────────────────────────────────────

function CorpsHistoryPanel({
  entries,
  onSave,
  onClose,
}: {
  entries: CorpsHistoryEntry[]
  onSave: (entries: CorpsHistoryEntry[]) => void
  onClose: () => void
}) {
  const [list, setList] = useState<CorpsHistoryEntry[]>(entries)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')
  const [year, setYear] = useState(String(CURRENT_YEAR - 1))
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = DCI_CORPS.filter((c) => c.toLowerCase().includes(search.toLowerCase()))

  const selectCorps = (name: string) => {
    setSelected(name)
    setSearch(name)
    setShowDropdown(false)
  }

  const addEntry = () => {
    if (!selected) return
    if (list.some((e) => e.corps === selected && e.year === year)) return
    setList((prev) => [...prev, { corps: selected, year }])
    setSelected('')
    setSearch('')
  }

  const removeEntry = (i: number) => setList((prev) => prev.filter((_, idx) => idx !== i))

  const inputCls = 'w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors'

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-text">Corps History</h3>
          <button onClick={onClose} className="text-text-dim hover:text-text text-xl leading-none">×</button>
        </div>
        <p className="text-text-dim text-sm mb-4">Add every corps you've marched and the year.</p>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <input
              className={inputCls}
              placeholder="Search corps..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelected(''); setShowDropdown(true) }}
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && search && filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-bg border border-border rounded-lg overflow-hidden z-10 max-h-44 overflow-y-auto shadow-xl">
                {filtered.map((c) => (
                  <button key={c} type="button" onMouseDown={() => selectCorps(c)}
                    className="w-full text-left px-3 py-2 text-sm text-text hover:bg-surface transition-colors">
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
          <select
            className="bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent font-mono"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <button type="button" onClick={addEntry} disabled={!selected}
            className="bg-accent text-accent-text font-bold px-4 py-2 rounded-lg text-sm hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            Add
          </button>
        </div>
        {list.length > 0 ? (
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {list.map((e, i) => (
              <div key={i} className="flex items-center justify-between bg-bg border border-border rounded-lg px-3 py-2">
                <span className="text-sm text-text">{e.corps}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-accent font-mono font-semibold">{e.year}</span>
                  <button type="button" onClick={() => removeEntry(i)} className="text-text-dim hover:text-red-400 text-sm transition-colors">✕</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-dim text-sm text-center py-4 mb-4">No corps added yet</p>
        )}
        <button type="button" onClick={() => { onSave(list); onClose() }}
          className="w-full bg-accent text-accent-text font-bold py-2.5 rounded-xl text-sm hover:brightness-110 transition-all">
          Done
        </button>
      </div>
    </div>
  )
}

// ── shared form ───────────────────────────────────────────────────────────────

export const EMPTY_PROFILE: UserProfile = {
  name: '',
  instruments: [],
  age: '',
  experience: 'rookie',
  corpsHistory: [],
  states: [],
}

interface ProfileFormProps {
  initialValues: UserProfile
  onSave: (profile: UserProfile) => void
  submitLabel?: string
  secondaryAction?: { label: string; onClick: () => void }
}

export default function ProfileForm({
  initialValues,
  onSave,
  submitLabel = 'Save',
  secondaryAction,
}: ProfileFormProps) {
  const [form, setForm] = useState<UserProfile>(initialValues)
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (!initialValues.instruments?.length) return ''
    for (const [cat, sections] of Object.entries(SECTIONS)) {
      if (initialValues.instruments.some((i) => sections.includes(i))) return cat
    }
    return ''
  })
  const [stateOptions, setStateOptions] = useState<{ code: string; name: string; count: number }[]>([])
  const [showCorpsPanel, setShowCorpsPanel] = useState(false)

  useEffect(() => {
    fetchCorps().then((allCorps) => {
      const counts = new Map<string, number>()
      allCorps.forEach((c) => {
        if (!c.audition_location) return
        Object.keys(STATE_NAMES).forEach((code) => {
          if (c.audition_location!.includes(code)) counts.set(code, (counts.get(code) ?? 0) + 1)
        })
      })
      setStateOptions(
        Array.from(counts.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([code, count]) => ({ code, name: STATE_NAMES[code], count })),
      )
    }).catch(() => {})
  }, [])

  const isBrass = selectedCategory === 'Brass'

  const toggleSection = (section: string) => {
    if (isBrass) {
      setForm((prev) => ({ ...prev, instruments: prev.instruments[0] === section ? [] : [section] }))
    } else {
      setForm((prev) => ({
        ...prev,
        instruments: prev.instruments.includes(section)
          ? prev.instruments.filter((s) => s !== section)
          : [...prev.instruments, section],
      }))
    }
  }

  const toggleState = (code: string) =>
    setForm((prev) => ({
      ...prev,
      states: prev.states.includes(code) ? prev.states.filter((s) => s !== code) : [...prev.states, code],
    }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.instruments.length) return
    onSave(form)
  }

  const inputCls = 'w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-dim focus:outline-none focus:border-accent transition-colors'
  const labelCls = 'block text-xs font-semibold text-text-dim uppercase tracking-wider mb-1.5'
  const stateBtn = (code: string) =>
    `px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
      form.states.includes(code)
        ? 'bg-accent text-accent-text border-accent'
        : 'bg-bg text-text-dim border-border hover:text-text'
    }`

  return (
    <>
      {showCorpsPanel && (
        <CorpsHistoryPanel
          entries={form.corpsHistory}
          onSave={(entries) => setForm((prev) => ({ ...prev, corpsHistory: entries }))}
          onClose={() => setShowCorpsPanel(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Age */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Name</label>
            <input className={inputCls} placeholder="Your name" value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Age</label>
            <input className={inputCls + ' font-mono'} type="number" placeholder="e.g. 19" min={14} max={22}
              value={form.age} onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))} />
          </div>
        </div>

        {/* Section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelCls + ' mb-0'}>Section *</label>
            {!isBrass && selectedCategory && (
              <span className="text-xs text-text-dim">Select all that apply</span>
            )}
          </div>
          <div className="flex gap-2 mb-2">
            {Object.keys(SECTIONS).map((cat) => (
              <button key={cat} type="button"
                onClick={() => { setSelectedCategory(cat); setForm((p) => ({ ...p, instruments: [] })) }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-accent-soft border-accent text-accent'
                    : 'bg-bg border-border text-text-dim hover:text-text'
                }`}>
                {cat}
              </button>
            ))}
          </div>
          {selectedCategory && (
            <div className="flex flex-wrap gap-2">
              {SECTIONS[selectedCategory].map((section) => (
                <button key={section} type="button" onClick={() => toggleSection(section)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    form.instruments.includes(section)
                      ? 'bg-accent text-accent-text border-accent'
                      : 'bg-bg text-text-dim border-border hover:text-text'
                  }`}>
                  {section}
                </button>
              ))}
            </div>
          )}
          {!selectedCategory && (
            <p className="text-xs text-text-dim">Select a category above</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className={labelCls}>Experience</label>
          <div className="grid grid-cols-2 gap-3">
            {(['rookie', 'experienced'] as const).map((val) => (
              <button key={val} type="button"
                onClick={() => setForm((p) => ({ ...p, experience: val }))}
                className={`rounded-xl border px-4 py-4 text-left transition-colors ${
                  form.experience === val
                    ? 'border-accent bg-accent-soft'
                    : 'border-border hover:border-accent/50'
                }`}>
                <p className={`font-display font-bold text-sm ${form.experience === val ? 'text-accent' : 'text-text'}`}>
                  {val === 'rookie' ? '🥁 Rookie' : '🏆 Experienced'}
                </p>
                <p className="text-xs text-text-dim mt-0.5">
                  {val === 'rookie' ? 'New to DCI auditions' : "I've marched before"}
                </p>
              </button>
            ))}
          </div>
          {form.experience === 'experienced' && (
            <button type="button" onClick={() => setShowCorpsPanel(true)}
              className="mt-3 w-full flex items-center justify-between border border-border rounded-xl px-4 py-3 hover:border-accent transition-colors group">
              <div className="text-left">
                <p className="text-sm font-semibold text-text group-hover:text-accent transition-colors">
                  {form.corpsHistory.length > 0 ? `${form.corpsHistory.length} corps added` : 'Add your corps history'}
                </p>
                {form.corpsHistory.length > 0 && (
                  <p className="text-xs text-text-dim mt-0.5 font-mono">
                    {form.corpsHistory.map((e) => `${e.corps} '${e.year.slice(2)}`).join(' · ')}
                  </p>
                )}
              </div>
              <span className="text-accent text-lg">→</span>
            </button>
          )}
        </div>

        {/* States */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelCls + ' mb-0'}>States you'd audition in</label>
            {form.states.length > 0 && (
              <button type="button" onClick={() => setForm((p) => ({ ...p, states: [] }))}
                className="text-xs text-text-dim hover:text-text transition-colors">
                Clear
              </button>
            )}
          </div>
          {stateOptions.length === 0 ? (
            <p className="text-xs text-text-dim">Loading states...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {stateOptions.map((s) => (
                <button key={s.code} type="button" onClick={() => toggleState(s.code)} className={stateBtn(s.code)}>
                  {s.code}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          {secondaryAction ? (
            <button type="button" onClick={secondaryAction.onClick}
              className="text-sm text-text-dim hover:text-text transition-colors">
              {secondaryAction.label}
            </button>
          ) : <span />}
          <button type="submit" disabled={!form.instruments.length}
            className="bg-accent text-accent-text font-bold px-6 py-2.5 rounded-xl text-sm hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            {submitLabel}
          </button>
        </div>
      </form>
    </>
  )
}
