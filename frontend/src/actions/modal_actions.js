// ED: created new modal actions file

export const OPEN_MODAL = 'OPEN_MODAL';
export const OPEN_SPOT_MODAL = 'OPEN_SPOT_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (formType) => {
	return {
		type: OPEN_MODAL,
		formType,
	};
};

export const openSpotModal = (formType, imageNum) => ({
	type: OPEN_SPOT_MODAL,
	formType,
	imageNum
});

export const closeModal = () => {
	return {
		type: CLOSE_MODAL
	};
};
