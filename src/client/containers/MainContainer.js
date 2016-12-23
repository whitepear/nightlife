var React = require('react');
var Header = require('../components/Header.js');

var MainContainer = React.createClass({
	getInitialState: function() {
		return {
			prevPath: '/'
		};
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			prevPath: this.props.location.pathname
		});
	},
	render: function() {
		return (
			<div>
				<Header />		
				<div className="container">						
					{React.cloneElement(this.props.children, { prevPath: this.state.prevPath })}							
				</div>
			</div>
		)
	}
});

module.exports = MainContainer;