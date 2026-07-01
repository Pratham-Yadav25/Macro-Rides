import { memo } from 'react'
import { TileLayer } from 'react-leaflet'
import { TILE_LAYER } from '../utils/constants'

/**
 * OpenStreetMap tile layer, pre-configured with the standard URL
 * template and attribution string from constants. Wrapped in memo
 * so it never re-renders (the tile config is fully static).
 */
function OSMTileLayer() {
  return <TileLayer url={TILE_LAYER.url} attribution={TILE_LAYER.attribution} />
}

export default memo(OSMTileLayer)
