angular.module('app', [
    require('navbar'),
    require('pages'),
	require('api-service'),
    require('angular-route')
])
    .config(require('./app.router'))
;
