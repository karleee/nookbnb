import { connect } from "react-redux";

import { requestUpdateBounds, geocode, updateFilter } from "../../actions/filter_actions";
import { fetchFilteredSpots } from "../../actions/spot_actions";
import { selectSpotsInBounds } from '../../reducers/selectors';
import Search from "./search";

const mapStateToProps = state => ({
  // spots: selectSpotsInBounds(state),
  spots: Object.values(state.entities.spots),
  center: state.ui.filters.center
});

const mapDispatchToProps = dispatch => ({
  requestUpdateBounds: bounds => dispatch(requestUpdateBounds(bounds)),
  geocode: addressObject => dispatch(geocode(addressObject)),
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
  fetch,
  fetchFilteredSpots: (filters) => dispatch(fetchFilteredSpots(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
