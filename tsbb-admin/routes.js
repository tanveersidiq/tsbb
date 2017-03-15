angular
    .module('tsBBAdminRoutes', [])
    .config([
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider) {

            var authResolver = function (accountService) {
                return accountService.authorize(accountService);
            };

            $routeProvider
                .when('/admin/home', {
                    templateUrl: 'tsbbAdmin/home/home.html',
                    controller: "homeController",
                    authorize: true,
                    resolve: {
                        authorizationResolver: authResolver
                    }
                })
                .when('/admin/', {
                    templateUrl: 'tsbbAdmin/login/login.html',
                    controller: "loginController"
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ]);