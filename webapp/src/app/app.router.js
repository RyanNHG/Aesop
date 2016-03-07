module.exports = ['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider){

    $routeProvider.
        when('/', {
            template: '<home-page></home-page>'
        }).
        when('/dashboard', {
            template: '<dashboard-page></dashboard-page>'
        }).
        when('/settings', {
            template: '<settings-page></settings-page>'
        }).
        when('/profile', {
            template: '<profile-page></profile-page>'
        }).
        when('/oops', {
            template: '<error-page></error-page>'
        }).
        otherwise({
            redirectTo: '/oops'
        });

    $locationProvider.html5Mode(true);
}];
