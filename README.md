# Macro Rides — Zone & Route Corridor Visualization

A React + Vite + Leaflet demo for Macro Rides: animates a driver along a
route, recalculates a 350m H3-indexed corridor every second as they move,
and highlights which of 500 simulated pickup points are currently eligible.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploy to Vercel

This is a static Vite app, so Vercel's zero-config Vite preset works
out of the box. `vercel.json` is included to make the settings explicit:

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, "Add New Project" → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command
   `npm run build`, output directory `dist` (already set in
   `vercel.json`, no manual config needed).
4. Deploy. No environment variables are required — everything (route,
   pickup points) is generated client-side.

Alternatively, via the Vercel CLI:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Project structure

```
src/
  components/
    MapView.jsx          # Owns the Leaflet MapContainer; accepts layers as children
    OSMTileLayer.jsx      # Reusable OpenStreetMap tile layer
    Header.jsx            # App title bar
    Sidebar.jsx            # Composes the sidebar sections below
    sidebar/
      StatsPanel.jsx       # Total/eligible pickup counts, driver status, progress
      Legend.jsx            # Color/symbol key, data-driven from theme/colors.js
      SimulationControls.jsx  # Start/Stop/Reset buttons
    DriverRoute.jsx        # Blue polyline for the full route (GeoJSON LineString)
    RouteCorridor.jsx      # Semi-transparent green corridor polygon
    H3HexGrid.jsx          # H3 hexagon overlay covering the corridor
    PickupPoints.jsx       # 500 sample points; eligible ones highlighted
    DriverMarker.jsx       # Animated driver position marker
  hooks/
    useDriverAnimation.js  # Drives the once-per-second progress tick + play/pause/reset
    useRouteCorridor.js     # Memoized Turf buffer around a route
    usePickupPoints.js      # Generates pickup points once; recomputes eligibility
  utils/
    constants.js          # Map defaults (Bangalore center/zoom), tile config, corridor radius
    geo.js                 # Turf.js buffer wrapper
    h3.js                  # h3-js wrappers (polygon→cells, cell→GeoJSON, point→cell)
    route.js                # Route slicing / point-at-distance helpers (Turf)
    randomPoints.js          # Random pickup point generator
  theme/
    colors.js              # Single source of truth for every map/legend color
  data/
    driverRoute.js          # Sample GeoJSON route through central Bangalore
  styles/
    index.css               # Global styles, incl. responsive breakpoints
  App.jsx                   # Composition root: owns animation state, derives the rest
  main.jsx
```

## Architecture notes

- **One source of truth per concern.** Colors live in `theme/colors.js`
  and are imported everywhere (map layers + legend) instead of being
  redefined per component. Map/corridor defaults live in `utils/constants.js`.
- **State flows one way.** `App.jsx` holds the only "live" state (the
  animation tick + running flag). Every other value — driver position,
  traveled corridor, H3 cells, pickup-point eligibility — is *derived*
  from it via `useMemo`, so a single state update per second produces
  one coherent re-render pass instead of several independent ones.
- **Layer components are dumb and memoized.** `DriverRoute`,
  `RouteCorridor`, `H3HexGrid`, `PickupPoints`, and `DriverMarker` are
  wrapped in `React.memo` and only know how to render the data they're
  handed — none of them import Turf or h3-js directly.
- **Geometry logic is isolated.** All Turf.js and h3-js calls are
  wrapped in `utils/geo.js`, `utils/h3.js`, and `utils/route.js`, kept
  out of components so they can be unit-tested or swapped independently
  (e.g. replacing the simulated route with a live driver feed only
  touches `data/driverRoute.js` and the animation hook).

## Notes

- The driver route, corridor, H3 resolution, and pickup-point pool are
  simulated client-side for demo purposes. Swapping in a live driver
  feed or a real pickup-point service means replacing `data/driverRoute.js`
  and `hooks/usePickupPoints.js` respectively — the rest of the app is
  unaffected.
