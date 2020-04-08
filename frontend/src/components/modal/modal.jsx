import React from 'react';

import LoginForm from '../session/login_form_container';
import SignupForm from '../session/signup_form_container';
import SpotModal from '../../components/spots/spot_modal_container';
import DatesFilter from '../../components/filter/dates_filter';
import GuestsFilter from '../../components/filter/guests_filter';
import AmenitiesFilter from '../../components/filter/amenities_filter';

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
	} else if (type === 'dates') {
		component = <DatesFilter />; 
	} else if (type === 'guests') {
		component = <GuestsFilter />;
	} else if (type === 'amenities') {
		component = <AmenitiesFilter />;
	}

	return (
		<div className={`${type}-modal-wrapper`}> 
		  {component}
		</div>
	);
}

export default Modal;