var React = require('react');
var Register = require('../components/Register.js');
var registrationValidation = require('../utils/clientValidation.js').registrationValidation;
var axios = require('axios');

var RegisterContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {			
			registerEmail: '',
			registerUsername: '',
			registerPassword: '',
			registerPasswordRepeat: '',
			validationMessage: '',
			validationPassed: false
		};
	},
	handleFieldChange: function(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	},
	handleRegSubmit: function(e) {
		e.preventDefault();
		var validationResult = registrationValidation(this.state);
		if (validationResult.validationPassed) {
			this.setState({
				validationPassed: true
			}, function() {
				// client side validation completed, pass form data to server for validation and registration
				axios.post('/register', this.state)
				.then(function(res) {
					if (res.data.serverValidationPassed) {
						// validation passed, user registered
						// redirect to index page				
						this.setState({
							validationMessage: res.data.serverValidationMessage
						}, function() {
							setTimeout(function() {
								this.context.router.push('/');
							}.bind(this), 1500);
						});
					} else {
						// failed server validation
						this.setState({
							validationMessage: res.data.serverValidationMessage,
							validationPassed: false					
						});
					}
				}.bind(this))
				.catch(function(err) {
					console.log(err);
					this.setState({
						validationMessage: 'A server error occurred while processing your request. Please try again later.',
						validationPassed: false
					});
				}.bind(this));
			}.bind(this));			
		} else {
			this.setState({
				validationMessage: validationResult.validationMessage
			});
		}
	},
	render: function() {
		return <Register 
							onFieldChange={this.handleFieldChange}
							onRegSubmit={this.handleRegSubmit}
							validationMessage={this.state.validationMessage}
							validationPassed={this.state.validationPassed} />
	}
});

module.exports = RegisterContainer;