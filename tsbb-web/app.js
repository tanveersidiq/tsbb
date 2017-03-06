var app = angular.module('tsBB', [
    'ngRoute',
    'toastr',
    'angular-loading-bar',
    'tsBBRoutes'
]);

app.constant('tsBBSettings', (function () {
    var hostURL = window.location.protocol + '//' + window.location.host;
    return {
        webUIBaseUri: hostURL + '/web/',
        apiBaseUri: hostURL + '/api/'
    }
})());

app.config([
    '$qProvider',
    '$httpProvider',
    '$routeProvider',
    'toastrConfig',
    'cfpLoadingBarProvider',
    'tsBBSettings',
    function ($qProvider, $httpProvider, $routeProvider, toastrConfig, cfpLoadingBarProvider, tsBBSettings) {

        cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        $qProvider.errorOnUnhandledRejections(false);

        $httpProvider.interceptors.push('authInterceptorService');

        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-bottom-left',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            timeOut: 1000,
        });

    }
]);


app.run(['$rootScope', '$location', 'accountService', 'notificationService',
    function ($rootScope, $location, accountService, notificationService) {
        //accountService.fillAuthData();

        $rootScope.$on("$routeChangeStart", function (evt, to, from) {
            if (to && to.authorize) {
                if (from == undefined && to.$$route.originalPath !== '/') {
                      $location.path("/company");
                } else {
                    if (to.roles && to.roles.length > 0 && !accountService.isReInvoicingAdmin()) {
                        $location.path("/login");
                        notificationService.displayError(new AuthorizationError().forbidden);
                    }
                    to.resolve = to.resolve || {};
                    if (!to.resolve.authorizationResolver) {
                        to.resolve.authorizationResolver = function (accountService) {
                            return accountService.authorize(accountService);
                        };
                    }
                }
                if (accountService.authentication.authenticated && to && to.$$route && to.$$route.originalPath === "/login") {
                    evt.preventDefault();
                }
            }
        });

        $rootScope.$on("$routeChangeError", function (evt, to, from, error) {
            if (error instanceof AuthorizationError) {
                $location.path("/login").search("returnTo", to.originalPath);
                if (to.originalPath !== '/')
                    notificationService.displayError(error.message);
            }
        });

        $rootScope.$on("$routeChangeSuccess", function () {

        });

    }
]);