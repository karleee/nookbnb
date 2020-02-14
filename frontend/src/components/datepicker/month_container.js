import { connect } from 'react-redux';
import Month from './month';

// Mapping passed values to props
const mapStateToProps = (state, { currentMonth, nextMonth, currentYr, type, handleClick }) => ({
  currentMonth,
  nextMonth,
  currentYr,
  type,
  handleClick
});

export default connect(mapStateToProps)(Month);