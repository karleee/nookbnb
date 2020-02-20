import React from "react";
import LoginFormContainer from "../session/login_form_container";
import SignupSecondFormContainer from "../session/signup_second_form_container";
import SignupFirstFormContainer from "../session/signup_first_form_container";
import SpotModal from '../../components/spots/spot_modal_container';
import '../../assets/stylesheets/modal.css';
// import GuestsFilter from "../filter/guests_filter";
// import MoreFilters from "../filter/more_filters";
// import DatesFilter from "../filter/dates_filter";

// import "./modal.css"

const Modal = ({ modal, closeModal }) => {
	let component;
	let type;

	if (!modal) return null;
	let { formType } = modal;

	if (formType === "login") {
		component = <LoginFormContainer />
	} else if (formType === "signupFirst") {
		component = <SignupFirstFormContainer />
	} else if (formType === "signupSecond") {
		component = <SignupSecondFormContainer />;
	} else if (formType === 'spotModal') {
	  component = <SpotModal />;
	}

	console.log(formType);

	return (
		<div className="modal-background" onClick={closeModal}>
			<div className="modal-child" onClick={e => e.stopPropagation()}>
				{component}
			</div>
		</div>
	);
}

export default Modal;

// const mapStateToProps = state => {
// 	return {
// 		modal: state.ui.modal
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		closeModal: () => dispatch(closeModal())
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Modal);