import { connect } from 'react-redux';
import { fetchSpots } from '../../actions/spot_actions';

import Search from './search';

const mapStateToProps = (state, ownProps) => ({
  spots: Object.values(state.entities.spots),
  find_loc: ownProps.match.params.find_loc
});

const mapDispatchToProps = dispatch => ({
  fetchSpots: () => dispatch(fetchSpots())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search); 
