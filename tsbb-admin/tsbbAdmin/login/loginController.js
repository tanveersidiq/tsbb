'use strict';

app.controller('loginController',
	function ($scope, $location, accountService, notificationService) {

		$scope.initialize = function () {

		}

		$scope.login = function () {
			if ($scope.frmLogin.$valid) {
				accountService.login($scope.user)
					.then(function () {
						$location.path('/admin/home');
						notificationService.displaySuccess('Welcome ' + $scope.user.email);
					})
					.catch(function (err) {
						notificationService.displayError(err);
					});
			}

		}
	}
);
