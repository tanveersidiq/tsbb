'use strict';
app.controller('profileController',
    function ($scope, $rootScope, $uibModal, accountService, friendService) {

        var _selected;

        var _initialize = function () {
            getUsers();
            getFriendRequests();
        };

        $scope.searchFriendsOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };

        $scope.selected = function (user) {
            if (arguments.length) {
                _selected = $.grep(this.users, function (value) {
                    return value.Email === user;
                })[0];
            } else {
                return _selected;
            }
        };

        $scope.addFriendRequest = function () {
            friendService
                .addFriend($scope.selected())
                .then(function (response) {
                    $scope.pendingFriendRequests.push($scope.selected());
                    notificationService.displaySuccess('Friendship request sent successfully.');
                })
                .catch(function (err) {
                    notificationService.displayError(err);
                });
        };

        $scope.initialize = _initialize;

        function getUsers() {
            accountService
                .users()
                .then(function (response) {
                    $scope.users = $.grep(response.data, function (value) {
                        return value.Email !== accountService.authentication.email;
                    });
                })
                .catch(function (err) {
                    notificationService.displayError(err);
                });
        }

        function getFriendRequests() {
            friendService
                .friendRequests()
                .then(function (response) {
                    $scope.incomingFriendRequests = response.data;
                })
                .catch(function (err) {
                    notificationService.displayError(err);
                });

            friendService
                .friendRequestSent()
                .then(function (response) {
                    $scope.pendingFriendRequests = response.data;
                })
                .catch(function (err) {
                    notificationService.displayError(err);
                });
        }

    }
);