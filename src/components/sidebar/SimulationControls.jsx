import { memo } from 'react'

/**
 * Start / Stop / Reset controls for the route animation.
 * Stateless — receives isRunning and callbacks from useDriverAnimation
 * via App so this component has no logic of its own.
 */
function SimulationControls({ isRunning, onToggleRunning, onReset }) {
  return (
    <section className="sidebar__section">
      <h2 className="sidebar__heading">Controls</h2>
      <div className="controls" role="group" aria-label="Simulation controls">
        <button
          type="button"
          className={`controls__button ${isRunning ? 'controls__button--stop' : 'controls__button--start'}`}
          onClick={onToggleRunning}
          aria-pressed={isRunning}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          type="button"
          className="controls__button controls__button--reset"
          onClick={onReset}
        >
          ↺ Reset
        </button>
      </div>
    </section>
  )
}

export default memo(SimulationControls)
