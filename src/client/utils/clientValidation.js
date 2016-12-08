// Validate registration form data
module.exports.registrationValidation = function(formInfo) {

	// trim fields, except passwords
	var email = formInfo.registerEmail.trim();
	var username = formInfo.registerUsername.trim();
	var password = formInfo.registerPassword;
	var passwordRepeat = formInfo.registerPasswordRepeat;
	
	if (!email ||
			!username ||		  
		  !password ||
		  !passwordRepeat) {
		return {
			validationPassed: false,
			validationMessage: 'Please ensure all fields are filled out.'
		};
	}

	if ( !/@/.test(email) ) {
		return {
			validationPassed: false,
			validationMessage: 'The email address provided is invalid.'
		};
	}

	if ( !(password.length > 7) ) {
		return {
			validationPassed: false,
			validationMessage: 'Please ensure that your password has a minimum length of 8 characters.'
		};
	}

	if (!/[a-zA-Z]/.test(password) ||
	    !/[0-9]/.test(password)) {
		return {
			validationPassed: false,
			validationMessage: 'Passwords must contain at least one letter and one number.'
		};
	}

	if (/[^a-zA-Z0-9]/.test(password)) {
		return {
			validationPassed: false,
			validationMessage: 'Passwords may only contain letters or numbers.'
		};
	}

	if ( !(password === passwordRepeat) ) {
		return {
			validationPassed: false,
			validationMessage: 'The passwords provided do not match.'
		};
	}	

	return {
		validationPassed: true
	};
}