module.exports = ['$scope', '$location',
function($scope, $location){

    var self = this;

    this.enableColorChange = true;

    this.navLinks = {
        left: [
            {
                label: 'Aesop',
                path: '/',
                icon: 'library_books',
                isBrand: true
            },
            {
                label: 'Dashboard',
                path: '/dashboard',
                icon: 'dashboard'
            },
            {
                label: 'Settings',
                path: '/settings',
                icon: 'settings'
            }
        ],
        right: [
            {
                label: 'Sign in',
                //path: '/profile',
                onClick: 'showSignInModal',
                icon: 'face'
            }
        ]
    };

    this.path = $location.path();

    // Update active link on route change
    $scope.$on('$routeChangeSuccess', function(){
        self.path = $location.path();
        self.getNavColor();
    });

    //  Go to another page
    this.linkClicked = function(path, onClick) {

        //  If no path is specified, call the onClick function (in this controller).
        if(path == null && onClick != null)
          this[onClick]();

        if(path != null)
          $location.path(path);
    };

    //  Shows sign in modal (once that thing is implemented)
    this.showSignInModal = function(){
      console.log('show sign in modal');
    };

    //  Do cool stuff with the nav color
    this.getNavColor = function() {
        var path = this.path;

        if(this.enableColorChange)
            this.navColor = (path == '/profile') ? 'red' :
                (path == '/dashboard') ? 'green' :
                (path == '/settings') ? 'purple':
                (path == '/') ? 'blue' : 'gray';
        else this.navColor = 'blue';
    };

    this.getNavColor();

}];
