import axios from "axios";

// Backend route for sending up user address input and receiving lat, lng coords
export const fetchGeocode = addressObject => {
  return axios.post("/api/geocode", addressObject);
};
