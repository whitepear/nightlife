var express = require('express');
var path = require('path');
var router = express.Router();
var Yelp = require('yelp');

router.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
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