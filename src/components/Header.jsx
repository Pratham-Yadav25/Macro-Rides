import { memo } from 'react'

function Header() {
  return (
    <header className="app-header">
      <span className="app-header__brand">Macro Rides</span>
      <span className="app-header__subtitle">Zone &amp; Route Corridor Visualization</span>
    </header>
  )
}

export default memo(Header)
