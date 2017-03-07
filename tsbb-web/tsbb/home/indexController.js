'use strict';
app.controller('indexController',
    function ($scope, $rootScope, $location, $window, accountService) {
        $rootScope.joinedBulletins = [];
        $scope.logOut = function () {
            accountService.logOut();
        }

        $scope.isAdmin = function () {
            return accountService.isAdmin();
        }

        $scope.authentication = accountService.authentication;
    }
);