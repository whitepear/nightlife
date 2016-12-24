var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;

function Header(props) {
	if (props.loggedIn) {
		var LoginLink = <a href="#">Log Out</a>
	} else {
		LoginLink = <Link to='/login' activeClassName="active-nav-link">Login</Link>;
	}
	return (
		<div className="nav-custom">
			<div className="nav-logo">nite<span>Life</span></div>
			<div className="nav-links">
				<IndexLink to='/' activeClassName="active-nav-link">Home</IndexLink>
				<Link to='/register' activeClassName="active-nav-link">Register</Link>
				{LoginLink}
			</div>
		</div>
	)	
}

Header.propTypes = {
	loggedIn: PropTypes.bool.isRequired
};

module.exports = Header;