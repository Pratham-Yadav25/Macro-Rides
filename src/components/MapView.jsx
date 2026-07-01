import { memo } from 'react'
import { MapContainer } from 'react-leaflet'
import OSMTileLayer from './OSMTileLayer'
import { MAP_DEFAULTS } from '../utils/constants'

/**
 * MapView is the single Leaflet map canvas for the app. It owns the
 * MapContainer + base tile layer and accepts children so spatial
 * layers (route, corridor, hex grid, pickup points, zones, driver
 * marker) can be composed in without MapView needing to know about
 * any of them.
 *
 * MapContainer is intentionally static — its center/zoom/scroll props
 * are initial values, not reactive, which is correct: the viewport
 * belongs to the user once the map loads.
 *
 * Wrapped in memo: the tile layer and map config never change.
 */
function MapView({ children }) {
  return (
    <MapContainer
      center={MAP_DEFAULTS.center}
      zoom={MAP_DEFAULTS.zoom}
      minZoom={MAP_DEFAULTS.minZoom}
      maxZoom={MAP_DEFAULTS.maxZoom}
      scrollWheelZoom
      className="map-canvas"
      aria-label="Macro Rides route corridor map"
    >
      <OSMTileLayer />
      {children}
    </MapContainer>
  )
}

export default memo(MapView)
