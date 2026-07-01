import { polygonToCells, cellToBoundary, latLngToCell } from 'h3-js'

/**
 * Converts a single lat/lng pair into its H3 cell index at the given
 * resolution. Thin wrapper kept here so all H3 calls funnel through
 * one module instead of importing h3-js directly in components.
 */
export function latLngToH3(lat, lng, resolution) {
  return latLngToCell(lat, lng, resolution)
}

/**
 * Converts a GeoJSON Polygon/MultiPolygon feature into a deduplicated
 * list of H3 cell indexes at the given resolution.
 *
 * Handles MultiPolygon (which Turf's buffer can produce when the route
 * corridor splits into separate lobes) by running each polygon ring set
 * through h3-js individually and merging the results.
 *
 * @param {Object} polygonFeature - GeoJSON Feature<Polygon|MultiPolygon>
 * @param {number} resolution - H3 resolution (0-15)
 * @returns {string[]} array of unique H3 cell indexes
 */
export function polygonToH3Cells(polygonFeature, resolution) {
  if (!polygonFeature) return []

  const { geometry } = polygonFeature
  const polygons =
    geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates]

  const cellSet = new Set()

  for (const polygonCoords of polygons) {
    // h3-js expects [lng, lat] loops with isGeoJson=true, matching
    // GeoJSON's coordinate order directly (no need to swap to [lat, lng]).
    const cells = polygonToCells(polygonCoords, resolution, true)
    cells.forEach((cell) => cellSet.add(cell))
  }

  return Array.from(cellSet)
}

/**
 * Converts a list of H3 cell indexes into a GeoJSON FeatureCollection
 * of hexagon polygons, ready to hand to a <GeoJSON> layer.
 *
 * @param {string[]} cells - H3 cell indexes
 * @returns {Object} GeoJSON FeatureCollection<Polygon>
 */
export function cellsToGeoJSON(cells) {
  return {
    type: 'FeatureCollection',
    features: cells.map((cell) => ({
      type: 'Feature',
      properties: { h3Index: cell },
      geometry: {
        type: 'Polygon',
        // formatAsGeoJson=true returns [lng, lat] boundary coords already
        // closed-loop ready for GeoJSON's "first point repeated" rule.
        coordinates: [closeRing(cellToBoundary(cell, true))],
      },
    })),
  }
}

function closeRing(ring) {
  const [firstLng, firstLat] = ring[0]
  const [lastLng, lastLat] = ring[ring.length - 1]
  if (firstLng === lastLng && firstLat === lastLat) return ring
  return [...ring, ring[0]]
}
