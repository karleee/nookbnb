import { connect } from 'react-redux';
import Month from './month';

// Mapping passed values to props
const mapStateToProps = (state, { currentDate, monthNum, currentYr, type, direction, handleClick }) => ({
  currentDate,
  monthNum,
  currentYr,
  type,
  direction,
  handleClick
});

export default connect(mapStateToProps)(Month);