module.exports = ['$http', function($http){
	
	var srvc = this;

	srvc.baseUrl = '/api/';

	srvc.get = function(route, data) {
		return srvc.request('GET', route, data);
	};

	srvc.post = function(route, data) {
		return srvc.request('POST', route, data);
	};

	srvc.request = function(method, route, data) {

		console.log(data);

		return $http({
			method: method,
			url: srvc.baseUrl + route,
			params: data
		}).then(function(res) {
			console.log(res);
			return res;
		});

	}

}];