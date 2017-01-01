var React = require('react');
var PropTypes = React.PropTypes;

function Home(props) {
	return (
		<div className="home-container">
			<div className="home-prompt">Let's go out tonight.</div>
			<input id="homeInput" className="home-input" placeholder="Dublin, Ireland" type="text" onChange={props.onUpdate} onKeyPress={props.onEnter} />
		</div>
	)
}

Home.propTypes = {
	onUpdate: PropTypes.func.isRequired,
	onEnter: PropTypes.func.isRequired
};

module.exports = Home;