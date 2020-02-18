import { connect } from 'react-redux';
import SleepingArrangementIndex from './sleeping_arrangement_index';

// Mapping total number of beds to props
const mapStateToProps = (state, { bedrooms }) => ({
  bedrooms
});

export default connect(mapStateToProps)(SleepingArrangementIndex);