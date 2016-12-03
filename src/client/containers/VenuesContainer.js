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
			console.log(yelpRes);
			this.setState({
				loading: false,
				venueList: yelpRes.data.businesses
			});
		}.bind(this));
	},
	render: function() {
		return (
			<div>				
				<Venues venueList={this.state.venueList} loading={this.state.loading} />
			</div>
		)			
	}
});

module.exports = VenuesContainer;