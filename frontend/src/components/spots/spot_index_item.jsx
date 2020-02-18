import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import "../../assets/stylesheets/spot_index.css";

const SpotIndexItem = ({ spot }) => (
  <Link to={`/spots/${spot._id}`}>
    <li>
      <div className="image-wrapper"><img src={spot.main_image_url} alt="Spot thumbnail" /></div>
        <div className="superhost-wrapper">
          <p>Superhost</p>
          <p>{spot.country}</p>
        </div>

        <h4>{spot.name.length > 26 ? spot.name.substr(0, 20) + '...' : spot.name}</h4> 
        <p><span className="price-wrapper">${spot.price}</span> / night</p>
    </li>
  </Link>
); 

export default withRouter(SpotIndexItem);