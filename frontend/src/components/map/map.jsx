import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as MapUtil from '../../util/map_util';

// this is an example spots array for testing marker manager
// const spots = [{ id: 1, lat: 37.773972, lng: -122.431297 }]
// testing end

class Map extends Component {
  constructor(props) {
    super(props);
  }

  // Initially mounts the map with first search input
  componentDidMount() {
    // Solves problem of linting rule in ReactJS that forbids unknown global vars
    const google = window.google;
    const map = document.getElementById('map-container');

    // Creating the map
    MapUtil.setOptionsFromLocation(this.props.find_loc)
      .then(options => {
        this.map = new google.maps.Map(map, options); 

        // Auto-centering the map
        this.map.panTo(new google.maps.LatLng(options.center.lat, options.center.lng));
      });
  }

  componentWillReceiveProps(newProps) {
    // Solves problem of linting rule in ReactJS that forbids unknown global vars
    const google = window.google;
    const map = document.getElementById('map-container');

    console.log(newProps);

    // Creating the map
    MapUtil.setOptionsFromLocation(newProps.find_loc)
      .then(options => {
        console.log(options);
        this.map = new google.maps.Map(map, options);

        // Auto-centering the map
        this.map.panTo(new google.maps.LatLng(options.center.lat, options.center.lng));
      });
  }


  // componentDidUpdate(prevProps, prevState) {
  //   if (this.MarkerManager) {
	// 		this.MarkerManager.updateMarkers(this.props.spots);
  //   }
  //   if (this.props.center !== prevProps.center) {
  //     this.map.setCenter(this.props.center);
  //   }
  // }
  
  // This callback is invoked when the google maps api becomes available to use
  // It is used similarly to componentDidMount
  // apiIsLoaded(map, maps) {
  //   this.map = map;
  //   this.maps = maps;
  //   this.MarkerManager = new MarkerManager(map, maps);
  //   this.MarkerManager.updateMarkers(this.props.spots);
  //   this.registerMapListeners();
  // }

  // registerMapListeners() {
  //   this.map.addListener('idle', () => {
  //     const { north, south, east, west } = this.map.getBounds().toJSON();
  //     const bounds = {
  //       northEast: { lat: north, lng: east },
  //       southWest: { lat: south, lng: west }
  //     };
  //     this.props.requestUpdateBounds(bounds);
  //     const center = this.map.getCenter();
  //     const lat = center.lat();
  //     const lng = center.lng();
  //   });
  // }

  // componentWillUpdate() {
  //   this.MarkerManager.updateMarkers(this.props.spots);
  // }

  // // Handles a new search input
  // handleUpdate(e) {
  //   this.setState({ address: e.currentTarget.value })
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.geocode(this.state);
  // }

  render() {
    return (
      <div id="map-container"></div>
    );
  }
}

export default withRouter(Map);