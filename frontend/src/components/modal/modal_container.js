import { connect } from 'react-redux';
import Modal from './modal';

const mapStateToProps = state => ({
  modal: state.ui.modal
});

export default connect(mapStateToProps, null)(Modal);