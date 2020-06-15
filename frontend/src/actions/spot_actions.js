import { 
  getSpots,
  getSpot,
  getFilteredSpots
} from '../util/spots_api_util'; 

// Action constants
export const RECEIVE_ALL_SPOTS = 'RECEIVE_ALL_SPOTS';
export const RECEIVE_SPOTS = 'RECEIVE_SPOTS';
export const RECEIVE_SINGLE_SPOT = 'RECEIVE_SINGLE_SPOT';

// Action creators
export const receiveAllSpots = spots => ({
  type: RECEIVE_ALL_SPOTS,
  spots
});

export const receiveSpots = spots => ({
  type: RECEIVE_SPOTS,
  spots
});

export const receiveSingleSpot = payload => ({
  type: RECEIVE_SINGLE_SPOT,
  user: payload.data.user,
  spot: payload.data.spot
});

// Thunk actions
export const fetchSpots = () => dispatch => ( 
  getSpots()
    .then(spots => dispatch(receiveAllSpots(spots)))
    .catch(err => console.log(err)) 
);

export const fetchSpot = id => dispatch => (
  getSpot(id)
    .then(spot => dispatch(receiveSingleSpot(spot)))
    .catch(err => console.log(err))
); 

export const fetchFilteredSpots = bounds => dispatch => {
  return getFilteredSpots(bounds)
    .then(res => dispatch(receiveSpots(res.data)))
    .catch(err => console.log(err))
}; 