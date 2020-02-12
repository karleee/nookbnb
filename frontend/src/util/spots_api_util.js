import axios from 'axios';

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
