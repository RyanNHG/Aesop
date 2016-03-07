var angular = require('angular');

angular.module('app', [
    require('./navbar'),
    require('angular-route'),
])
    .config(require('./app.router'))
;
