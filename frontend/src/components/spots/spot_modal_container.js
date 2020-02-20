import { connect } from 'react-redux';
import { openModal, closeModal } from "../../actions/modal_actions";
import SpotModal from './spot_modal';

const mapStateToProps = state => ({
  formType: 'spotModal'
})

const mapDispatchToProps = dispatch => ({
  openModal: formType => dispatch(openModal(formType)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(SpotModal);