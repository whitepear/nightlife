var React = require('react');
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;

function Header(props) {
	return (
		<div className="nav-custom">
			<div className="nav-logo">nite<span>Life</span></div>
			<div className="nav-links">
				<IndexLink to='/' activeClassName="active-nav-link">Home</IndexLink>
				<Link to='/register' activeClassName="active-nav-link">Register</Link>
				<Link to='/login' activeClassName="active-nav-link">Login</Link>										
			</div>
		</div>
	)	
}

module.exports = Header;