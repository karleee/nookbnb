import { 
  getSpots,
  getFilteredSpots 
} from '../util/spots_api_util';

export const RECEIVE_ALL_SPOTS = 'RECEIVE_ALL_SPOTS';
export const RECEIVE_SPOTS = 'RECEIVE_SPOTS';

export const receiveAllSpots = spots => ({
  type: RECEIVE_ALL_SPOTS,
  spots
});

export const receiveSpots = spots => ({
  type: RECEIVE_SPOTS,
  spots
});

export const fetchSpots = () => dispatch => ( 
  getSpots()
    .then(spots => dispatch(receiveAllSpots(spots)))
    .catch(err => console.log(err))
);

export const fetchFilteredSpots = bounds => dispatch => {
  return getFilteredSpots(bounds)
    .then(spots => dispatch(receiveSpots(spots)))
    .catch(err => console.log(err))
};
