import { connect } from 'react-redux';
import SpotDetail from './spot_detail';

// Mapping values of spotId to props
const mapStateToProps = (state, ownProps) => ({
  spotId: ownProps.match.params.spotId,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail);
