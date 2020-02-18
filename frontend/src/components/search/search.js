import React from 'react';
import Map from './map';

export default function Search({ spots, requestUpdateBounds, geocode, center }) {
  return (
    <div>
      <Map 
        requestUpdateBounds={requestUpdateBounds}
        geocode={geocode}
        center={center}>
        </Map>
    </div>
  )
}
