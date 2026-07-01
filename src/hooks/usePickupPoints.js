import { useMemo, useRef } from 'react'
import { generateRandomPickupPoints } from '../utils/randomPoints'
import { latLngToH3 } from '../utils/h3'

/**
 * Generates a fixed pool of random pickup points (once, on mount —
 * cached in a ref so they don't reshuffle on every render), converts
 * each to its H3 cell index, and flags whether that cell is part of
 * the supplied corridor cell set.
 *
 * @param {Object} options
 * @param {number} options.count - number of pickup points to generate
 * @param {[number, number]} options.center - [lat, lng] to scatter points around
 * @param {number} options.radiusKm - scatter radius in km
 * @param {number} options.resolution - H3 resolution to index points at
 * @param {string[]} options.corridorCells - H3 cell indexes that make up the corridor
 */
export function usePickupPoints({ count, center, radiusKm, resolution, corridorCells }) {
  const pointsRef = useRef(null)
  if (!pointsRef.current) {
    pointsRef.current = generateRandomPickupPoints(count, center, radiusKm)
  }

  const corridorCellSet = useMemo(() => new Set(corridorCells), [corridorCells])

  return useMemo(() => {
    return pointsRef.current.map((point) => {
      const h3Index = latLngToH3(point.lat, point.lng, resolution)
      return {
        ...point,
        h3Index,
        eligible: corridorCellSet.has(h3Index),
      }
    })
  }, [resolution, corridorCellSet])
}
