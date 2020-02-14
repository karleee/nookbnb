import { connect } from 'react-redux';
import Month from './month';

// Mapping passed values to props
const mapStateToProps = (state, { monthNum, type, handleClick }) => ({
  monthNum,
  type,
  handleClick
});

export default connect(mapStateToProps)(Month);