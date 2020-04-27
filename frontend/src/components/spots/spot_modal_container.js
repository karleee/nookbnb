import {connect} from 'react-redux';
import {closeModal} from "../../actions/modal_actions";
import SpotModal from './spot_modal';

const mapStateToProps = state => ({
  modal: state.ui.modal,
  spot: state.currentSpot.spot
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()) 
})

export default connect(mapStateToProps, mapDispatchToProps)(SpotModal);