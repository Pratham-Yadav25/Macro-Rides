/**
 * Generates `count` random lat/lng points scattered within `radiusKm`
 * of a center point. Used to simulate a city-wide pool of candidate
 * pickup points; in production this would come from a pickup-point
 * database/service instead.
 *
 * Uses a simple uniform-disc sampling approach (sqrt of a uniform
 * random for radius) so points don't cluster unrealistically near
 * the center.
 */
export function generateRandomPickupPoints(count, center, radiusKm) {
  const [centerLat, centerLng] = center
  const points = []

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI
    const distanceKm = Math.sqrt(Math.random()) * radiusKm

    // ~111.32 km per degree latitude; longitude degree length shrinks
    // with cos(latitude).
    const deltaLat = (distanceKm * Math.cos(angle)) / 111.32
    const deltaLng =
      (distanceKm * Math.sin(angle)) / (111.32 * Math.cos((centerLat * Math.PI) / 180))

    points.push({
      id: `pickup-${i}`,
      lat: centerLat + deltaLat,
      lng: centerLng + deltaLng,
    })
  }

  return points
}
