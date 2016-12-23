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
		var prevPath = this.props.prevPath;
		
		var validationResult = registrationValidation(this.state);
		if (validationResult.validationPassed) {
			this.setState({
				validationPassed: true
			}, function() {
				// client side validation completed, pass form data to server for
				// further validation and registration
				axios.post('/register', this.state)
				.then(function(res) {
					if (res.data.serverValidationPassed) {
						// validation passed, user registered
						// redirect user				
						this.setState({
							validationMessage: res.data.serverValidationMessage
						}, function() {
							setTimeout(function() {
								if (/venues/.test(prevPath) === false) {
									this.context.router.push('/');
								} else {
									this.context.router.push(prevPath);
								}								
							}.bind(this), 1500);
						});
					} else {
						// failed server validation
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
			// failed client-side validation
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