angular.module('app', [
    require('navbar'),
    require('pages'),
    require('angular-route')
])
    .config(require('./app.router'))
;
