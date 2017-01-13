var React = require('react');
var Header = require('../components/Header.js');
var axios = require('axios');
var changeBodyBackground = require('../utils/changeBodyBackground.js');
var getDeviceWidth = require('../utils/getDeviceWidth.js');
var underscoreDebounce = require('../utils/underscoreDebounce.js');

var MainContainer = React.createClass({
	getInitialState: function() {
		return {
			prevPath: '/',
			loggedIn: false,
			showDropdown: false,
			deviceWidth: getDeviceWidth()
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
		
		// set body background image
		changeBodyBackground(this.props.location.pathname, function(backgroundImage) {
			document.body.style.backgroundImage = backgroundImage;
		});
		
		// add a debounced method to check window size on resize
		this.checkScreenSize = underscoreDebounce(this.checkScreenSize, 200);
		window.addEventListener("resize", this.checkScreenSize);
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
		
		// update body background-image
		changeBodyBackground(nextProps.location.pathname, function(backgroundImage) {
			document.body.style.backgroundImage = backgroundImage;
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
	checkScreenSize: function() {
		// this method changes the body background depending on screen width,
		// similar to a css media-query. it is called whenever the window is resized.
		// it is debounced within componentDidMount.

		// get string representation of device width (Large, Medium, Small, Extra-Small)
		var currentDeviceWidth = getDeviceWidth();
		if (this.state.deviceWidth !== currentDeviceWidth) {
			// update state with new deviceWidth
			this.setState({
				deviceWidth: currentDeviceWidth
			});
			// update body background with correctly-sized image
			changeBodyBackground(this.props.location.pathname, function(backgroundImage) {
				document.body.style.backgroundImage = backgroundImage;
			});				
		}
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