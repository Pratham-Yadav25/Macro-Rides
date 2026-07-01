import * as turf from '@turf/turf'

// Below this distance, lineSliceAlong/along can produce degenerate
// geometry (zero-length lines), which breaks Turf's buffer step.
// Clamping to a small minimum keeps the corridor/marker valid even
// at the very start of the animation.
const MIN_DISTANCE_KM = 0.05

/**
 * Total length of a GeoJSON LineString route, in kilometers.
 */
export function getRouteLengthKm(route) {
  return turf.length(route, { units: 'kilometers' })
}

/**
 * Returns the portion of the route from the start up to `distanceKm`,
 * as a GeoJSON Feature<LineString> — i.e. "how much road the driver
 * has covered so far."
 */
export function sliceTraveledRoute(route, distanceKm) {
  const safeDistance = Math.max(distanceKm, MIN_DISTANCE_KM)
  return turf.lineSliceAlong(route, 0, safeDistance, { units: 'kilometers' })
}

/**
 * Returns the [lat, lng] position `distanceKm` along the route —
 * i.e. "where the driver currently is."
 */
export function pointAtDistance(route, distanceKm) {
  const safeDistance = Math.max(distanceKm, MIN_DISTANCE_KM)
  const point = turf.along(route, safeDistance, { units: 'kilometers' })
  const [lng, lat] = point.geometry.coordinates
  return [lat, lng]
}
