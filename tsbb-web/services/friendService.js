'use strict';
app.factory('friendService',
    function ($http, $q, tsBBSettings) {

        var serviceBase = tsBBSettings.apiBaseUri;

        var _friends = function (user) {

            var deferred = $q.defer();

            $http
                .get(serviceBase + 'friend')
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _add = function (friend) {
            var friendData = {
                id: friend
            };

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'friend', friendData)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _cancel = function (friend) {

            var friendData = {
                params: {
                    id: friend
                }
            };

            var deferred = $q.defer();

            $http
                .delete(serviceBase + 'friend', friendData)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _accept = function (friend) {

            var friendData = {
                id: friend
            };

            var deferred = $q.defer();

            $http
                .patch(serviceBase + 'friend', friendData)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var friendServiceFactory = {};
        friendServiceFactory.friends = _friends;
        friendServiceFactory.add = _add;
        friendServiceFactory.cancel = _cancel;
        friendServiceFactory.accept = _accept;

        return friendServiceFactory;
    }
);