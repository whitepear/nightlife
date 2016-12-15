var express = require('express');
var router = express.Router();
var path = require('path');
var Yelp = require('yelp');
var serverValidation = require('../utils/serverValidation.js');
var registrationValidation = serverValidation.registrationValidation;
var loginValidation = serverValidation.loginValidation;
var registerUser = require('../utils/registerUser.js');
var getAttendees = require('../utils/getAttendees.js');


router.get('*', function(req, res) {
	// serve react-client
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

router.post('/register', function(req, res, next) {
	// trim fields, except passwords
	var userInfo = {
		email: req.body.registerEmail.trim(),
		username: req.body.registerUsername.trim(),
		password: req.body.registerPassword,
		passwordRepeat: req.body.registerPasswordRepeat
	};

	registrationValidation(userInfo, req.db, function(validationPassed, failMessage) {		
		if (validationPassed) {
			registerUser(userInfo, req.db, function(err) {
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

router.post('/login', function(req, res, next) {
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

router.post('/checkLoginStatus', function(req, res, next) {
	if (req.session && req.session.userId) {
		res.send(true);
	} else {
		res.send(false);
	}
});

router.post('/yelpFetch/:location', function(req, res, next) {
	// fetch a list of bars from the Yelp API, found at the location
	// provided by the route parameter
	var yelp = new Yelp({
	  consumer_key: 'REDACTED',
	  consumer_secret: 'REDACTED',
	  token: 'REDACTED',
	  token_secret: 'REDACTED',
	});

	yelp.search({ term: 'bar', location: req.params.location })
	.then(function (data) {
	  res.send(data);
	})
	.catch(function (err) {
	  next(err);
	});
});

router.post('/getAttendees', function(req, res, next) {
	// get attendee counts for each venue in the array sent by the client, 
	// and check if the client is among those attending
	getAttendees(req, function(attendeeInfo) {
		res.send(attendeeInfo);
	});
});

module.exports = router;