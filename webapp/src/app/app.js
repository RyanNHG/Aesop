angular.module('app', [
    require('navbar'),
    require('pages'),
	require('shared/user-service'),
    require('angular-route')
])
    .config(require('./app.router'))
;
