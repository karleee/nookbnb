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
// const spots = [{ id: 1, lat: 37.773972, lng: -122.431297 }]
// testing end

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '' }
    this.apiIsLoaded = this.apiIsLoaded.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.MarkerManager) {
			this.MarkerManager.updateMarkers(this.props.spots);
    }
    if (this.props.center !== prevProps.center) {
      this.map.setCenter(this.props.center);
    }
  }
  
  // This callback is invoked when the google maps api becomes available to use
  // It is used similarly to componentDidMount
  apiIsLoaded(map, maps) {
    this.map = map;
    this.maps = maps;
    this.MarkerManager = new MarkerManager(map, maps);
    this.MarkerManager.updateMarkers(this.props.spots);
    this.registerMapListeners();
  }

  registerMapListeners() {
    this.map.addListener('idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat: north, lng: east },
        southWest: { lat: south, lng: west }
      };
      this.props.requestUpdateBounds(bounds);
      const center = this.map.getCenter();
      const lat = center.lat();
      const lng = center.lng();
    });
  }

  componentWillUpdate() {
    this.MarkerManager.updateMarkers(this.props.spots);
  }

  handleChange(e) {
    this.setState({ address: e.currentTarget.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.geocode(this.state);
  }

  render() {
    const defaultCenter = this.props.center;
    return (
      <div id='map-container'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultZoom={mapOptions.zoom}
          defaultCenter={defaultCenter}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => (
            this.apiIsLoaded(map, maps)
          )}
        />
      </div>
    )
  }
}