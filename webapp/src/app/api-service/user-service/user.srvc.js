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
		}).then(function(res){
			// TODO: Clean this up
			srvc.data.user = res.data;
			srvc.cacheUser();
			return res;
		});
	}

	srvc.getReadFableIds = function(){

		var fableIds = [];
		var user = srvc.data.user;

		if(user == null || user.fableData == null) return fableIds;

		for(var i in user.fableData)
		{
			for(var j in user.fableData[i])
			{
				fableIds.push(user.fableData[i][j]);
			}
		}

		return fableIds;

	}

	srvc.getEmotionalPreferences = function(fables){

		var user = srvc.data.user;

		// If there is no user, return.
		if(user == null) return;

		var preferences = {
			anger: 0,
			disgust: 0,
			fear: 0,
			joy: 0,
			sadness: 0
		};

		// If there is no fableData, return default emotional preferences
		if(user.fableData == null || 
			((user.fableData.liked == null || user.fableData.liked.length == 0) &&
			(user.fableData.disliked == null || user.fableData.disliked.length == 0)))
		{
			return preferences;
		}
		else {

			// Look ma! O(n^4), thats some good code!
			for(var index in fables)
			{
				var fable = fables[index];

				//	Iterates through 'liked' and 'disliked' arrays
				for(var feedback in user.fableData)
				{
					// Iterate through IDs in user history
					for(var i in user.fableData[feedback])
					{
						var fableId = user.fableData[feedback][i];

						// If this fable matches the fableId
						if(fable._id == fableId)
						{
							// Iterate through all emotions for that fable
							for(var emotion in fable.emotionData)
							{
								var value = fable.emotionData[emotion];

								// If the fable is disliked, negate it.
								if(feedback == 'disliked')
									value *= -1;

								preferences[emotion] += value;

							}
						}
					}	
				}


			}

			return preferences;

		}

	};

}];