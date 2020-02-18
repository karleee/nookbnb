import { 
  UPDATE_BOUNDS, 
  UPDATE_MAP_CENTER,
  UPDATE_FILTER
 } from "../actions/filter_actions";

const defaultFilters = {
  bounds: {},
  minGuests: 1, 
  dates: {
    startDate: "",
    endDate: ""
  },
  amenities: {
    beds: 0,
    bathrooms: 0,
    bedrooms: 0
  },
  center: {
    lat: 37.773972,
    lng: -122.431297
  } // San Fran coords
};

export default function (state = defaultFilters, action) {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_FILTER:
      return Object.assign({}, state, { [action.filter]: action.value });
    case UPDATE_BOUNDS:
      return Object.assign({}, state, { bounds: action.bounds });
    case UPDATE_MAP_CENTER:
      return Object.assign({}, state, { center: action.location });
    default:
      return state;
  }
}