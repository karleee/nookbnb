import { getSpots } from '../util/spots_api_util';

export const RECEIVE_ALL_SPOTS = 'RECEIVE_ALL_SPOTS';

export const receiveAllSpots = spots => ({
  type: RECEIVE_ALL_SPOTS,
  spots
});

export const fetchSpots = () => dispatch => ( 
  getSpots()
    .then(spots => dispatch(receiveAllSpots(spots)))
    .catch(err => console.log(err))
);