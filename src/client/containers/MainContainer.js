var React = require('react');
var Header = require('../components/Header.js');
var axios = require('axios');

var MainContainer = React.createClass({
	getInitialState: function() {
		return {
			prevPath: '/',
			loggedIn: false,
			showDropdown: false
		};
	},
	componentDidMount: function() {
		// check if user is logged in
		axios.post('/checkLoginStatus')
		.then(function(loginRes) {
			this.setState({
				loggedIn: loginRes.data
			});
		}.bind(this));
	},
	componentWillReceiveProps: function(nextProps) {
		// check if user is still logged in
		axios.post('/checkLoginStatus')
		.then(function(loginRes) {
			this.setState({
				loggedIn: loginRes.data
			});
		}.bind(this));

		// store previous path for intelligent redirects on login or registration
		this.setState({
			prevPath: this.props.location.pathname,
			showDropdown: false
		});
	},
	handleLogOut: function() {
		axios.post('/logOut')
		.then(function() {
			this.setState({
				loggedIn: false
			});
		});
	},
	handleDropdownToggle: function() {
		this.setState({
			showDropdown: !this.state.showDropdown
		});
	},
	render: function() {
		return (
			<div>
				<Header 
					loggedIn={this.state.loggedIn} 
					onLogOut={this.handleLogOut}
					onDropdownToggle={this.handleDropdownToggle}
					showDropdown={this.state.showDropdown} />		
				<div className="container">						
					{React.cloneElement(this.props.children, { prevPath: this.state.prevPath, loggedIn: this.state.loggedIn })}							
				</div>
			</div>
		)
	}
});

module.exports = MainContainer;