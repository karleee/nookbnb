import { RECEIVE_SINGLE_SPOT } from '../actions/spot_actions';

// Initial state
const _initialState = {
  user: { email: '' },
  spot: ''
};

// Current spot reducer (current spot that the user is viewing)
export default function (state = _initialState, action) {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_SINGLE_SPOT:
      let nextState = Object.assign({}, state, { spot: action.spot });
      let finalState = Object.assign({}, nextState, { user: action.user });
      return finalState;
    default:
      return state; 
  }
}