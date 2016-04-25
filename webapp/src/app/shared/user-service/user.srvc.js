module.exports = [function(){
	
	var srvc = this;

	srvc.data = {
		user: {
			email: 'ryan@haskell.com',
			password: 'ER@##$@#DDF@#F'
		}
	}

	srvc.signUp = function(email, password) {
		console.log('Signing up ' + email + '...');
		return srvc.getUserPromise();
	};

	// Find a user with the specified email and password
	srvc.signIn = function(email, password) {

		console.log('Signing in ' + email + '...');
		return srvc.getUserPromise();
	};

	srvc.getUserPromise = function(){
		return new Promise(function(resolve, reject){
			resolve(srvc.data.user);
		});
	}

	console.log(srvc.data)
}];