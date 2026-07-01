import { Component } from 'react'

/**
 * Catches render/lifecycle errors from any child layer (Turf buffer,
 * H3 conversion, Leaflet GeoJSON) and shows a fallback message instead
 * of a blank screen. Implemented as a class component because the
 * React error boundary API (componentDidCatch / getDerivedStateFromError)
 * has no hooks equivalent.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // In production this would forward to an error tracking service
    // (e.g. Sentry). Console is sufficient for a demo.
    console.error('[Macro Rides] Render error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-screen" role="alert">
          <span className="error-screen__icon">⚠</span>
          <strong className="error-screen__title">Something went wrong</strong>
          <p className="error-screen__message">
            {this.state.error.message ?? 'An unexpected error occurred.'}
          </p>
          <button
            type="button"
            className="error-screen__retry"
            onClick={() => this.setState({ error: null })}
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
