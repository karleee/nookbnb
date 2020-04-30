import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import '../../assets/stylesheets/spots/spot_index.css';

const SpotIndexItem = ({ spot }) => (
  <li>
    <Link to={`/spots/${spot._id}`}>
      <div className="top-rated image-wrapper">
        <img src={spot.thumbnail_image_urls ? spot.thumbnail_image_urls[0] : ''} alt="Spot thumbnail" />
      </div>

      <div className="top-rated-text-wrapper">
        <div className="superhost-wrapper">
          <p>Superhost</p>
          <p>{spot.country}</p>
        </div>

        <h4>{spot.name.length > 26 ? spot.name.substr(0, 25) + '...' : spot.name}</h4> 
        <p><span className="price-wrapper">${spot.price}</span> / night</p>
      </div>
    </Link>
  </li>
);  

export default withRouter(SpotIndexItem);