angular
    .module('tsBBRoutes', [])
    .config([
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider) {

            var authResolver = function (accountService) {
                return accountService.authorize(accountService);
            };

            $routeProvider
                .when('/signup', {
                    templateUrl: 'tsbb/signup/signup.html',
                    controller: "signupController"
                })
                .when('/home', {
                    templateUrl: 'tsbb/home/home.html',
                    controller: "homeController",
                    authorize: true,
                    resolve: {
                        authorizationResolver: authResolver
                    }
                })
                .when('/settings', {
                    templateUrl: 'tsbb/setting/setting.html',
                    controller: "settingController",
                    authorize: true,
                    resolve: {
                        authorizationResolver: authResolver
                    }
                })
                .when('/profile', {
                    templateUrl: 'tsbb/profile/profile.html',
                    controller: "profileController",
                    authorize: true,
                    resolve: {
                        authorizationResolver: authResolver
                    }
                })
                .when('/', {
                    templateUrl: 'tsbb/login/login.html',
                    controller: "loginController"
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ]);