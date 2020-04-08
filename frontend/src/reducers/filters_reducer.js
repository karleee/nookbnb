import { UPDATE_FILTER } from "../actions/filter_actions";
// import { fetchFilteredSpots } from "../actions/spot_actions";
import { merge } from "lodash";

const defaultState = {
	startDate: "",
	endDate: "",
	guests: "",
	bedrooms: "",
	beds: "",
	baths: "",
	wifi: "",
	breakfast: "",
	parking: "",
	essentials: "",
};

const filtersReducer = (oldState = defaultState, action) =>{
	switch (action.type) {
		case UPDATE_FILTER:
			return merge({}, oldState, { [action.filter]: action.value });
		// case fetchFilteredSpots:
		// 	return defaultState;
		default:
			return oldState;
	}
};

export default filtersReducer;