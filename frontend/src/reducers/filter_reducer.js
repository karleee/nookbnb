import { 
  UPDATE_BOUNDS, 
  UPDATE_MAP_CENTER
 } from "../actions/filter_actions";

const defaultFilters = {
  bounds: {},
  center: {
    lat: 37.773972,
    lng: -122.431297
  } // San Fran coords
};

export default function (state = defaultFilters, action) {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_BOUNDS:
      return Object.assign({}, state, { bounds: action.bounds });
    case UPDATE_MAP_CENTER:
      return Object.assign({}, state, { center: action.location });
    default:
      return state;
  }
}