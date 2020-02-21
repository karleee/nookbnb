import React from "react";
import LoginFormContainer from "../session/login_form_container";
import SignupSecondFormContainer from "../session/signup_second_form_container";
import SignupFirstFormContainer from "../session/signup_first_form_container";
import SpotModal from '../../components/spots/spot_modal_container';
// import '../../assets/stylesheets/modal.css';
// import GuestsFilter from "../filter/guests_filter";
// import MoreFilters from "../filter/more_filters";
// import DatesFilter from "../filter/dates_filter";

// import "./modal.css"

const Modal = ({ modal, closeModal }) => {
	let component;

	if (!modal) return null;
	let type = modal.formType;

	if (type === 'login') {
		component = <LoginFormContainer />
	} else if (type === 'signupFirst') { 
		component = <SignupFirstFormContainer />
	} else if (type === 'signupSecond') {
		component = <SignupSecondFormContainer />;
	} else if (type === 'spot') {
	  component = <SpotModal />;
	}

	return (
		<div className={`${type}-modal-wrapper`} onClick={type === 'spot' ? '' : closeModal}> 
		  {component}
		</div>
	);
}

export default Modal;