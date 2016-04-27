angular.module(module.exports='ApiService',[
	require('api-service/user-service'),
	require('api-service/fable-service')
])
	.service(module.exports, require('./api.srvc.js'));