var React = require('react');
var PropTypes = React.PropTypes;
var Venue = require('./Venue.js');

function Venues(props) {
	var key = 0;
	return (
		<div>			
			<input className="venues-search" type="text" />
			<h1 className="venues-header">Venues</h1>
			<div className="venues-container">
				{props.venueList.map(function(venue) {
					return <Venue venue={venue} key={key++} />
				})}
			</div>
		</div>
	)
}

Venues.propTypes = {
	venueList: PropTypes.array.isRequired
};

module.exports = Venues;