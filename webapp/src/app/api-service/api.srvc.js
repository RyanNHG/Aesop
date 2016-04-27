module.exports = ['$http', function($http){
	
	var srvc = this;

	srvc.baseUrl = '/api/';

	srvc.get = function(route, data) {
		return srvc.request('GET', route, data);
	};

	srvc.post = function(route, data) {
		return srvc.request('POST', route, data);
	};

	srvc.put = function(route, data) {
		return srvc.request('PUT', route, data);
	};

	srvc.request = function(method, route, data) {

		return $http({
			method: method,
			url: srvc.baseUrl + route,
			params: data
		});

	}

}];