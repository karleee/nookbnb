import React from 'react';
import Map from './map';
import FiltersBar from '../filter/filters_bar';

export default function Search({ spots, requestUpdateBounds, geocode, center }) {
  return (
    <div>
      <FiltersBar />
      <br/>
      <br/>
      <div className="map-container">
        <Map 
          requestUpdateBounds={requestUpdateBounds}
          geocode={geocode}
          center={center}
          spots={spots}>
        </Map>
      </div>
    </div>
  )
}
