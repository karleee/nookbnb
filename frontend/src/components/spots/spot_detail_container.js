import { connect } from 'react-redux';
import { fetchSpot } from '../../actions/spot_actions';
import SpotDetail from './spot_detail';

// Mapping value of spotId from URL to props
const mapStateToProps = (state, ownProps) => ({
  spotId: ownProps.match.params.spotId,
  currentSpot: state.session.currentSpot
});

// Mapping thunk action to props
const mapDispatchToProps = dispatch => ({
  fetchSpot: id => dispatch(fetchSpot(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail);