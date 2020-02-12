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

export default class Map extends Component {
  componentDidMount() {
    this.MarkerManager = new MarkerManager(this.map);
    this.MarkerManager.updateMarkers();
  }

  componentDidUpdate() {
    this.MarkerManager.updateMarkers();
  }
  render() {
    debugger;
    return (
      <div id='map-container'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultZoom={mapOptions.zoom}
          defaultCenter={mapOptions.center}
        />
      </div>
    )
  }
}
