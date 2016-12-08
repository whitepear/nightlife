var express = require('express');
var router = express.Router();
var path = require('path');
var serverValidation = require('../utils/serverValidation.js');
var registrationValidation = serverValidation.registrationValidation;
var registerUser = require('../utils/registerUser.js');
var Yelp = require('yelp');

router.get('*', function(req, res) {
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

router.post('/yelpFetch/:location', function(req, res, next) {
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

module.exports = router;