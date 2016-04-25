angular.module(module.exports = 'welcomePage',[
	require('shared/sign-in-form')
])
  .component(module.exports, {
    templateUrl: 'templates/pages/welcome-page/welcome-page.tpl.html',
    controller: require('./welcome-page.ctrl')
  })
