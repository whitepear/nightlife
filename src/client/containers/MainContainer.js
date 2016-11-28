var React = require('react');
var Header = require('../components/Header.js');

var MainContainer = React.createClass({
	render: function() {
		return (
			<div>
				<Header />		
				<div className="container">						
					{this.props.children}							
				</div>
			</div>
		)
	}
});

module.exports = MainContainer;