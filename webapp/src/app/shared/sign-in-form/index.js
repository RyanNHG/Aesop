angular.module(module.exports = 'signInForm', [])
  .component(module.exports, {
    templateUrl: 'templates/shared/sign-in-form/sign-in-form.tpl.html',
    controller: require('./sign-in-form.ctrl'),
    bindings: {
    	only: '@',
    	initial: '@',
    	onSignIn: '&'
    }
  })
