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
	db.collection('users').find({ $or: [
  	{ "username": userInfo.username },
 		{ "email": userInfo.email }
  ]}).count()
	.then(function(count) {
		if (count !== 0) {
			return callback(false, 'The username or email address provided has already been registered.');
		} else {
			return callback(true);
		}	
	})
	.catch(function(err) {
		console.log('Username/email database check error: ', err);
		return callback(false, 'A server error occurred while attempting to validate your information.\nPlease try again later.');
	});	
}