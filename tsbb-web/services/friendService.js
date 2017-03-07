'use strict';
app.factory('friendService',
    function ($http, $q, tsBBSettings) {

        var serviceBase = tsBBSettings.apiBaseUri;

        var _friendRequests = function (user) {

            var deferred = $q.defer();

            $http
                .get(serviceBase + 'friend/requests')
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _friendRequestSent = function (user) {

            var deferred = $q.defer();

            $http
                .get(serviceBase + 'friend/requestsent')
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _addFriend = function (user) {
            var userData = {
                user: user.Id
            };

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'friend', userData)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var friendServiceFactory = {};
        friendServiceFactory.addFriend = _addFriend;
        friendServiceFactory.friendRequests = _friendRequests;
        friendServiceFactory.friendRequestSent = _friendRequestSent;

        return friendServiceFactory;
    }
);