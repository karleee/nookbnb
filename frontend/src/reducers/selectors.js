export const selectSpotsFromCity = (state, city) => (
  Object.values(state.entities.spots).filter(spot => spot.city === city)
);

export const selectAllSpots = (state) => (
  Object.values(state.entities.spots)
);