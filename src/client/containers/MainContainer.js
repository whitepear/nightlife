var React = require('react');
var Header = require('../components/Header.js');

var MainContainer = React.createClass({
	render: function() {
		return (
			<div>
				<Header pathname={this.props.location.pathname} />		
				<div className="container">						
					{this.props.children}							
				</div>
			</div>
		)
	}
});

module.exports = MainContainer;