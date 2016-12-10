var React = require('react');
var Link = require('react-router').Link;

function Header(props) {
	return (
		<div className="nav-custom">
			<div className="nav-logo">nite<span>Life</span></div>
			<div className="nav-links">
				<Link to='/'>Home</Link>
				<Link to={'/register?prevPath=' + props.pathname}>Register</Link>
				<Link to={'/login?prevPath=' + props.pathname}>Login</Link>										
			</div>
		</div>
	)	
}

Header.propTypes = {
	pathname: React.PropTypes.string.isRequired
};

module.exports = Header;