var React = require('react');
var PropTypes = React.PropTypes;

function Login(props) {
	return (
		<div>
			<div className="login-bg"></div>	
			<h1 className="form-header">Login</h1>	
			<form action="/login" method="POST">
				<div className="form-group">
					<label htmlFor="login-username">Username:</label>
	    		<input type="text" className="form-control" id="login-username" />
				</div>
				<div className="form-group">
			    <label htmlFor="login-password">Password:</label>
			    <input type="password" className="form-control" id="login-password" />
			  </div>
				<button type="submit" className="btn btn-default form-submit">Submit</button>
			</form>
		</div>
	)
}

module.exports = Login;