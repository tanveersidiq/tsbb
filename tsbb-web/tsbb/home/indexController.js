'use strict';
app.controller('indexController',
    function ($scope, $rootScope, accountService) {
        $rootScope.bulletins = [];
        $scope.logOut = function () {
            accountService.logOut();
        }

        $scope.isAdmin = function () {
            return accountService.isAdmin();
        }

        $scope.authentication = accountService.authentication;
    }
);