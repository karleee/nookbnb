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
  componentDidMount() {
    // this.MarkerManager = new MarkerManager(this.map);
    // this.MarkerManager.updateMarkers();
  }

  componentDidUpdate() {
    this.MarkerManager.updateMarkers(spots);
  }

  apiIsLoaded(map, maps) {
    this.MarkerManager = new MarkerManager(map, maps);
    this.MarkerManager.updateMarkers(spots);
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
