export const selectSpotsFromCity = (state, city) => (
  Object.values(state.entities.spots).filter(spot => spot.city === city)
);

export const selectAllSpots = (state) => (
  Object.values(state.entities.spots)
);

export const selectSpotsInBounds = (state) => {
  const bounds = state.ui.filters.bounds;
  if (Object.keys(bounds).length > 0) {
    return Object.values(state.entities.spots).filter(spot => (
      spot.latitude < bounds.northEast.lat &&
      spot.latitude > bounds.southWest.lat &&
      spot.longitude < bounds.northEast.lng &&
      spot.longitude > bounds.southWest.lng
  ))
  } else {
    return [];
  }
};