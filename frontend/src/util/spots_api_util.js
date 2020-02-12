import axios from 'axios';

export const getSpots = () => {
  return axios.get('/api/spots');
};