var express = require('express');
var router = express.Router();
var path = require('path');
var Yelp = require('yelp');
var routeChecks = require('../utils/routeChecks.js');
var serverValidation = require('../utils/serverValidation.js');
var registrationValidation = serverValidation.registrationValidation;
var loginValidation = serverValidation.loginValidation;
var registerUser = require('../utils/registerUser.js');
var getAttendees = require('../utils/getAttendees.js');
var updateAttendees = require('../utils/updateAttendees.js');


router.get('*', function(req, res) {
	// serve react-client
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

router.post('/register', routeChecks.loggedOut, routeChecks.sanitizeUserInput, function(req, res, next) {
	// trim fields, except passwords
	var userInfo = {
		email: req.body.registerEmail.trim(),
		username: req.body.registerUsername.trim(),
		password: req.body.registerPassword,
		passwordRepeat: req.body.registerPasswordRepeat
	};

	registrationValidation(userInfo, req.db, function(validationPassed, failMessage) {		
		if (validationPassed) {
			registerUser(userInfo, req, function(err) {
				if (err) {
					res.json({
						serverValidationMessage: 'A server error occurred while attempting to register your information.\nPlease try again later.',
						serverValidationPassed: false
					});
				} else {
					res.json({
						serverValidationMessage: 'You\'ve been successfully registered!',
						serverValidationPassed: true
					});
				}				
			});
		} else {
			res.json({
				serverValidationMessage: failMessage,
				serverValidationPassed: false
			});
		}
	});	
});

router.post('/login', routeChecks.loggedOut, routeChecks.sanitizeUserInput, function(req, res, next) {
	var userDetails = {	
		username: req.body.loginUsername.trim(),
		password: req.body.loginPassword
	};

	loginValidation(userDetails, req.db, function(validationPassed, validationMessage) {
		if (validationPassed) {
			req.session.userId = validationMessage;
			res.json({
				serverValidationMessage: 'Login successful!',
				serverValidationPassed: true
			});
		} else {
			res.json({
				serverValidationMessage: validationMessage,
				serverValidationPassed: false
			});
		}
	});
});

router.post('/logOut', function(req, res, next) {
	if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
			if (err) {
        return next(err);
      }
    });
	}
});

router.post('/checkLoginStatus', function(req, res, next) {
	if (req.session && req.session.userId) {
		res.send(true);
	} else {
		res.send(false);
	}
});

router.post('/yelpFetch/:location', routeChecks.sanitizeUserInput, function(req, res, next) {
	// fetch a list of bars from the Yelp API, found at the location
	// provided by the route parameter
	var yelp = new Yelp({
	  consumer_key: 'REDACTED',
	  consumer_secret: 'REDACTED',
	  token: 'REDACTED',
	  token_secret: 'REDACTED',
	});

	yelp.search({ term: 'bar', location: req.params.location })
	.then(function(yelpRes) {
		// place yelp business info on req
		req.body = yelpRes.businesses;
		// get attendee counts for each venue, 
		// and check if the client is among those attending
		getAttendees(req, function(venueList) {
			res.send(venueList);
		});
	})
	.catch(function(err) {
	  next(err);
	});
});

router.post('/attending', routeChecks.loggedIn, function(req, res, next) {
	// update venue-attendees in db with client info (add or remove)
	// then call getAttendees for updated attendee counts at venues
	updateAttendees(req, function() {				
		getAttendees(req, function(venueList) {
			res.send(venueList);
		});
	});	
});

module.exports = router;