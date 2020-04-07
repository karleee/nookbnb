import axios from 'axios';
const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

// Prefer JSON format for the output
const MAPS_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

// Passes required parameters for Geocoding request and returns result
// See Google Maps Dev Geolocation site for sample response format
const _getCoordsFromAddress = address => (
  axios.get(`${MAPS_BASE_URL}?address=${address}&key=${MAPS_API_KEY}`)
    .then(results => results)
);

// Set default Map values on initialization
export const setOptionsFromLocation = async find_loc => {
  let res = await _getCoordsFromAddress(find_loc);

  // Default to San Francisco
  if (!res.data.results.length) {
    return {
      center: {
        lat: 37.773972,
        lng: -122.431297
      }, 
      zoom: 13
    };
  } else {
    // Get latitude and longitude from geometry field returned by response
    let { geometry } = res.data.results[0];
    return {
      center: {
        lat: geometry.location.lat,
        lng: geometry.location.lng
      },
      zoom: 6
    };
  }
}

// Get city from a zip code
export const getCityFromZip = async zipCode => {
  let city, state;

  // get results from api call
  let res = await _getCoordsFromAddress(zipCode);

  if (res.data.results.length) {
    // Get city from address_components field returned by response
    let { address_components } = res.data.results[0];

    address_components.forEach(component => {
      // Determine city or state based on type field returned in response
      component.types.forEach(type => {
        if (type === 'locality') {
          city = component.long_name;
        }
        if (type === 'administrative_area_level_1') {
          state = component.short_name;
        }
      })
    })

    if (city && state) return `${city}, ${state}`;
  } else {
    return zipCode;
  }
};