angular.module(module.exports = 'welcomePage',[])
  .component(module.exports, {
    templateUrl: 'templates/pages/welcome-page/welcome-page.tpl.html',
    controller: require('./welcome-page.ctrl')
  })
