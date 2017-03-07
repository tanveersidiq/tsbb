'use strict';

app.controller('signupController', [
	'$scope',
	'$location',
	'accountService',
	'notificationService',
	function ($scope, $location, accountService, notificationService) {

		$scope.initialize = function () {

		}

		$scope.signup = function () {
			if ($scope.frmSignup.$valid) {
				accountService.register($scope.user)
					.then(function () {
						$location.path('/home');
						notificationService.displaySuccess('Welcome ' + $scope.user.email);
					})
					.catch(function (err) {
						notificationService.displayError(err);
					});
			}

		}
	}
]);
