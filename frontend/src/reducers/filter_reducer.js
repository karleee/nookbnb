import { UPDATE_BOUNDS } from "../actions/filter_actions";

const defaultFilters = {
  bounds: {}
}

export default function (state = defaultFilters, action) {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_BOUNDS:
      return Object.assign({}, state, { bounds: action.bounds })
    default:
      return state;
  }
}