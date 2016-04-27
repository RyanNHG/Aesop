module.exports = ['ApiService', 'UserService', function(ApiService, UserService){
	
	var srvc = this;

	srvc.data = {};


	srvc.getFable = function() {

		srvc.data.fable = null;

		return ApiService.get('fable', {
			user: UserService.data.user
		}).then(function(res){
			srvc.data.fable = res.data;
			return res;
		});
	};

}];