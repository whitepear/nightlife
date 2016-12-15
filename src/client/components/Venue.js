var React = require('react');
var PropTypes = React.PropTypes;

function Venue(props) {
	if (!props.venue.attendeeCount) {
		props.venue.attendeeCount = 0;
	}

	if (props.venue.clientAttending) {
		var attendingClass = ' client-attending';
	} else {
		attendingClass = '';
	}

	return (
		<div className="venue-container">						
			<img src={props.venue.image_url} className="venue-thumb" alt="Venue image."/>
			<div className="venue-description">
				<a href={props.venue.url} target="_blank">	
					<div className="venue-title">{props.venue.name}</div>
				</a> 
				<img src={props.venue.rating_img_url} alt="Venue rating."/>
				<button id={props.venue.id} className={"btn attending-btn" + attendingClass} onClick={props.onAttendingClick}>{props.venue.attendeeCount} Going</button>
				<div className="venue-snippet">{props.venue.snippet_text}</div>
			</div>
		</div>
	)
}

Venue.propTypes = {
	venue: PropTypes.object.isRequired,
	onAttendingClick: PropTypes.func.isRequired
};

module.exports = Venue;