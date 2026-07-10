import type { Corps, CorpsHistoryEntry, Recommendation, UserProfile } from '../types'

// ── 6.1 Parent-company pipelines: feeder → parent ────────────────────────────
const PIPELINE: Record<string, string> = {
  'Blue Devils B':   'Blue Devils',
  'Blue Devils C':   'Blue Devils B',
  'Colt Cadets':     'Colts',
  'Vanguard Cadets': 'Santa Clara Vanguard',
}

// ── 6.2 Competitive tiers (A = elite, F = developmental open class) ──────────
const CORPS_TIER: Record<string, string> = {
  // A — medalist / top 6
  'Boston Crusaders': 'A', 'Bluecoats': 'A', 'Santa Clara Vanguard': 'A',
  'Blue Devils': 'A', 'Carolina Crown': 'A', 'Phantom Regiment': 'A',
  // B — upper finalist 7–12
  'Blue Stars': 'B', 'The Cavaliers': 'B', 'Troopers': 'B',
  'Colts': 'B', 'Blue Knights': 'B',
  // C — finalist bubble 13–18
  'Spirit of Atlanta': 'C', 'Madison Scouts': 'C', 'Pacific Crest': 'C',
  'Music City': 'C', 'The Academy': 'C', 'Crossmen': 'C',
  // D — lower semifinalist 19–25
  'Genesis': 'D', 'Seattle Cascades': 'D',
  // E — Open Class podium
  'Spartans': 'E', 'Gold': 'E', 'The Battalion': 'E',
  'Columbians': 'E', 'River City Rhythm': 'E', 'Blue Devils B': 'E', 'Vanguard Cadets': 'E',
  // F — Open Class field / developmental
  '7th Regiment': 'F', 'Raiders': 'F', 'Colt Cadets': 'F', 'Blue Devils C': 'F',
  'Les Stentors': 'F', 'Guardians': 'F', 'Golden Empire': 'F',
  'Impulse': 'F', 'Heat Wave': 'F', 'Gems': 'F', 'Arsenal': 'F',
  'Eclipse': 'F', 'Memphis Blues': 'F', 'Zephyrus': 'F',
}

// ── 6.3 Home state(s) per corps ──────────────────────────────────────────────
const CORPS_HOME_STATES: Record<string, string[]> = {
  'Blue Devils': ['CA'], 'Blue Devils B': ['CA'], 'Blue Devils C': ['CA'],
  'Santa Clara Vanguard': ['CA'], 'Vanguard Cadets': ['CA'],
  'Pacific Crest': ['CA'], 'Gold': ['CA'], 'Golden Empire': ['CA'], 'Impulse': ['CA'],
  'Seattle Cascades': ['WA'], 'Columbians': ['WA'], 'Gems': ['ID'],
  'Blue Knights': ['CO'], 'The Battalion': ['UT'], 'Troopers': ['WY'],
  'The Academy': ['AZ'], 'Zephyrus': ['OK'], 'Arsenal': ['TX'],
  'Crossmen': ['TX'], 'Genesis': ['TX'], 'Guardians': ['TX'],
  'Phantom Regiment': ['IL'], 'The Cavaliers': ['IL'],
  'Colts': ['IA'], 'Colt Cadets': ['IA'],
  'Blue Stars': ['WI'], 'Madison Scouts': ['WI'],
  'River City Rhythm': ['MN'], 'Eclipse': ['IN'],
  'Carolina Crown': ['SC'], 'Spirit of Atlanta': ['GA'],
  'Music City': ['TN'], 'Memphis Blues': ['TN'], 'Heat Wave': ['FL'],
  'Boston Crusaders': ['MA'], 'Spartans': ['NH'],
  '7th Regiment': ['CT'], 'Raiders': ['NJ'],
  'Les Stentors': ['QC'],
}

// ── 6.4 Section reputation hints ─────────────────────────────────────────────
const SECTION_REPS: Record<string, string[]> = {
  Brass: ['Carolina Crown', 'Boston Crusaders', 'Blue Devils', 'Bluecoats', 'Madison Scouts', 'Spirit of Atlanta'],
  Percussion: ['Santa Clara Vanguard', 'Blue Devils', 'Bluecoats'],
  'Front Ensemble': ['Santa Clara Vanguard', 'Blue Devils', 'Bluecoats'],
  'Color Guard': ['Santa Clara Vanguard', 'Blue Devils', 'Boston Crusaders', 'Carolina Crown', 'The Cavaliers'],
}

// Maps individual instruments to section group for reputation lookup
const INSTRUMENT_SECTION: Record<string, string> = {
  Trumpet: 'Brass', Mellophone: 'Brass', Baritone: 'Brass', Euphonium: 'Brass', Contra: 'Brass',
  Snare: 'Percussion', Tenor: 'Percussion', Bass: 'Percussion', Cymbal: 'Percussion',
  Marimba: 'Front Ensemble', Vibraphone: 'Front Ensemble', Xylophone: 'Front Ensemble',
  Synthesizer: 'Front Ensemble', Timpani: 'Front Ensemble', 'Aux Percussion': 'Front Ensemble',
  Rifle: 'Color Guard', Sabre: 'Color Guard', Flag: 'Color Guard', 'General Effect': 'Color Guard',
}

const HIATUS_2026 = new Set(['Mandarins'])
const TIER_ORDER = ['A', 'B', 'C', 'D', 'E', 'F']

// ── helpers ───────────────────────────────────────────────────────────────────

function getUltimateParent(name: string): string {
  let cur = name
  while (PIPELINE[cur]) cur = PIPELINE[cur]
  return cur
}

// Maps 2-value profile.experience + history length → 4-tier spec
function getExperienceTier(profile: UserProfile): 1 | 2 | 3 | 4 {
  if (profile.experience === 'rookie') return 1
  const n = profile.corpsHistory.length
  if (n === 0) return 2
  if (n <= 2) return 3
  return 4
}

function getBestTier(history: CorpsHistoryEntry[]): string | null {
  const tiers = history.map(e => CORPS_TIER[e.corps]).filter((t): t is string => !!t)
  if (!tiers.length) return null
  return tiers.reduce((best, t) =>
    TIER_ORDER.indexOf(t) < TIER_ORDER.indexOf(best) ? t : best
  )
}

// ── signal scorers ────────────────────────────────────────────────────────────

// 3.1 Experience fit (0–30) — spec table §3.1
function scoreExperienceFit(corps: Corps, tier: 1 | 2 | 3 | 4, profile: UserProfile): number {
  const isOpen = corps.corps_class === 'Open'
  const homeStates = CORPS_HOME_STATES[corps.name] ?? []
  const isLocal = profile.states.some(s => homeStates.includes(s))
  const corpsTier = CORPS_TIER[corps.name] ?? ''
  const isLowerWorld = !isOpen && ['C', 'D'].includes(corpsTier)

  if (isOpen) {
    // columns: localOpen, nonLocalOpen by tier row
    const local    = [30, 25, 14,  6]
    const nonLocal = [18, 20, 12,  6]
    return isLocal ? local[tier - 1] : nonLocal[tier - 1]
  } else if (isLowerWorld) {
    // Lower World Class (reach): tiers C & D
    return [8, 22, 30, 24][tier - 1]
  } else {
    // Mid/Top World Class: tiers A & B (or unknown — defaults to top)
    return [0, 6, 18, 30][tier - 1]
  }
}

// 3.2 Geography (0–15)
function scoreGeography(corps: Corps, states: string[]): { score: number; reason: string | null } {
  if (!states.length) return { score: 3, reason: null }
  const homeStates = CORPS_HOME_STATES[corps.name] ?? []
  const homeMatch = states.find(s => homeStates.includes(s))
  if (homeMatch) return { score: 15, reason: `In your states (${homeMatch})` }
  const loc = corps.audition_location ?? ''
  const auditMatch = states.some(s => loc.includes(s))
  if (auditMatch) return { score: 10, reason: 'Auditions in your area' }
  return { score: 3, reason: null }
}

// 3.3 Pipeline bonus (0–15)
function scorePipeline(
  corps: Corps,
  history: CorpsHistoryEntry[],
): { score: number; reason: string | null } {
  const prevNames = history.map(e => e.corps)
  const directFeeder = prevNames.find(p => PIPELINE[p] === corps.name)
  if (directFeeder) return { score: 15, reason: `Pipeline from ${directFeeder}` }
  const candParent = getUltimateParent(corps.name)
  const sameOrg = prevNames.some(p => getUltimateParent(p) === candParent && p !== corps.name)
  if (sameOrg) return { score: 8, reason: 'Same organization family' }
  return { score: 0, reason: null }
}

// 3.4 Ranking adjacency (0–30)
function scoreRankingAdjacency(
  corps: Corps,
  history: CorpsHistoryEntry[],
): { score: number; reason: string | null } {
  if (!history.length) return { score: 5, reason: null }
  const bestTier = getBestTier(history)
  if (!bestTier) return { score: 5, reason: null }
  const candTier = CORPS_TIER[corps.name]
  if (!candTier) return { score: 15, reason: null }
  const bestIdx = TIER_ORDER.indexOf(bestTier)
  const candIdx = TIER_ORDER.indexOf(candTier)
  const dist = candIdx - bestIdx // positive = easier, negative = harder
  if (dist === -1) return { score: 30, reason: 'One tier above your last corps' }
  if (dist === 0)  return { score: 30, reason: 'Same tier as your last corps' }
  if (dist === 1)  return { score: 14, reason: null }
  if (dist === 2)  return { score: 5,  reason: null }
  return { score: 0, reason: null }
}

// 3.5 Instrument fit (null = exclude, 6–10)
function scoreInstrumentFit(
  corps: Corps,
  instruments: string[],
): { score: number | null; reason: string | null } {
  if (!instruments.length) return { score: null, reason: null }
  if (!corps.instruments?.some(i => instruments.includes(i))) return { score: null, reason: null }
  const section = instruments.map(i => INSTRUMENT_SECTION[i]).find(s => !!s)
  if (section && SECTION_REPS[section]?.includes(corps.name)) {
    return { score: 10, reason: `Elite ${section.toLowerCase()} reputation` }
  }
  return { score: 6, reason: null }
}

// ── diversity enforcement ─────────────────────────────────────────────────────

function applyDiversity<T extends { corps: Corps }>(sorted: T[]): T[] {
  const result: T[] = []
  const orgCount = new Map<string, number>()
  for (const item of sorted) {
    const parent = getUltimateParent(item.corps.name)
    const count = orgCount.get(parent) ?? 0
    if (count < 2) {
      result.push(item)
      orgCount.set(parent, count + 1)
    }
    if (result.length >= 10) break
  }
  return result
}

// ── main export ───────────────────────────────────────────────────────────────

export function getRecommendations(corps: Corps[], profile: UserProfile): Recommendation[] {
  if (!profile.instruments.length) return []

  const age = parseInt(profile.age)
  if (!isNaN(age) && age > 22) return []

  const tier = getExperienceTier(profile)
  const marchedNames = new Set(profile.corpsHistory.map(e => e.corps))

  // Returning corps: previously marched, active this season → permanent ⭐⭐⭐, outside 5-corp cap
  const returning: Recommendation[] = corps
    .filter(c => marchedNames.has(c.name) && !HIATUS_2026.has(c.name))
    .map(c => ({
      corps: c,
      score: 100,
      stars: 3 as const,
      reasons: ['You marched here'],
      returning: true,
    }))

  type Scored = { corps: Corps; score: number; reasons: string[]; geoScore: number }
  const scored: Scored[] = []

  for (const c of corps) {
    if (HIATUS_2026.has(c.name)) continue
    if (marchedNames.has(c.name)) continue // returning corps handled above

    const instr = scoreInstrumentFit(c, profile.instruments)
    if (instr.score === null) continue

    const exp  = scoreExperienceFit(c, tier, profile)
    const geo  = scoreGeography(c, profile.states)
    const pipe = scorePipeline(c, profile.corpsHistory)
    const adj  = scoreRankingAdjacency(c, profile.corpsHistory)

    const total = exp + geo.score + pipe.score + adj.score + instr.score

    const reasons: string[] = [geo.reason, pipe.reason, adj.reason, instr.reason]
      .filter((r): r is string => r !== null)
      .slice(0, 3)

    scored.push({ corps: c, score: total, reasons, geoScore: geo.score })
  }

  scored.sort((a, b) => b.score - a.score)

  const pool = applyDiversity(scored)

  let matched: Scored[]
  let extras: Scored[]

  if (tier === 1) {
    // Rookie override: matched must be Open Class AND locally accessible
    const localOpen = pool.filter(s => s.corps.corps_class === 'Open' && s.geoScore >= 10)
    matched = localOpen.slice(0, 3)
    const matchedIds = new Set(matched.map(m => m.corps.id))
    extras = pool.filter(s => !matchedIds.has(s.corps.id)).slice(0, 2)
  } else {
    matched = pool.slice(0, 3)
    extras  = pool.slice(3, 5)
  }

  const newRecs: Recommendation[] = [
    ...matched.map(s => ({ corps: s.corps, score: s.score, stars: 3 as const, reasons: s.reasons })),
    ...extras.map((s, i) => ({
      corps: s.corps, score: s.score,
      stars: (i === 0 ? 2 : 1) as 1 | 2,
      reasons: s.reasons,
    })),
  ]

  return [...returning, ...newRecs]
}
