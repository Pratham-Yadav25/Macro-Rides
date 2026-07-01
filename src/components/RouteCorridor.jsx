import { memo } from 'react'
import { GeoJSON } from 'react-leaflet'
import { COLORS } from '../theme/colors'

const CORRIDOR_STYLE = {
  color: COLORS.corridor.stroke,
  weight: 1.5,
  opacity: 0.6,
  fillColor: COLORS.corridor.fill,
  fillOpacity: 0.25,
}

const getCorridorStyle = () => CORRIDOR_STYLE

/**
 * Renders the buffered route corridor (GeoJSON Feature<Polygon|MultiPolygon>)
 * as a semi-transparent green polygon.
 *
 * KEY NOTE: react-leaflet v4 GeoJSON.updateGeoJSON only handles `style`
 * changes, not `data` changes. The key is derived from the corridor's
 * outer ring coordinate count + its first longitude, both of which change
 * every animation tick as the driver moves further along the route.
 * This forces a remount whenever the corridor geometry changes.
 */
function RouteCorridor({ corridor, style = CORRIDOR_STYLE }) {
  if (!corridor) return null

  const outerRing =
    corridor.geometry.type === 'MultiPolygon'
      ? corridor.geometry.coordinates[0][0]
      : corridor.geometry.coordinates[0]

  const corridorKey = `corridor-${outerRing.length}-${outerRing[0]?.[0]?.toFixed(5)}`

  return <GeoJSON key={corridorKey} data={corridor} style={getCorridorStyle} />
}

export default memo(RouteCorridor)
