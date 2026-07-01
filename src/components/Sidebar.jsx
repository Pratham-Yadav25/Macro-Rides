import { memo } from 'react'
import StatsPanel from './sidebar/StatsPanel'
import Legend from './sidebar/Legend'
import SimulationControls from './sidebar/SimulationControls'

/**
 * App sidebar. Purely a layout/composition shell — each concern
 * (stats, legend, controls) is its own component so they can be
 * reordered, reused, or extended independently.
 */
function Sidebar({
  totalPickups,
  eligiblePickups,
  isRunning,
  progressPercent,
  onToggleRunning,
  onReset,
}) {
  return (
    <aside className="sidebar">
      <SimulationControls isRunning={isRunning} onToggleRunning={onToggleRunning} onReset={onReset} />
      <StatsPanel
        totalPickups={totalPickups}
        eligiblePickups={eligiblePickups}
        isRunning={isRunning}
        progressPercent={progressPercent}
      />
      <Legend />
    </aside>
  )
}

export default memo(Sidebar)
