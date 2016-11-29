var React = require('react');
var PropTypes = React.PropTypes;

function Register(props) {
	return (
		<div>
			<div className="register-bg"></div>
			<h1 className="form-header">Register</h1>
			<form action="/register" method="POST">
				<div className="form-group">
					<label htmlFor="register-email">Email:</label>
		  		<input type="email" className="form-control" id="register-email" />
				</div>
				<div className="form-group">
					<label htmlFor="register-username">Username:</label>
		  		<input type="text" className="form-control" id="register-username" />
				</div>
				<div className="form-group">
			    <label htmlFor="register-password">Password:</label>
			    <input type="password" className="form-control" id="register-password" />
			  </div>
			  <div className="form-group">
			    <label htmlFor="register-password-repeat">Repeat Password:</label>
			    <input type="password" className="form-control" id="register-password-repeat" />
			  </div>
				<button type="submit" className="btn btn-default form-submit">Register</button>
			</form>
		</div>
	)	
}

module.exports = Register;