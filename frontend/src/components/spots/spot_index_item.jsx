import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => (
  <Link to={`/spots/${spot._id}`}>
    <li>
      <div className="image-wrapper"></div>
        <div className="superhost-wrapper">
          <p>Superhost</p>
          <p>{spot.country}</p>
        </div>

        <h4>{spot.name.length > 26 ? spot.name.substr(0, 26) + '...' : spot.name}</h4> 
        <p><span className="price-wrapper">${spot.price}</span> / night</p>
    </li>
  </Link>
); 

export default withRouter(SpotIndexItem);