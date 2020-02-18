import React from 'react';
import Map from './map';
import FiltersBar from '../filter/filters_bar';

export default function Search({ spots, requestUpdateBounds, geocode, center }) {
  return (
    <div>
      <FiltersBar />
      <br/>
      <br/>
      <Map 
        requestUpdateBounds={requestUpdateBounds}
        geocode={geocode}
        center={center}>
        </Map>
    </div>
  )
}
