import { memo } from 'react'
import { COLORS } from '../../theme/colors'

const LEGEND_ITEMS = [
  { swatch: 'legend-swatch--line', color: COLORS.route, label: 'Driver route' },
  { swatch: 'legend-swatch--dot', color: COLORS.driver.fill, label: 'Driver (live position)' },
  { swatch: 'legend-swatch--area', color: COLORS.corridor.fill, label: '350m route corridor' },
  { swatch: 'legend-swatch--area', color: COLORS.h3Grid.fill, label: 'H3 hexagons (res 9)' },
  { swatch: 'legend-swatch--dot', color: COLORS.pickupEligible.fill, label: 'Eligible pickup point' },
  { swatch: 'legend-swatch--dot', color: COLORS.pickupIneligible.fill, label: 'Ineligible pickup point' },
  { swatch: 'legend-swatch--zone', color: COLORS.zoneBoundary.fill, label: 'Service zone boundary' },
]

/**
 * Static legend mapping map colors/symbols to their meaning.
 * Kept as a plain data-driven list so adding a new layer later
 * (e.g. zone boundaries) is a one-line addition to LEGEND_ITEMS.
 */
function Legend() {
  return (
    <section className="sidebar__section">
      <h2 className="sidebar__heading">Legend</h2>
      <ul className="legend-list">
        {LEGEND_ITEMS.map((item) => (
          <li key={item.label} className="legend-list__item">
            <span
              className={`legend-swatch ${item.swatch}`}
              style={{ background: item.color, borderColor: item.color }}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default memo(Legend)
