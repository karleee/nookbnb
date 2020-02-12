import { connect } from "react-redux";

// import { updateFilter } from "../../actions/filter_actions";
import { selectAllSpots } from '../../reducers/selectors';
import Search from "./search";

const mapStateToProps = state => ({
  spots: selectAllSpots(state)
});

const mapDispatchToProps = dispatch => ({
  // updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
