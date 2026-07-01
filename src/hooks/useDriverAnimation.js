import { useEffect, useMemo, useState, useCallback } from 'react'
import { getRouteLengthKm } from '../utils/route'

/**
 * Drives a simulated driver along a route, advancing once per tick.
 *
 * Exposes a single numeric state (traveledKm) that all downstream
 * values — driver position, corridor slice, H3 cells, pickup
 * eligibility — derive from via useMemo in the consumer. One state
 * update per tick → one coherent re-render pass.
 *
 * Controls:
 *   toggleRunning — pause / resume the interval
 *   reset — jump back to the start; also resumes the animation so
 *            the driver immediately starts moving again (better UX
 *            than resetting to a frozen state)
 */
export function useDriverAnimation(route, { tickMs = 1000, durationSeconds = 30 } = {}) {
  const totalLengthKm = useMemo(() => getRouteLengthKm(route), [route])
  const speedKmPerTick = totalLengthKm / durationSeconds

  const [traveledKm, setTraveledKm] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return undefined

    const id = setInterval(() => {
      setTraveledKm((prev) => {
        const next = prev + speedKmPerTick
        return next >= totalLengthKm ? 0 : next
      })
    }, tickMs)

    return () => clearInterval(id)
  }, [isRunning, tickMs, speedKmPerTick, totalLengthKm])

  const toggleRunning = useCallback(() => setIsRunning((prev) => !prev), [])

  // Reset jumps to 0 AND ensures the simulation is running so the
  // driver starts moving immediately instead of sitting frozen at
  // the start position.
  const reset = useCallback(() => {
    setTraveledKm(0)
    setIsRunning(true)
  }, [])

  return { traveledKm, totalLengthKm, isRunning, toggleRunning, reset }
}
