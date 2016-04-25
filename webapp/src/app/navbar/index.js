angular.module(module.exports = 'navbar',[
	require('shared/modal'),
	require('shared/sign-in-form')
])
  .component(module.exports, {
    templateUrl: 'templates/navbar/navbar.tpl.html',
    controller: require('./navbar.ctrl')
  })