var bcrypt = require('bcryptjs');

function registerUser(userInfo, req, callback) {

	// generate hashed & salted pass
	bcrypt.hash(userInfo.password, 12, function(err, hash) {
		if (err) {
			console.log('Hashing error: ', err);
			callback(err);
		}
		userInfo.password = hash;

		// construct userDocument
		var userDocument = {
			"username": userInfo.username,
			"email": userInfo.email,
			"password": userInfo.password
		};

		// insert into db
		req.db.collection('users').insertOne(userDocument)
		.then(function(result) {
			// log user in
			req.session.userId = result.ops[0]._id;
			callback(null);
		})
		.catch(function(err) {
			console.log('Registration insertion error: ', err);
			callback(err);
		});
	});	
}

module.exports = registerUser;
