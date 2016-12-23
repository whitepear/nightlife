var React = require('react');
var Login = require('../components/Login.js');
var loginValidation = require('../utils/clientValidation.js').loginValidation;
var axios = require('axios');

var LoginContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			loginUsername: '',
			loginPassword: '',
			validationMessage: '',
			validationPassed: false
		};
	},
	handleFieldChange: function(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	},
	handleLoginSubmit: function(e) {
		e.preventDefault();
		var prevPath = this.props.prevPath;

		var validationResult = loginValidation(this.state);
		if (validationResult.validationPassed) {			
			this.setState({
				validationPassed: true
			}, function() {
				// client-side validation passed, pass to server for further validation
				axios.post('/login', this.state)
				.then(function(res) {
					if (res.data.serverValidationPassed) {
						// validation passed, now logged in
						// redirect user
						if (/venues/.test(prevPath) === false) {
							this.context.router.push('/');
						} else {
							this.context.router.push(prevPath);
						}	
					} else {
						// validation failed, not logged in
						this.setState({
							validationMessage: res.data.serverValidationMessage,
							validationPassed: false
						});
					}
				}.bind(this)) // END.then
				.catch(function(err) {
					// catch axios post errors
					console.log(err);
					this.setState({
						validationMessage: 'A server error occurred while processing your request. Please try again later.',
						validationPassed: false
					});
				}.bind(this)); // END.catch
			}.bind(this)); // END.setState callback
		} else {
			// client-side validation failed, update validation message for user on form
			this.setState({				
				validationMessage: validationResult.validationMessage
			});
		}
	},
	render: function() {
		return <Login 
						onFieldChange={this.handleFieldChange}
						onLoginSubmit={this.handleLoginSubmit}
						validationMessage={this.state.validationMessage}
						validationPassed={this.state.validationPassed} />
	}
});

module.exports = LoginContainer;