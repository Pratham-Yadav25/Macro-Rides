import { useMemo } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'
import ZoneBoundaries from './components/ZoneBoundaries'
import DriverRoute from './components/DriverRoute'
import RouteCorridor from './components/RouteCorridor'
import H3HexGrid from './components/H3HexGrid'
import PickupPoints from './components/PickupPoints'
import DriverMarker from './components/DriverMarker'
import { driverRouteGeoJSON } from './data/driverRoute'
import { zoneBoundariesGeoJSON } from './data/zoneBoundaries'
import { useRouteCorridor } from './hooks/useRouteCorridor'
import { usePickupPoints } from './hooks/usePickupPoints'
import { useDriverAnimation } from './hooks/useDriverAnimation'
import { polygonToH3Cells } from './utils/h3'
import { sliceTraveledRoute, pointAtDistance } from './utils/route'
import { MAP_DEFAULTS } from './utils/constants'

/**
 * App is the composition root: it owns the one piece of live state
 * (traveledKm from the animation tick) and derives everything else
 * from it via useMemo. All spatial computation (Turf buffer, H3 cell
 * conversion, eligibility check) happens here; every layer component
 * below is a dumb, memoised renderer that just displays what it's
 * handed.
 *
 * Layer render order (bottom to top):
 *   ZoneBoundaries → H3HexGrid → RouteCorridor → DriverRoute
 *     → PickupPoints → DriverMarker
 */

// ─── Demo parameters ───────────────────────────────────────────────
const H3_RESOLUTION          = 9
const PICKUP_POINT_COUNT     = 500
const PICKUP_SCATTER_RADIUS_KM = 6
const ANIMATION_TICK_MS      = 1000
const ANIMATION_DURATION_S   = 30
// ───────────────────────────────────────────────────────────────────

export default function App() {
  const { traveledKm, totalLengthKm, isRunning, toggleRunning, reset } =
    useDriverAnimation(driverRouteGeoJSON, {
      tickMs: ANIMATION_TICK_MS,
      durationSeconds: ANIMATION_DURATION_S,
    })

  // All values below are derived from the single traveledKm state so
  // one interval tick produces exactly one coherent re-render pass.
  const driverPosition = useMemo(
    () => pointAtDistance(driverRouteGeoJSON, traveledKm),
    [traveledKm],
  )

  // Buffer is computed from the route slice covered so far, making
  // the corridor grow visually as the driver advances.
  const traveledRoute = useMemo(
    () => sliceTraveledRoute(driverRouteGeoJSON, traveledKm),
    [traveledKm],
  )

  const corridor     = useRouteCorridor(traveledRoute)
  const corridorCells = useMemo(
    () => polygonToH3Cells(corridor, H3_RESOLUTION),
    [corridor],
  )

  const pickupPoints = usePickupPoints({
    count:       PICKUP_POINT_COUNT,
    center:      MAP_DEFAULTS.center,
    radiusKm:    PICKUP_SCATTER_RADIUS_KM,
    resolution:  H3_RESOLUTION,
    corridorCells,
  })

  const eligibleCount = useMemo(
    () => pickupPoints.filter((p) => p.eligible).length,
    [pickupPoints],
  )

  const progressPercent = useMemo(
    () => Math.min(100, Math.round((traveledKm / totalLengthKm) * 100)),
    [traveledKm, totalLengthKm],
  )

  return (
    <ErrorBoundary>
      <div className="app-shell">
        <Header />
        <div className="app-body">
          <Sidebar
            totalPickups={pickupPoints.length}
            eligiblePickups={eligibleCount}
            isRunning={isRunning}
            progressPercent={progressPercent}
            onToggleRunning={toggleRunning}
            onReset={reset}
          />
          <main className="app-main">
            <ErrorBoundary>
              <MapView>
                <ZoneBoundaries zones={zoneBoundariesGeoJSON} />
                <H3HexGrid cells={corridorCells} resolution={H3_RESOLUTION} />
                <RouteCorridor corridor={corridor} />
                <DriverRoute route={driverRouteGeoJSON} />
                <PickupPoints points={pickupPoints} />
                <DriverMarker position={driverPosition} />
              </MapView>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}
