var React = require('react');
var PropTypes = React.PropTypes;
var Loading = require('./Loading.js');
var Venue = require('./Venue.js');

function Venues(props) {
	var key = 0;
	var venueListMarkup = props.venueList.map(function(venue) {
													return <Venue venue={venue} key={key++} />
									 			});
	return (
		<div className="venues-container">	
			<div className="venues-bg"></div>		
			<div className="venues-input-container">
				<input className="venues-search" id="venuesSearchBar" disabled={props.loading} onKeyPress={props.onEnter} placeholder="Check another location" type="text" />
				<div className="search-icon" onClick={props.onYelpSearch}>&#xf002;</div>
			</div>
			<h1 className="venues-header">Venues</h1>
			<div className="venues-list">
				{ props.loading ? <Loading /> : venueListMarkup }
			</div>
		</div>
	)
}

Venues.propTypes = {
	loading: PropTypes.bool.isRequired,
	venueList: PropTypes.array.isRequired,
	onYelpSearch: PropTypes.func.isRequired,
	onEnter: PropTypes.func.isRequired
};

module.exports = Venues;