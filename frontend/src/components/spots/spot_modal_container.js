import { connect } from 'react-redux';
import { openModal, closeModal } from "../../actions/modal_actions";
import { fetchSpot } from '../../actions/spot_actions';
import SpotModal from './spot_modal';

const mapStateToProps = state => ({
  modal: state.ui.modal,
  spot: state.currentSpot.spot
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(SpotModal);