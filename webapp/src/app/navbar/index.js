require('angular').module(module.exports = 'NavbarComponent',[
])

  .component('navbar', {
    templateUrl: 'app/navbar/navbar.tpl.html',
    controller: require('./navbar.ctrl')
  })

;
