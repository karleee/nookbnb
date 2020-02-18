import { fetchFilteredSpots } from "./spot_actions";
import { fetchGeocode } from '../util/map_api_util';

export const UPDATE_BOUNDS = "UPDATE_BOUNDS";
export const UPDATE_MAP_CENTER = "UPDATE_MAP_CENTER";
export const UPDATE_FILTER = "UPDATE_FILTER";

export const updateBounds = bounds => ({
  type: UPDATE_BOUNDS,
  bounds
});

export const updateMapCenter = location => ({
  type: UPDATE_MAP_CENTER,
  location
});

export const changeFilter = (filter, value) => ({
	type: UPDATE_FILTER,
	filter,
	value
});

export const requestUpdateBounds = bounds => (dispatch, getState) => {
  // Updates state
  debugger;
  dispatch(updateBounds(bounds));
  // Fetch the correct spots from the backend 
  // Based on the bounds object that is now in state
  return fetchFilteredSpots(getState().ui.filters.bounds)(dispatch);
};

export const geocode = addressObject => dispatch => {
  // Send address to the backend to be geocoded into location (lat, lng)
  return fetchGeocode(addressObject)
    .then(response => {
      return dispatch(updateMapCenter(response.data));
    })
    .catch(err => console.log(err));
};

export const updateFilter = (filter, value) => {
	return (dispatch, getState) => {
		dispatch(changeFilter(filter, value));
		// return fetchFilteredSpots(getState().ui.filters)(dispatch);
	};
};