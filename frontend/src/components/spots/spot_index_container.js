import { connect } from 'react-redux';
import { fetchSpots } from '../../actions/spot_actions';
import SpotIndex from './spot_index';

// Mapping values of all current spots in the state to props
const mapStateToProps = state => ({
  spots: Object.values(state.entities.spots)
});

// Mapping thunk action to props
const mapDispatchToProps = dispatch => ({
  fetchSpots: () => dispatch(fetchSpots())
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotIndex);
