module.exports = ['$location',
function($location){

    var ctrl = this;

    ctrl.navLinks = {
        left: [
            {
                label: 'Aesop',
                path: '/',
                icon: 'library_books',
                isBrand: true
            },
            {
                label: 'Read',
                path: '/read',
                icon: 'book'
            },
            {
                label: 'Explore',
                path: '/explore',
                icon: 'dashboard'
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

    ctrl.showModal = true;

    ctrl.location = $location;

    //  Go to another page
    ctrl.linkClicked = function(path, onClick) {

        //  If no path is specified, call the onClick function (in this controller).
        if(path == null && onClick != null)
          ctrl[onClick]();

        if(path != null)
          $location.path(path);
    };

    //  Shows sign in modal (once that thing is implemented)
    ctrl.showSignInModal = function(){
        ctrl.showModal = true;
    };

    ctrl.close = function(){
        ctrl.showModal = false;
    }

}];
