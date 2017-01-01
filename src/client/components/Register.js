var React = require('react');
var PropTypes = React.PropTypes;

function Register(props) {
	return (
		<div>
			<h1 className="form-header">Register</h1>			
			<form action="/register" method="POST" onSubmit={props.onRegSubmit}>
				<div className="form-group">
					<label htmlFor="registerEmail">Email:</label>
		  		<input type="email" className="form-control" id="registerEmail" onChange={props.onFieldChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="registerUsername">Username:</label>
		  		<input type="text" className="form-control" id="registerUsername" onChange={props.onFieldChange} required />
				</div>
				<div className="form-group">
			    <label htmlFor="registerPassword">Password:</label>
			    <input type="password" className="form-control" id="registerPassword" onChange={props.onFieldChange} placeholder="8 characters minimum." required />
			  </div>
			  <div className="form-group">
			    <label htmlFor="registerPasswordRepeat">Repeat Password:</label>
			    <input type="password" className="form-control" id="registerPasswordRepeat" onChange={props.onFieldChange} placeholder="Letters & numbers only." required />
			  </div>
			  <div className={(props.validationMessage ? 'show ' : '') + "registration-message"}>
					{props.validationMessage}
				</div>
				<button type="submit" className="btn btn-default form-submit" disabled={props.validationPassed}>Register</button>
			</form>			
		</div>
	)	
}

Register.propTypes = {
	onFieldChange: PropTypes.func.isRequired,
	onRegSubmit: PropTypes.func.isRequired,
	validationMessage: PropTypes.string.isRequired,
	validationPassed: PropTypes.bool.isRequired
};

module.exports = Register;