import React from 'react';

import Map from '../map/map';

const ResultMap = ({ find_loc }) => (
  <div className="search-result-map-container">
    <Map find_loc={find_loc} />
  </div>
);

export default ResultMap;