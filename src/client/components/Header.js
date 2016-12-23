var React = require('react');
var Link = require('react-router').Link;

function Header(props) {
	return (
		<div className="nav-custom">
			<div className="nav-logo">nite<span>Life</span></div>
			<div className="nav-links">
				<Link to='/'>Home</Link>
				<Link to='/register'>Register</Link>
				<Link to='/login'>Login</Link>										
			</div>
		</div>
	)	
}

module.exports = Header;