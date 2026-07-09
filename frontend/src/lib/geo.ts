const geocodeCache = new Map<string, { lat: number; lng: number } | null>()

export async function geocode(location: string): Promise<{ lat: number; lng: number } | null> {
  const key = location.toLowerCase().trim()
  if (geocodeCache.has(key)) return geocodeCache.get(key)!

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1&countrycodes=us`
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
    const data = await res.json()
    const result = data[0] ? { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) } : null
    geocodeCache.set(key, result)
    return result
  } catch {
    geocodeCache.set(key, null)
    return null
  }
}

export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
    const data = await res.json()
    const city = data.address?.city || data.address?.town || data.address?.village || ''
    const state = data.address?.state || ''
    return city && state ? `${city}, ${state}` : null
  } catch {
    return null
  }
}

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8 // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
