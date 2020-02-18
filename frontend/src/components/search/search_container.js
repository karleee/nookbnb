import { connect } from "react-redux";

import { requestUpdateBounds } from "../../actions/filter_actions";
import { selectSpotsInBounds } from '../../reducers/selectors';
import { geocode } from '../../actions/filter_actions';
import Search from "./search";

const mapStateToProps = state => ({
  spots: selectSpotsInBounds(state),
  center: state.ui.filters.center
});

const mapDispatchToProps = dispatch => ({
  requestUpdateBounds: bounds => dispatch(requestUpdateBounds(bounds)),
  geocode: addressObject => dispatch(geocode(addressObject))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
