export default class MarkerManager {
  constructor(map, maps) {
    this.map = map;
    this.maps = maps;
    this.markers = {};
  }
  
  updateMarkers(spots) {
    const spotsObj = {};
    spots.forEach(spot => spotsObj[spot.id] = spot);

    // Create markers for all the passed in spots that don't yet have markers
    spots
      .filter(spot => !this.markers[spot.id])
      .forEach(newspot => this.createMarkerFromSpot(newspot, this.handleClick))

    // Remove markers for any spots that were not passed in
    Object.keys(this.markers)
      // filter out markers for spots that were passed in 
      .filter(spotId => !spotsObj[spotId])
      // Remove markers for remaining spots (those that were not passed in)
      .forEach(spotId => this.removeMarker(this.markers[spotId]))
  }

  createMarkerFromSpot(spot) {
    const position = new this.maps.LatLng(spot.lat, spot.lng);
    const marker = new this.maps.Marker({
      position,
      map: this.map,
      spotId: spot.id
    });

    marker.addListener('click', () => this.handleClick(spot));
    this.markers[marker.spotId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.spotId].setMap(null);
    delete this.markers[marker.spotId];
  }
}