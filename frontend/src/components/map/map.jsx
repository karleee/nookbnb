import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as MapUtil from '../../util/map_util';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  // Initially mounts the map with first search input
  componentDidMount() {
    this.drawMap(this.props.find_loc);
  } 

  // Draws a map with updated search input
  componentWillReceiveProps(newProps) {
    this.drawMap(newProps.find_loc);
  }


  drawMap(address) {
    // Solves problem of linting rule in ReactJS that forbids unknown global vars
    const google = window.google;
    const map = document.getElementById('map-container');

    // Creating the map
    MapUtil.setOptionsFromLocation(address)
      .then(options => {
        this.map = new google.maps.Map(map, options);
        
        // before adding markers, set up bounds
        let bounds = new google.maps.LatLngBounds();

        // Displaying nearby spots
        this.props.spots.forEach(spot => {
          // Create a position from spot coordinates
          const latitude = spot.latitude;
          const longitude = spot.longitude;
          const position = new google.maps.LatLng(latitude, longitude);

          // Place markers on the map
          const marker = new google.maps.Marker({
            position,
            map: this.map
          });

          // extend the bounds to fit this position
          bounds.extend(position);
        });

        // Autozooming and autocentering if there are results
        if (this.props.spots.length) {
          // Autozooming
          this.map.fitBounds(bounds);

          // Adjust zooming value if too large
          let theMap = this.map;
          var listener = google.maps.event.addListener(theMap, "idle", function () {
            if (theMap.getZoom() > 16) theMap.setZoom(16);
            google.maps.event.removeListener(listener);
          });

          // Autocentering
          this.map.panToBounds(bounds);
        }
      });
  }

  // Renders Map component
  render() {
    return <div id="map-container"></div>;
  }
}

export default withRouter(Map);