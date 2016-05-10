angular.module(module.exports = 'modal',[])
  .component(module.exports, {
    templateUrl: 'templates/shared/modal/modal.tpl.html',
    controller: require('./modal.ctrl'),
    bindings: {
    	title: '=',
    	showModal: '=',
    	onClose: '&'
    },
    transclude: true
  })
