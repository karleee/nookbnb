import React from 'react';
import Map from './map';

export default function Search({ spots, requestUpdateBounds }) {
  return (
    <div>
      <Map requestUpdateBounds={requestUpdateBounds}></Map>
    </div>
  )
}
