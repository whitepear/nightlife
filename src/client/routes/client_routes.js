var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var MainContainer = require('../containers/MainContainer.js');
var HomeContainer = require('../containers/HomeContainer.js');
var LoginContainer = require('../containers/LoginContainer.js');
var RegisterContainer = require('../containers/RegisterContainer.js');
var VenuesContainer = require('../containers/VenuesContainer.js');

var routes = (
	<Router history={browserHistory}>
		<Route path='/' component={MainContainer}>
			<IndexRoute component={HomeContainer} />
			<Route path='login' component={LoginContainer} />	
			<Route path='register' component={RegisterContainer} />
			<Route path='venues/:location' component={VenuesContainer} />		
		</Route>
	</Router>
);

module.exports = routes;