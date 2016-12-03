var React = require('react');
var Venues = require('../components/Venues.js');
var axios = require('axios');

var VenuesContainer = React.createClass({
	getInitialState: function() {
		return {	
			loading: true,
			venueList: []
		}
	},
	componentDidMount: function() {
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
	render: function() {
		return (
			<div>				
				<Venues 
					venueList={this.state.venueList} 
					loading={this.state.loading} 
					onYelpSearch={this.handleYelpSearch} 
					onEnter={this.handleEnter} />
			</div>
		)			
	}
});

module.exports = VenuesContainer;