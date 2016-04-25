module.exports = ['ApiService', function(ApiService){
	
	var srvc = this;

	srvc.data = {};
	
	// Hashing function
	var crypto = require('crypto');
	hash = function(password){
		return crypto.createHash('sha256').update(password).digest('base64');
	};

	srvc.signUp = function(email, password) {

		// Hash password
		password = hash(password);
		
		return ApiService.post('user', {
			email: email,
			password: password
		});
	};

	// Find a user with the specified email and password
	srvc.signIn = function(email, password) {

		password = hash(password);

		return ApiService.get('user', {
			email: email,
			password: password
		}).then(function(res) {
			srvc.data.user = res;
			return res;
		});
	};

}];