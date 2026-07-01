import { memo } from 'react'
import { CircleMarker, Popup } from 'react-leaflet'
import { COLORS } from '../theme/colors'

// `radius` lives only in pathOptions — passing it to CircleMarker again
// was redundant (react-leaflet reads it from pathOptions automatically).
const ELIGIBLE_STYLE = {
  radius: 6,
  color: COLORS.pickupEligible.stroke,
  weight: 1.5,
  fillColor: COLORS.pickupEligible.fill,
  fillOpacity: 0.9,
}

const INELIGIBLE_STYLE = {
  radius: 3,
  color: COLORS.pickupIneligible.stroke,
  weight: 1,
  fillColor: COLORS.pickupIneligible.fill,
  fillOpacity: 0.5,
}

/**
 * Renders 500 pickup points as circle markers. Eligible points (whose
 * H3 cell falls inside the route corridor) are drawn larger and green;
 * ineligible points are small and grey so the eligible set stands out
 * without hiding the overall density.
 *
 * Radius is read from pathOptions by react-leaflet — no need to pass
 * it as a separate `radius` prop to <CircleMarker>.
 */
function PickupPoints({ points, showIneligible = true }) {
  return (
    <>
      {points.map((point) => {
        if (!point.eligible && !showIneligible) return null

        const pathOptions = point.eligible ? ELIGIBLE_STYLE : INELIGIBLE_STYLE

        return (
          <CircleMarker
            key={point.id}
            center={[point.lat, point.lng]}
            pathOptions={pathOptions}
            radius={pathOptions.radius}
          >
            <Popup>
              <strong>{point.eligible ? '✅ Eligible pickup point' : 'Pickup point'}</strong>
              <br />
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                {point.h3Index}
              </span>
            </Popup>
          </CircleMarker>
        )
      })}
    </>
  )
}

export default memo(PickupPoints)
