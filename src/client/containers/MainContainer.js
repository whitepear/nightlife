var React = require('react');
var Header = require('../components/Header.js');

var MainContainer = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				{this.props.children}
			</div>
		)
	}
});

module.exports = MainContainer;