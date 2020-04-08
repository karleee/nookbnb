import React from 'react';
import { Link } from 'react-router-dom';

const SearchIndexItem = ({ spot }) => {
  // Get first three amenities of the spot
  const amenities = Object.keys(spot.amenities[0]).slice(0, 3);
  const capitalizedAmenities = amenities.map(amenity => (amenity[0].toUpperCase() + amenity.slice(1, amenity.length)));
  const joinedAmenities = capitalizedAmenities.join(' • ');

  // Get spot details
  const guests = `${spot.occupancy} ${ spot.occupancy > 1 ? 'guests' : 'guest'}`;
  const bedrooms = `${spot.bedrooms} private ${spot.bedrooms > 1 ? 'bedrooms' : 'bedroom'}`;
  const beds = `${spot.beds} ${spot.beds > 1 ? 'beds' : 'bed'}`;
  const baths = `${spot.baths} private ${spot.baths > 1 ? 'baths' : 'bath'}`;
  const details = [guests, bedrooms, beds, baths].join(' • ');

  return (
    <li>
      <Link to={`/spots/${spot._id}`}>
        <div className="search-index-item image-wrapper">
          <img src={spot.thumbnail_image_urls[0]} alt="Main spot photo" />
        </div>

        <div className="search-index-item text-wrapper">
          <div className="search-index-item superhost-wrapper">
            <p>Superhost</p>
            <p>Entire home</p>
          </div>

          <div className="search-index-item spot-text-wrapper">
            <h2>{spot.name}</h2> 

            <div className="details-wrapper">
              <p>{details}</p>
              <p>{joinedAmenities}</p>
              <div className="search-index-item separator-wrapper"></div>
              <p>Includes cancellation flexibility</p>
            </div>
          </div>

          <div className="search-index-item price-wrapper">
            <p><span>${spot.price}</span> / night</p>
          </div>
          
        </div>
      </Link>
    </li>
  );
};
 
export default SearchIndexItem;