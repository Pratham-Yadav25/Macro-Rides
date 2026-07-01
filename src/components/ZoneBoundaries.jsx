import { memo, useCallback } from 'react'
import { GeoJSON } from 'react-leaflet'
import { COLORS } from '../theme/colors'

const ZONE_STYLE = {
  color: COLORS.zoneBoundary.stroke,
  weight: 2,
  opacity: 0.8,
  fillColor: COLORS.zoneBoundary.fill,
  fillOpacity: 0.07, // deliberately very light — zones are context, not focus
  dashArray: '6 4',  // dashed outline distinguishes them from the solid corridor
}

// Stable style getter — defined outside the component so the same
// function reference is passed on every render (avoids Leaflet
// re-styling the layer unnecessarily).
const getZoneStyle = () => ZONE_STYLE

/**
 * Renders Macro Rides service zone boundary polygons (FeatureCollection).
 * Zones sit beneath all other layers so they serve as orientation
 * context without obscuring the driver route or corridor.
 *
 * Each zone gets a permanent Leaflet tooltip so its name is always
 * visible without requiring interaction.
 */
function ZoneBoundaries({ zones }) {
  // useCallback keeps the same function reference across renders so
  // react-leaflet / Leaflet don't re-bind tooltips on every tick.
  const onEachFeature = useCallback((feature, layer) => {
    if (feature.properties?.name) {
      layer.bindTooltip(feature.properties.name, {
        permanent: true,
        direction: 'center',
        className: 'zone-label',
      })
    }
  }, [])

  if (!zones) return null

  return (
    <GeoJSON
      key="zone-boundaries"
      data={zones}
      style={getZoneStyle}
      onEachFeature={onEachFeature}
    />
  )
}

export default memo(ZoneBoundaries)
