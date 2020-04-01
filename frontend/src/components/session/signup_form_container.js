import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SignupForm from './signup_form';

// Mapping state to props
const mapStateToProps = state => ({
	modal: state.ui.modal,
	signedIn: state.session.isSignedIn,
	errors: state.errors.session
});

// Mapping dispatched functions to props
const mapDispatchToProps = dispatch => ({
	demoLogin: user => dispatch(login(user)),
	signup: user => dispatch(signup(user)),
	openModal: formType => dispatch(openModal(formType)),
	closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
