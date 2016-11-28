var React = require('react');

var Home = React.createClass({
	render: function() {
		return (
			<div className="home-container">
				<div className="home-bg"></div>
				<div className="home-prompt">Let's go out tonight.</div>
				<input className="home-input" placeholder="Dublin, Ireland" type="text"/>
			</div>
		)
	}
});

module.exports = Home;