import { connect } from 'react-redux';
import Month from './month';

// Mapping passed values to props
const mapStateToProps = (state, { currentMonth, type, handleClick }) => ({
  currentMonth,
  type,
  handleClick
});

export default connect(mapStateToProps)(Month);