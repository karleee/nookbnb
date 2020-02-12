import axios from 'axios';

// Backend route for retrieving all spots
export const getSpots = () => {
  return axios.get('/api/spots');
};

// Backend route for retrieving a specific spot
export const getSpot = id => {
  return axios.get('/api/spots/:spotId');
};