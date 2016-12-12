var bcrypt = require('bcryptjs');

// Validate registration form data
module.exports.registrationValidation = function(userInfo, db, callback) {

	var email = userInfo.email;
	var username = userInfo.username;
	var password = userInfo.password;
	var passwordRepeat = userInfo.passwordRepeat;
	
	if (!email ||
			!username ||		  
		  !password ||
		  !passwordRepeat) {
		return callback(false, 'All form fields must be completed.');
	}

	if ( !/@/.test(email) ) {
		return callback(false, 'Email address provided is not valid.');
	}

	if ( !(password.length > 7) ) {
		return callback(false, 'Password provided must be at least 8 characters in length.');
	}

	if (!/[a-zA-Z]/.test(password) ||
	    !/[0-9]/.test(password)) {
		return callback(false, 'Password must contain at least one letter and one number.');
	}

	if (/[^a-zA-Z0-9]/.test(password)) {
		return callback(false, 'Passwords may only contain letters and numbers.');
	}

	if ( !(password === passwordRepeat) ) {
		return callback(false, 'Passwords do not match.');
	}	

	// check that username and email are not already registered
	db.collection('users').findOne({ $or: [
  	{ "username": userInfo.username },
 		{ "email": userInfo.email }
  ]})
	.then(function(doc) {
		if (doc === null) {
			return callback(true);
		} else if (doc.username === userInfo.username) {
			return callback(false, 'The username provided has already been registered.');
		} else if (doc.email === userInfo.email) {
			return callback(false, 'The email provided has already been registered.');
		}
	})
	.catch(function(err) {
		console.log('Registration database check error: ', err);
		return callback(false, 'A server error occurred while attempting to validate your information.\nPlease try again later.');
	});	
}

// validate login details
module.exports.loginValidation = function(userInfo, db, callback) {
	var username = userInfo.username;
	var password = userInfo.password;

	if(!username || !password) {
		return callback(false, 'Please fill out all fields before submitting.');
	}

	// check for userDoc via username	
	db.collection('users').findOne({ username: username })
	.then(function(userDoc) {
		if (userDoc === null) {
			return callback(false, 'That username does not belong to a registered user.');
		} else {
			// check passwords match
			bcrypt.compare(password, userDoc.password, function(err, result) {
				if (err) {
					console.log('An error occurred during bcrypt comparison: ', err);
					return callback(false, 'A server error occurred while attempting to validate your information.\nPlease try again later.');
				}

				if (result) {
					return callback(true, userDoc._id);
				} else {
					return callback(false, 'The password you have provided is incorrect.');
				}
			});
		}
	})
	.catch(function(err) {
		console.log('Login database check error: ', err);
		return callback(false, 'A server error occurred while attempting to validate your information.\nPlease try again later.');
	});
}