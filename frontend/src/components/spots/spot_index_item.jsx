import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SpotDetail from './spot_detail_container';

const SpotIndexItem = ({ spot }) => (
  <Link to={`/spots/${spot._id}`}>
    <li>
      <p>Put image here</p>
      <p>{spot.name}</p>
    </li>
  </Link>
); 

export default withRouter(SpotIndexItem);