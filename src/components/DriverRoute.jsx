import { memo } from 'react'
import { GeoJSON } from 'react-leaflet'
import { COLORS } from '../theme/colors'

const ROUTE_STYLE = {
  color: COLORS.route,
  weight: 5,
  opacity: 0.85,
  lineCap: 'round',
  lineJoin: 'round',
}

// Stable style getter — defined once so the same function reference
// is passed to every GeoJSON render, preventing Leaflet from
// re-styling the layer when nothing has changed.
const getRouteStyle = () => ROUTE_STYLE

/**
 * Renders a driver's route (GeoJSON Feature<LineString>) as a blue
 * polyline. Accepts the GeoJSON as a prop so this component is
 * decoupled from the data source (static sample today, live feed later).
 *
 * The `key` is derived from the route coordinates so react-leaflet
 * remounts the GeoJSON layer if the route itself changes. (react-leaflet
 * v4's GeoJSON.updateGeoJSON does not react to `data` prop changes.)
 */
function DriverRoute({ route, style = ROUTE_STYLE }) {
  if (!route) return null

  const routeKey = `route-${route.geometry.coordinates.length}-${route.geometry.coordinates[0]?.[0]}`

  return <GeoJSON key={routeKey} data={route} style={getRouteStyle} />
}

export default memo(DriverRoute)
