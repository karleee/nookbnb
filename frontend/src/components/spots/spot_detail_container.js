import { connect } from 'react-redux';
import SpotDetail from './spot_detail';

const mapStateToProps = (state, ownProps) => ({
  spotId: ownProps.match.params.spotId,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail);
