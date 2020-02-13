import { connect } from "react-redux";

import { requestUpdateBounds } from "../../actions/filter_actions";
import { selectAllSpots } from '../../reducers/selectors';
import Search from "./search";

const mapStateToProps = state => ({
  spots: selectAllSpots(state)
});

const mapDispatchToProps = dispatch => ({
  requestUpdateBounds: bounds => dispatch(requestUpdateBounds(bounds))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
