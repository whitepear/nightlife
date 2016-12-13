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
			loggedIn: false,
			venueList: []
		}
	},
	componentDidMount: function() {
		// check if user is logged in
		axios.post('/checkLoginStatus')
		.then(function(loginRes) {
			this.setState({
				loggedIn: loginRes.data
			});
		}.bind(this));

		// fetch venue info for city provided
		axios.post('/yelpFetch/' + this.props.params.location)
		.then(function(yelpRes) {
			this.setState({
				loading: false,
				venueList: yelpRes.data.businesses
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
			axios.post('/yelpFetch/' + searchValue)
			.then(function(yelpRes) {
				this.setState({
					loading: false,
					venueList: yelpRes.data.businesses
				});
			}.bind(this));
		}
	},
	handleEnter: function(e) {
		if (e.charCode === 13) {
			this.handleYelpSearch();
		}
	},
	// handleAttendingClick: function(e) {
	// 	if (this.state.loggedIn) {
	// 		// increment counter, colour green
	// 		axios.post('/attending/' + e.target.id)
	// 		.then(function(attendingRes) {

	// 		});
	// 	} else {
	// 		this.context.router.push('/login?prevPath=' + this.props.location.pathname);
	// 	}
	// },
	render: function() {
		return (
			<div>				
				<Venues 
					venueList={this.state.venueList} 
					loading={this.state.loading} 
					onYelpSearch={this.handleYelpSearch} 
					onEnter={this.handleEnter} 
					onAttendingClick={this.handleAttendingClick} />
			</div>
		)			
	}
});

module.exports = VenuesContainer;