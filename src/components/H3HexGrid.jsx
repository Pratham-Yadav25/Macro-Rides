import { memo, useMemo } from 'react'
import { GeoJSON } from 'react-leaflet'
import { cellsToGeoJSON } from '../utils/h3'
import { COLORS } from '../theme/colors'

const HEX_STYLE = {
  color: COLORS.h3Grid.stroke,
  weight: 1,
  opacity: 0.6,
  fillColor: COLORS.h3Grid.fill,
  fillOpacity: 0.12,
}

const getHexStyle = () => HEX_STYLE

/**
 * Renders H3 cell indexes as a hexagon grid overlay.
 * Takes the cell list as a prop so the same cell set computed in
 * App can be reused for pickup-point eligibility checks without
 * running polygonToH3Cells twice.
 *
 * Key uses the first + last cell index alongside count so the layer
 * remounts whenever the set composition changes, not just its size.
 */
function H3HexGrid({ cells, resolution = 9 }) {
  const hexGeoJSON = useMemo(() => cellsToGeoJSON(cells), [cells])

  if (!hexGeoJSON.features.length) return null

  const first = cells[0] ?? ''
  const last = cells[cells.length - 1] ?? ''
  const gridKey = `h3-grid-${resolution}-${cells.length}-${first}-${last}`

  return (
    <GeoJSON
      key={gridKey}
      data={hexGeoJSON}
      style={getHexStyle}
    />
  )
}

export default memo(H3HexGrid)
