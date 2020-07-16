import React from "react";
import { Link, withRouter } from "react-router-dom";

const TripItem = ({
	booking,
	spot,
	showReviewModal,
	past,
	history,
	destroyBooking,
	fetchCurrentUser,
	currentUser
}) => {
	const dateOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	};
	let checkIn = new Date(booking.start_date);
	checkIn.setDate(checkIn.getDate() + 1);

	checkIn = checkIn.toLocaleDateString("en-US", dateOptions);

	let checkOut = new Date(booking.end_date);
	checkOut.setDate(checkOut.getDate() + 1);

	checkOut = checkOut.toLocaleDateString("en-US", dateOptions);

	const handleReviewClick = () => {
		history.push(`/trips?booking=${booking.id}&spot=${spot.id}`);
		showReviewModal();
	};

	const handleCancel = () => {
		destroyBooking(booking.id).then(() => fetchCurrentUser(currentUser.id));
	};

	let review;
	let destroy;
	if (past) {
		if (booking.reviewed) {
			review = (
				<div className="already-reviewed">You have reviewed this stay.</div>
			);
		} else {
			review = (
				<div className="needs-review">
					{" "}
					Please <span onClick={handleReviewClick}>review</span> your stay
        </div>
			);
		}
	} else {
		destroy = (
			<div className="cancel-booking">
				<span onClick={handleCancel}>Cancel Booking</span>
			</div>
		);
	}

	// debugger;

	return (
		<div className="trip-item">
			<div className="trip-item-content">
				<img className="trip-thumbnail" src={spot.image_url} />
				<div className="trip-info">
					<div className="trip-spot-title">
						<Link to={`/spots/${spot.id}`}>{spot.title}</Link>
					</div>
					<p>
						Check{past ? "ed" : null} In: <span>{checkIn}</span>
					</p>
					<p>
						Check{past ? "ed" : null} Out: <span>{checkOut}</span>
					</p>
					{review}
					{destroy}
				</div>
			</div>
		</div>
	);
};

export default withRouter(TripItem);