import { memo } from 'react'
import { CircleMarker, Popup } from 'react-leaflet'
import { COLORS } from '../theme/colors'

const DRIVER_STYLE = {
  radius: 9,
  color: COLORS.driver.stroke,
  weight: 2,
  fillColor: COLORS.driver.fill,
  fillOpacity: 1,
}

/**
 * Renders the driver's current animated position as an orange circle.
 *
 * Movement smoothing: the marker's position updates once per second
 * (one animation tick). A CSS transition on the Leaflet SVG path would
 * require direct DOM access; instead, the 1s tick interval itself
 * provides a natural rhythm — the marker "snaps" to a new position
 * each second, which is the correct representation of a 1 Hz update.
 */
function DriverMarker({ position }) {
  if (!position) return null

  return (
    <CircleMarker
      center={position}
      pathOptions={DRIVER_STYLE}
      radius={DRIVER_STYLE.radius}
    >
      <Popup>
        <strong>Driver</strong>
        <br />
        {position[0].toFixed(5)}, {position[1].toFixed(5)}
      </Popup>
    </CircleMarker>
  )
}

export default memo(DriverMarker)
