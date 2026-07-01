// Five representative Macro Rides service zones covering Bangalore.
// Each zone is a GeoJSON Polygon drawn as a closed ring of [lng, lat]
// coordinates per the GeoJSON spec.
//
// Zones are sized to be clearly visible at zoom 12-13 without obscuring
// the driver route that runs through the Central and East zones.
// In production these would be fetched from a zone management API.

export const zoneBoundariesGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Central', zoneId: 'BLR-C' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.5700, 12.9600],
          [77.6200, 12.9600],
          [77.6200, 12.9900],
          [77.5700, 12.9900],
          [77.5700, 12.9600], // closed
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'East', zoneId: 'BLR-E' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.6200, 12.9500],
          [77.6900, 12.9500],
          [77.6900, 12.9900],
          [77.6200, 12.9900],
          [77.6200, 12.9500],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'West', zoneId: 'BLR-W' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.4900, 12.9500],
          [77.5700, 12.9500],
          [77.5700, 12.9900],
          [77.4900, 12.9900],
          [77.4900, 12.9500],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'North', zoneId: 'BLR-N' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.5400, 12.9900],
          [77.6500, 12.9900],
          [77.6500, 13.0500],
          [77.5400, 13.0500],
          [77.5400, 12.9900],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'South', zoneId: 'BLR-S' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.5400, 12.8800],
          [77.6500, 12.8800],
          [77.6500, 12.9500],
          [77.5400, 12.9500],
          [77.5400, 12.8800],
        ]],
      },
    },
  ],
}
