import { fetchFilteredSpots } from "./spot_actions";

export const UPDATE_BOUNDS = "UPDATE_BOUNDS";

export const updateBounds = bounds => ({
  type: UPDATE_BOUNDS,
  bounds
});

export const requestUpdateBounds = bounds => (dispatch, getState) => {
  // Updates state
  dispatch(updateBounds(bounds));
  // Fetch the correct spots from the backend 
  // Based on the bounds object that is now in state
  return fetchFilteredSpots(getState().ui.filters)(dispatch);
};
