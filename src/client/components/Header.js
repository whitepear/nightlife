var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
			<div className="nav-custom">
				<div className="nav-logo">nite<span className="nav-life">Life</span></div>
				<div className="nav-links">
					<a href="#">Register</a>
					<a href="#">Login</a>					
				</div>
			</div>
		)
	}
});

module.exports = Header;