var React = require('react');
var Home = require('../components/Home.js');

var HomeContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			location: ''
		};
	},
	componentDidMount: function() {
		document.getElementById('homeInput').focus();
	},
	handleUpdate: function(e) {
		// update location with input text
		this.setState({
			location: e.target.value
		});
	},
	handleEnter: function(e) {
		// handle input submission
		if (e.charCode === 13 && this.state.location.length > 0) {
			var location = this.state.location; // cache state
			this.setState({
				location: ''
			}); // reset state		
			this.context.router.push('/city/' + location);
		}
	},
	render: function() {
		return (
			<Home onUpdate={this.handleUpdate} onEnter={this.handleEnter} />
		)
	}
});

module.exports = HomeContainer;