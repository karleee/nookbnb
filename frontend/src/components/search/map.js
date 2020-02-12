import React, { Component } from 'react';
import './search.css';
import GoogleMapReact from 'google-map-react';

const mapOptions = {
  center: {
    lat: 37.773972,
    lng: -122.431297
  }, // San Francisco coords
  zoom: 13
}; 

export default class Map extends Component {
  componentDidMount() {
  
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
