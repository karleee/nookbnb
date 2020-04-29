import React from 'react';

import LoginForm from '../session/login_form_container';
import SignupForm from '../session/signup_form_container';
import SpotModal from '../../components/spots/spot_modal_container';

const Modal = ({ modal }) => {
	let component;

	if (!modal) return null;
	let type = modal.formType;

	if (type === 'login') {
		component = <LoginForm />
	} else if (type === 'signup') { 
		component = <SignupForm />
	} else if (type === 'spot') {
	  component = <SpotModal />;
	}

	return (
		<div className={`${type} modal-container`}> 
		  {component}
		</div>
	);
}

export default Modal;