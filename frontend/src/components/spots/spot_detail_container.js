import { connect } from 'react-redux';
import SpotDetail from './spot_detail';

const mapStateToProps = (state, ownProps) => ({
  // spot: state.entities.spots[ownProps.match.params.spotId] 
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail);
