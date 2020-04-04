import { connect } from 'react-redux';
import SpotWorldIndex from './spot_world_index';
import { selectSpotsFromCity } from '../../reducers/selectors';

// Maps given spots (from SpotIndex) to props
const mapStateToProps = (state, { spots }) => ({
  spots
}); 

export default connect(mapStateToProps, null)(SpotWorldIndex);
