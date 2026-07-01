// Sample driver route through central Bangalore, expressed as standard
// GeoJSON (Feature<LineString>). Coordinates are [lng, lat] per the GeoJSON
// spec. Swapping this out for a live route (e.g. from a driver-tracking
// websocket) just means replacing this object's `coordinates` array.

export const driverRouteGeoJSON = {
  type: 'Feature',
  properties: {
    name: 'Sample Driver Route',
  },
  geometry: {
    type: 'LineString',
    coordinates: [
      [77.5946, 12.9716], // MG Road
      [77.5993, 12.9758], // towards Trinity Circle
      [77.6033, 12.9783], // Ulsoor
      [77.6101, 12.9819], // Indiranagar 100ft Rd
      [77.6412, 12.9783], // towards Marathahalli direction
      [77.6473, 12.9698], // HAL / Old Airport Rd
    ],
  },
}
