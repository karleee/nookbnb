import React, { Component } from 'react';
import './search.css';
import GoogleMapReact from 'google-map-react';
import MarkerManager from '../../util/marker_manager';

const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 13
}; 

// this is an example spots array for testing marker manager
const spots = [{ id: 1, lat: 37.773972, lng: -122.431297 }]
// testing end

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.apiIsLoaded = this.apiIsLoaded.bind(this);
  }

  componentDidUpdate() {
    if (this.MarkerManager) {
      this.MarkerManager.updateMarkers(spots);
    }
  }

  // This callback is invoked when the google maps api becomes available to use
  // It is used similarly to componentDidMount
  apiIsLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
    this.MarkerManager = new MarkerManager(map, maps);
    this.MarkerManager.updateMarkers(spots);
    this.registerMapListeners();
  }

  registerMapListeners() {
    this.map.addListener('idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      // eventually we will invoke this.props.updateFilter('bounds', bounds);
      // and dispatch an action here to fetch the appropriate spots
      // and update the ui state to reflect the bounds
    }, { passive: true });
  }

  render() {
    return (
      <div id='map-container'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultZoom={mapOptions.zoom}
          defaultCenter={mapOptions.center}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => (
            this.apiIsLoaded(map, maps)
          )}
        />
      </div>
    )
  }
}
