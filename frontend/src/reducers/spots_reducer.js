import { 
  RECEIVE_ALL_SPOTS,
  RECEIVE_SPOTS 
} from '../actions/spot_actions';

// Spots reducer
export default function(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_SPOTS: 
      return Object.assign({}, state, action.spots.data);
    case RECEIVE_SPOTS:
      return Object.assign({}, state, action.spots);     
    default:
      return state;
  }
};