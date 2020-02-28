import React from "react";
import LoginForm from '../session/login_form_container';
import SignupSecondFormContainer from "../session/signup_second_form_container";
import SignupFirstFormContainer from "../session/signup_first_form_container";
import SpotModal from '../../components/spots/spot_modal_container';

const Modal = ({ modal, closeModal }) => {
	let component;

	if (!modal) return null;
	let type = modal.formType;

	if (type === 'login') {
		component = <LoginForm closeModal={closeModal} />
	} else if (type === 'signupFirst') { 
		component = <SignupFirstFormContainer />
	} else if (type === 'signupSecond') {
		component = <SignupSecondFormContainer />;
	} else if (type === 'spot') {
	  component = <SpotModal />;
	}

	return (
		<div className={`${type}-modal-wrapper`} onClick={type === 'spot' ? '' : ''}> 
		  {component}
		</div>
	);
}

export default Modal;