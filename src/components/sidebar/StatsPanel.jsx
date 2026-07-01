import { memo } from 'react'

/**
 * Displays live simulation stats: pickup counts, driver status, and
 * route progress. Pure presentational — all values are props so this
 * component has no knowledge of H3, Turf, or the animation hook.
 */
function StatsPanel({ totalPickups, eligiblePickups, isRunning, progressPercent }) {
  return (
    <section className="sidebar__section">
      <h2 className="sidebar__heading">Live Stats</h2>

      <dl className="stat-grid">
        <div className="stat-grid__item">
          <dt>Total pickup points</dt>
          <dd>{totalPickups}</dd>
        </div>

        <div className="stat-grid__item">
          <dt>Eligible pickups</dt>
          <dd className="stat-grid__value--eligible">{eligiblePickups}</dd>
        </div>

        <div className="stat-grid__item">
          <dt>Driver status</dt>
          <dd>
            <span
              className={`status-pill ${isRunning ? 'status-pill--running' : 'status-pill--paused'}`}
              role="status"
              aria-live="polite"
            >
              {isRunning ? 'En route' : 'Paused'}
            </span>
          </dd>
        </div>

        <div className="stat-grid__item stat-grid__item--column">
          <dt>Route progress</dt>
          <dd>
            <div className="progress-bar" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-bar__fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="progress-bar__label">{progressPercent}%</span>
          </dd>
        </div>
      </dl>
    </section>
  )
}

export default memo(StatsPanel)
