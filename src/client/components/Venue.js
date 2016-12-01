var React = require('react');
var PropTypes = React.PropTypes;

function Venue(props) {
	return (
		<div className="venue-container">						
			<img src={props.venue.image_url} alt="Venue image."/>
			<div className="venue-description">
				<a href={props.venue.url} target="_blank">	
					<div className="venue-title">{props.venue.name}</div>
				</a> 
				<img src={props.venue.rating_img_url} alt="Venue rating."/>
				<div className="venue-snippet">{props.venue.snippet_text}</div>
			</div>
		</div>
	)
}

Venue.propTypes = {
	venue: PropTypes.object.isRequired
};

module.exports = Venue;