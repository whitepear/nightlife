var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./routes/client_routes.js');
require('./styles/client_styles.scss');

ReactDOM.render(
	routes,
	document.getElementById('app')	
);