import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import LoginForm from './login_form';

// Mapping state to props
const mapStateToProps = state => ({
	modal: state.ui.modal,
	errors: state.errors.session
});

// Mapping dispatched functions to props
const mapDispatchToProps = dispatch => ({
	login: user => dispatch(login(user)),
	demoLogin: user => dispatch(login(user)),
	openModal: formType => dispatch(openModal(formType)),
	closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);