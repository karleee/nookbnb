import axios from 'axios';

// Backend route for retrieving all spots
export const getSpots = () => {
  return axios.get('/api/spots');
};

// Right now data is the bounds object, but in the future it 
// could be something else when filtering by dates of availability
export const getFilteredSpots = data => {
  return axios.get('/api/spots/search', {
    params: data
  });
};

// Backend route for retrieving a specific spot
export const getSpot = spotId => {
  return axios.get(`/api/spots/${spotId}`);
};
