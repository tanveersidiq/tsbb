angular
    .module('tsBBRoutes', [])
    .config([
        '$sceDelegateProvider',
        '$routeProvider',
        '$locationProvider',
        '$httpProvider',
        'cfpLoadingBarProvider',
        function ($sceDelegateProvider, $routeProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider) {

            var authResolver = function (accountService) {
                return accountService.authorize(accountService);
            };

            $routeProvider
                .when('/signup', {
                    templateUrl: 'tsbb/signup/signup.html',
                })
                .when('/home', {
                    templateUrl: 'tsbb/home/home.html',
                    authorize: true,
                    resolve: {
                        authorizationResolver: authResolver
                    }
                })
                .when('/settings', {
                    templateUrl: 'views/settings.html',
                    authorize: true,
                    resolve: {
                        authorizationResolver: authResolver
                    }
                })
                .when('/profile', {
                    templateUrl: 'views/profile.html',
                    authorize: true,
                    resolve: {
                        authorizationResolver: authResolver
                    }
                })
                .when('/', {
                    templateUrl: 'tsbb/login/login.html',
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'https://www.youtube.com/**'
            ]);

        }
    ]);