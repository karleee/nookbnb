import React from 'react';
import Map from './map';

export default function Search({ spots, requestUpdateBounds, geocode }) {
  return (
    <div>
      <Map 
        requestUpdateBounds={requestUpdateBounds}
        geocode={geocode}>
        </Map>
    </div>
  )
}
