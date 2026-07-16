import type { AuditionCaption, Corps } from '../types'

const INSTRUMENT_TO_CAPTION: Record<string, AuditionCaption> = {
  Trumpet: 'Brass', Mellophone: 'Brass', Baritone: 'Brass',
  Euphonium: 'Brass', Contra: 'Brass',
  Snare: 'Drumline', Tenor: 'Drumline', Bass: 'Drumline', Cymbal: 'Drumline',
  Marimba: 'Front Ensemble', Vibraphone: 'Front Ensemble', Xylophone: 'Front Ensemble',
  Synthesizer: 'Front Ensemble', Timpani: 'Front Ensemble', 'Aux Percussion': 'Front Ensemble',
  Rifle: 'Color Guard', Sabre: 'Color Guard', Flag: 'Color Guard', Dance: 'Color Guard',
}

export function instrumentsToCaption(instruments: string[]): AuditionCaption | null {
  for (const inst of instruments) {
    const caption = INSTRUMENT_TO_CAPTION[inst]
    if (caption) return caption
  }
  return null
}

/**
 * Returns the audition locations for a corps, scoped to a caption when available.
 * Falls back through: caption → All → audition_location string → [].
 */
export function getLocationsForCaption(
  corps: Corps,
  caption: AuditionCaption | null,
): string[] {
  const byCaption = corps.audition_locations

  if (byCaption) {
    const specific = caption ? byCaption[caption] : undefined
    const all = byCaption['All']
    const merged = [...(specific ?? []), ...(all ?? [])]
    if (merged.length) return merged
  }

  // Fall back to the legacy semicolon-separated string
  return corps.audition_location
    ? corps.audition_location.split(';').map((s) => s.trim()).filter(Boolean)
    : []
}

/**
 * Returns all audition locations across all captions (for state filtering).
 */
export function getAllLocations(corps: Corps): string[] {
  if (corps.audition_locations) {
    const all = Object.values(corps.audition_locations).flat()
    if (all.length) return all
  }
  return corps.audition_location
    ? corps.audition_location.split(';').map((s) => s.trim()).filter(Boolean)
    : []
}
