var React = require('react');
var Venues = require('../components/Venues.js');
var axios = require('axios');

var VenuesContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {	
			loading: true,
			attendingLoading: false,
			venueList: []
		}
	},
	componentDidMount: function() {
		// fetch venue info for city provided
		axios.post('/yelpFetch/' + this.props.params.location)
		.then(function(yelpRes) {			
			this.setState({
				loading: false,
				venueList: yelpRes.data
			});			
		}.bind(this));
	},
	handleYelpSearch: function(e) {		
		if (!this.state.loading) {
			this.setState({
				loading: true,
				venueList: []
			});

			var searchValue = document.getElementById('venuesSearchBar').value;
			// fetch venue info for the city provided
			axios.post('/yelpFetch/' + searchValue)
			.then(function(yelpRes) {
				// update url with new city
				this.context.router.push('/venues/' + searchValue);				
				this.setState({
					loading: false,
					venueList: yelpRes.data
				});
			}.bind(this));
		}
	},
	handleEnter: function(e) {
		if (e.charCode === 13) {
			this.handleYelpSearch();
		}
	},
	handleAttendingClick: function(e) {
		// this function adds/removes the user from a venue's attendee count
		if (this.props.loggedIn) {
			e.persist();
			this.setState({
				attendingLoading: true
			}, function() {
				axios.post('/attending/?venueId=' + e.target.id + '&clientAttending=' + e.target.classList.contains('client-attending'), this.state.venueList)
				.then(function(attendingRes) {
					this.setState({
						venueList: attendingRes.data,
						attendingLoading: false
					});	
				}.bind(this));
			}.bind(this));			
		} else {
			// redirect user to login page
			this.context.router.push('/login?prevPath=' + this.props.location.pathname);
		}
	},
	render: function() {
		return (
			<div>				
				<Venues 
					venueList={this.state.venueList} 
					loading={this.state.loading} 
					attendingLoading={this.state.attendingLoading}
					onYelpSearch={this.handleYelpSearch} 
					onEnter={this.handleEnter} 
					onAttendingClick={this.handleAttendingClick} />
			</div>
		)			
	}
});

module.exports = VenuesContainer;