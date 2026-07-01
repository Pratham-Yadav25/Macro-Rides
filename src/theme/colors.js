// Single source of truth for every color used on the map and in the
// sidebar legend. Previously each layer component (DriverRoute,
// RouteCorridor, H3HexGrid, PickupPoints, DriverMarker) hardcoded its
// own hex values, and the Legend duplicated them again to describe
// what each color means — any palette change meant editing 5+ files
// and risking the legend drifting out of sync. Now every layer and
// the legend both import from here.

export const COLORS = {
  route: '#2563eb', // blue — driver's route polyline
  driver: {
    fill: '#f97316', // orange — live driver position
    stroke: '#7c2d12',
  },
  corridor: {
    fill: '#22c55e', // green — 350m corridor buffer
    stroke: '#16a34a',
  },
  h3Grid: {
    fill: '#a78bfa', // violet — H3 hexagon overlay
    stroke: '#7c3aed',
  },
  pickupEligible: {
    fill: '#22c55e', // green — pickup point inside the corridor
    stroke: '#15803d',
  },
  pickupIneligible: {
    fill: '#cbd5e1', // grey — pickup point outside the corridor
    stroke: '#94a3b8',
  },
  zoneBoundary: {
    fill: '#facc15', // amber — service zone polygons
    stroke: '#ca8a04',
  },
}
