var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
	render: function() {
		return (
			<div className="nav-custom">
				<div className="nav-logo">
					<Link to='/'>nite<span className="nav-life">Life</span></Link>
				</div>
				<div className="nav-links">
					<Link to='/register'>Register</Link>
					<Link to='/login'>Login</Link>										
				</div>
			</div>
		)
	}
});

module.exports = Header;