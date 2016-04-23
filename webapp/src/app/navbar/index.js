angular.module(module.exports = 'navbar',[
	require('shared/modal')
])
  .component(module.exports, {
    templateUrl: 'templates/navbar/navbar.tpl.html',
    controller: require('./navbar.ctrl')
  })
