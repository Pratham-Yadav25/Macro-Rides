// Centralized config values used across the app.
// Keeping these in one place makes it easy to re-center the map
// or swap defaults later (e.g. when live driver location is wired in).

export const MAP_DEFAULTS = {
  // Bangalore (MG Road / city center area)
  center: [12.9716, 77.5946],
  zoom: 13,
  minZoom: 10,
  maxZoom: 19,
}

export const TILE_LAYER = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}

// 350m corridor radius, kept here so future components (buffer, H3 queries)
// all reference a single source of truth.
export const CORRIDOR_RADIUS_METERS = 350
