import { useMemo } from 'react'
import { buildRouteCorridor } from '../utils/geo'
import { CORRIDOR_RADIUS_METERS } from '../utils/constants'

/**
 * Computes the buffered corridor polygon for a route once, so multiple
 * consumers (the green polygon display, the H3 hex grid) can share the
 * same result instead of each re-running Turf's buffer calculation.
 */
export function useRouteCorridor(route, radiusMeters = CORRIDOR_RADIUS_METERS) {
  return useMemo(() => buildRouteCorridor(route, radiusMeters), [route, radiusMeters])
}
