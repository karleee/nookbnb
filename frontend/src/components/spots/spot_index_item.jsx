import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => (
  <Link to={`/spots/${spot._id}`}>
    <li>
      <div className="image-wrapper"></div>
      <p>{spot.country}</p>
      <h4>{spot.name.length > 26 ? spot.name.substr(0, 26) + '...' : spot.name}</h4> 
    </li>
  </Link>
); 

export default withRouter(SpotIndexItem);