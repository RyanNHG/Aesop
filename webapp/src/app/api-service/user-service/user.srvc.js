module.exports = ['ApiService', function(ApiService){
	
	var srvc = this;

	srvc.data = {};
	
	// Hashing function
	var crypto = require('crypto');
	hash = function(password){
		return crypto.createHash('sha256').update(password).digest('base64');
	};

	// TODO: Check user login cache on startup
	srvc.onInit = function() {
		var cachedUser = srvc.getUserFromCache();

		srvc.data.user = cachedUser;
	}

	srvc.signUp = function(email, password) {

		// Hash password
		password = hash(password);
		
		return ApiService.post('user', {
			email: email,
			password: password
		}).then(srvc.setUserData);
	};

	// Find a user with the specified email and password
	srvc.signIn = function(email, password) {

		password = hash(password);

		return ApiService.get('user', {
			email: email,
			password: password
		}).then(srvc.setUserData);
	};

	srvc.signOut = function(){
		srvc.data.user = null;
		srvc.cacheUser();
	}

	srvc.setUserData = function(res) {
		srvc.data.user = res.data;

		srvc.cacheUser();

		return res;
	}

	srvc.cacheUser = function() {
		localStorage.setItem('user', JSON.stringify(srvc.data.user));
	}

	srvc.getUserFromCache = function() {
		return JSON.parse(localStorage.getItem('user'));
	}

	srvc.addFeedback = function(fableId, isLike) {
			
		var user = srvc.data.user;

		if(isLike)
			user.fableData.liked.push(fableId);
		else
			user.fableData.disliked.push(fableId);

		return ApiService.put('user', {
			user: user
		});
	}

}];