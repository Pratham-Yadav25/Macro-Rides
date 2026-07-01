import * as turf from '@turf/turf'

/**
 * Builds a buffered polygon (the "corridor") around a route.
 *
 * @param {Object} routeGeoJSON - a GeoJSON Feature<LineString>
 * @param {number} radiusMeters - buffer radius in meters
 * @returns {Object|null} a GeoJSON Feature<Polygon|MultiPolygon>, or null if input is missing
 */
export function buildRouteCorridor(routeGeoJSON, radiusMeters) {
  if (!routeGeoJSON) return null

  // Turf wants the radius/units pair explicitly; meters keeps this in
  // sync with how the rest of the app (H3 queries, etc.) reasons about
  // the 350m corridor requirement.
  return turf.buffer(routeGeoJSON, radiusMeters, { units: 'meters' })
}
