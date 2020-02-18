import { connect } from 'react-redux';
import Month from './month';

// Mapping passed values to props
const mapStateToProps = (state, { currentMonth, nextMonth, currentYr, type, handleDateClick }) => ({
  currentMonth,
  nextMonth,
  currentYr,
  type,
  handleDateClick
});

export default connect(mapStateToProps)(Month);