import { connect } from 'react-redux';
import SleepingArrangementIndexItem from './sleeping_arrangement_index_item';

// Mapping number of bed to props
const mapStateToProps = (state, { num }) => ({
  num
});

export default connect(mapStateToProps)(SleepingArrangementIndex);