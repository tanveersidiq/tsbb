'use strict';
app.controller('indexController', [
    '$scope',
    '$location',
    '$window',
    'accountService',
    function ($scope, $location, $window, accountService) {

        $scope.logOut = function () {
            accountService.logOut();
        }

        $scope.isAdmin = function () {
            return accountService.isAdmin();
        }

        $scope.authentication = accountService.authentication;
        $scope.globalData = accountService.globalData;
    }
]);