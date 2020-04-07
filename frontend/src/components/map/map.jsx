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

        // Auto-centering the map
        this.map.panTo(new google.maps.LatLng(options.center.lat, options.center.lng));
      });
  }

  render() {
    return (
      <div id="map-container"></div>
    );
  }
}

export default withRouter(Map);