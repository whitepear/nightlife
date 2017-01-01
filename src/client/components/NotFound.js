var React = require('react');

function NotFound(props) {
	return (
		<div>
			<div className="notfound-status">404</div>
			<div className="notfound-sub-status">The resource you requested does not exist.</div>
		</div>
	)
}

module.exports = NotFound;